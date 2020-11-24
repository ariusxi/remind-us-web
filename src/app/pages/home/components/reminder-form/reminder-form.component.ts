import { format, addHours } from 'date-fns';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoryService } from 'src/app/services/category.service';
import { ReminderService } from 'src/app/services/reminder.service';

import { NonValidInput, Validator } from 'src/app/utils/classes/Validator';

interface CategoryOption {
    value: string;
    label: string;
}

interface DateTime {
    date: string;
    time: string;
}

@Component({
    selector: 'reminder-form',
    templateUrl: './reminder-form.component.html',
    styleUrls: ['./reminder-form.component.css'],
})
export class ReminderFormComponent implements OnInit {

    public currentIconType: string = 'success';

    public buttonText: string;
    public errorMessage: string = '';
    public errorsMessage: NonValidInput[] = [];
    public responseLoadingReminder: boolean = false;

    public isResponseEnabled: boolean = false;
    public categoriesOptions: CategoryOption[];

    // Reminder
    public idReminder: string;
    public nameReminder: string = '';
    public categoryReminder: string;
    public scheduledReminder: string;
    public hourReminder: string;
    public descriptionReminder: string = '';

    public isNewReminder: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<any>,
        public categoryService: CategoryService,
        public reminderService: ReminderService,
    ) {
        const { date, time } = this.getDateAndHour(data.scheduledReminder || 'T');

        Object.assign(this, {
            buttonText: data.isNew ? 'Cadastrar' : 'Atualizar',
            isNewReminder: data.isNew,
            idReminder: data.idReminder,
            nameReminder: data.nameReminder,
            scheduledReminder: date,
            hourReminder: time,
            categoryReminder: data.categoryReminder,
            descriptionReminder: data.descriptionReminder,
        });
    }

    ngOnInit(): void {
        this.getAllCategories();
    }

    private getDateAndHour(dateTimeString: string): DateTime {
        const dateTimeParams = dateTimeString.replace(/.000Z/g, '').split('T');
        return ({
            date: dateTimeParams[0],
            time: dateTimeParams[1],
        })
    }

    public formatDateScheduled(dateString: string, hourString: string): string {
        const formattedHour = hourString.length < 8 ? `${hourString}:00` : hourString;
        return format(addHours(new Date(`${dateString}T${formattedHour}.000Z`), 3), 'yyyy-MM-dd HH:ii:ss');
    }

    public resetValues(): void {
        Object.assign(this, {
            nameReminder: '',
            categoryReminder: '',
            scheduledReminder: '',
            descriptionReminder: '',
            responseLoadingReminder: false,
            isResponseEnabled: false,
            currentIconType: 'success',
        })
    }

    public async getAllCategories(): Promise<void> {
        this.categoryService.getAllList()
            .then((response) => {
                if (response.success) {
                    // Adicionando lista de categorias
                    this.categoriesOptions = response.data.map((currentCategory) => ({
                        label: currentCategory.title,
                        value: currentCategory._id,
                    }));
                }
            }).catch((error) => Object.assign(this, {
                errorMessage: error,
                responseLoadingReminder: false,
                isResponseEnabled: true,
                currentIconType: 'failure',
            }))
    }

    public getErrorMessage(errorMessagesArray: NonValidInput[]): string {
        let errorMessage = ''

        // Percorrendo array de erros de campos
        errorMessagesArray.forEach((currentErrorMessage) => {
            if (currentErrorMessage.fieldProperty.required) {
                errorMessage = 'Você deve preencher os campos obrigatórios.';
            }
            if (currentErrorMessage.fieldProperty.email) {
                errorMessage = 'E-mail inválido.';
            }
            if (currentErrorMessage.fieldProperty.compare) {
                errorMessage = `${currentErrorMessage.originalName} não está com o valor igual.`;
            }
            if (currentErrorMessage.fieldProperty.minLength) {
                errorMessage = `${currentErrorMessage.originalName} não tem os caracteres mínimos.`;
            }
            if (currentErrorMessage.fieldProperty.maxLength) {
                errorMessage = `${currentErrorMessage.originalName} ultrapassou o máximo de caracteres.`;
            }
            if (currentErrorMessage.fieldProperty.date) {
                errorMessage = `${currentErrorMessage.originalName} não pode ser uma data no passado.`;
            }
            if (currentErrorMessage.fieldProperty.hour) {
                errorMessage = `${currentErrorMessage.originalName} hora inválida.`;
            }
        })

        return errorMessage
    }

    public getNameReminder(name: string, description: string = ''): string {
        if ((!name || name === '') && description !== '') {
            return `${description.substring(0, 20)}...`;
        }
        if ((!name || name === '') && description === '') {
            return '(Sem título)';
        }
        return name;
    }

    private async registerReminder(context: any): Promise<void> {
        const validator = new Validator([
            { inputName: 'scheduledReminder', inputValue: context.scheduledReminder, originalName: 'Data do lembrete', functions: ['required', 'date'] },
            { inputName: 'hourReminder', inputValue: context.hourReminder, originalName: 'Hora do lembrete', functions: ['required', 'hour'] },
            { inputName: 'categoryReminder', inputValue: context.categoryReminder, originalName: 'Categoria do Lembrete', functions: ['required'] },
        ]);
        const resultValidator = validator.validate();

        context.nameReminder = context.getNameReminder(context.nameReminder, context.descriptionReminder);

        context.errorMessage = '';
        context.responseLoadingReminder = true;

        if (!resultValidator.isValid) {
            context.errorMessage = context.getErrorMessage(resultValidator.nonValidFields);
            context.resetValues();
            return;
        }
        const scheduledReminderFormatted = context.formatDateScheduled(context.scheduledReminder, context.hourReminder);

        context.reminderService.create({
            data: {
                name: context.nameReminder,
                category: context.categoryReminder !== '' ? context.categoryReminder : null,
                scheduled: scheduledReminderFormatted,
                description: context.descriptionReminder,
            },
        }).then((response) => {
            if (response.success) {
                // Removendo loader do botão de cadastrar
                context.responseLoadingReminder = false;

                // Definindo a resposta da requisição
                context.currentIconType = 'success';

                // Alternando a aba de resposta
                context.toggleResponse();
            }
        }).catch((error) => Object.assign(context, {
            errorMessage: error,
            responseLoadingReminder: false,
            isResponseEnabled: true,
            currentIconType: 'failure',
        }))
    }

    private async updateReminder(context: any): Promise<void> {
        const validator = new Validator([
            { inputName: 'scheduledReminder', inputValue: context.scheduledReminder, originalName: 'Data do lembrete', functions: ['required', 'date'] },
            { inputName: 'hourReminder', inputValue: context.hourReminder, originalName: 'Hora do lembrete', functions: ['required', 'hour'] },
            { inputName: 'categoryReminder', inputValue: context.categoryReminder, originalName: 'Categoria do Lembrete', functions: ['required'] },
        ]);
        const resultValidator = validator.validate();

        context.nameReminder = context.getNameReminder(context.nameReminder, context.descriptionReminder);

        context.errorMessage = '';
        context.responseLoadingReminder = true;

        if (!resultValidator.isValid) {
            context.errorMessage = context.getErrorMessage(resultValidator.nonValidFields);
            context.resetValues();
            return;
        }
        const scheduledReminderFormatted = context.formatDateScheduled(context.scheduledReminder, context.hourReminder);

        context.reminderService.update(context.idReminder, {
            data: {
                name: context.nameReminder,
                category: context.categoryReminder !== '' ? context.categoryReminder : null,
                scheduled: scheduledReminderFormatted,
                description: context.descriptionReminder,
            },
        }).then((response) => {
            if (response.success) {
                // Removendo loader do botão de cadastrar
                context.responseLoadingReminder = false;

                // Definindo a resposta da requisição
                context.currentIconType = 'success';

                // Alternando a aba de resposta
                context.toggleResponse();
            }
        }).catch((error) => Object.assign(context, {
            errorMessage: error,
            responseLoadingReminder: false,
            isResponseEnabled: true,
            currentIconType: 'failure',
        }))
    }

    public async submit(): Promise<void> {
        const responseMethod = (methodType: string) => ({
            'true': this.registerReminder,
            'false': this.updateReminder,
        })[methodType];

        await responseMethod(this.isNewReminder.toString())(this);
    }

    public toggleResponse(): void {
        this.isResponseEnabled = !this.isResponseEnabled;
    }

    public hasError(fieldName: string): NonValidInput {
        return this.errorsMessage.find((currentField) => currentField.fieldName === fieldName);
    }

    public formatDate(date: string): string {
        return date ? format(new Date(date), 'yyyy-MM-dd') : '';
    }

    public onChangeValue(value: string, dataType: string): void {
        this[dataType] = value;
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

}

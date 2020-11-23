import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NonValidInput, Validator } from 'src/app/utils/classes/Validator';
import { ReminderService } from 'src/app/services/reminder.service';
import { CategoryService} from 'src/app/services/category.service';

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

    // Reminder
    public idReminder: string;
    public nameReminder: string;
    public scheduledReminder: Date;
    public descriptionReminder: string;
    public categoryReminder: string;

    public isNewReminder: boolean = false;
    public categoryOptions: Object[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<any>,
        public reminderService: ReminderService,
        public categoryService: CategoryService,
    ) {
        Object.assign(this, {
            buttonText: data.isNew ? 'Cadastrar' : 'Atualizar',
            isNewReminder: data.isNew,
            idReminder: data.idReminder,
            nameReminder: data.nameReminder,
            scheduledReminder: data.scheduledReminder,
            descriptionReminder: data.descriptionReminder,
            categoryReminder: data.categoryReminder,
        });
        console.log(this)
    }
    ngOnInit(): void {
        this.getCategoriesList();
    }

    public resetValues(): void {
        Object.assign(this, {
            nameReminder: '',
            scheduledReminder: new Date(),
            descriptionReminder: '',
            responseLoadingReminder: false,
            isResponseEnabled: false,
            currentIconType: 'success',
        })
    }

    public getCategoriesList(): void {
        this.categoryService.getAllList()
        .then((response)=>{
            console.log(response)
        })
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
        })

        return errorMessage
    }

    private async registerReminder(context: any): Promise<void> {
        const validator = new Validator([
            { inputName: 'nameReminder', inputValue: context.nameReminder, originalName: 'Nome do lembrete', functions: ['required'] },
        ]);
        const resultValidator = validator.validate();

        context.errorMessage = '';
        context.responseLoadingReminder = true;

        if (!resultValidator.isValid) {
            context.errorMessage = context.getErrorMessage(resultValidator.nonValidFields);
            context.resetValues();
            return;
        }

        context.reminderService.create({
            data: {
                name: context.nameReminder,
                scheduled: context.scheduledReminder,
                description: context.descriptionReminder,
                category: context.categoryReminder,
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
            { inputName: 'nameReminder', inputValue: context.nameReminder, originalName: 'Nome do lembrete', functions: ['required'] },
        ]);
        const resultValidator = validator.validate();

        context.errorMessage = '';
        context.responseLoadingReminder = true;

        if (!resultValidator.isValid) {
            context.errorMessage = context.getErrorMessage(resultValidator.nonValidFields);
            context.resetValues();
            return;
        }

        context.reminderService.update(context.idReminder, {
            data: {
                name: context.nameReminder,
                scheduled: context.scheduledReminder,
                description: context.descriptionReminder,
                category: context.categoryReminder,
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

    public onChangeValue(value: string, dataType: string): void{
        this[dataType] = value;
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

}

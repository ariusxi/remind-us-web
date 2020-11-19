import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NonValidInput, Validator } from 'src/app/utils/classes/Validator';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {

    public currentIconType: string = 'success';

    public buttonText: string;
    public errorMessage: string = '';
    public errorsMessage: NonValidInput[] = [];
    public responseLoadingCategory: boolean = false;

    public isResponseEnabled: boolean = false;

    // Category
    public idCategory: string;
    public titleCategory: string;
    public colorCategory: string;
    public descriptionCategory: string;

    public isNewCategory: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<any>,
        public categoryService: CategoryService,
    ) {
        Object.assign(this, {
            buttonText: data.isNew ? 'Cadastrar' : 'Atualizar',
            isNewCategory: data.isNew,
            idCategory: data.idCategory,
            titleCategory: data.titleCategory,
            colorCategory: data.colorCategory,
            descriptionCategory: data.descriptionCategory,
            refreshCategories: data.refreshCategories,
        });
    }

    public resetValues(): void {
        Object.assign(this, {
            titleCategory: '',
            colorCategory: '#000000',
            descriptionCategory: '',
            responseLoadingCategory: false,
            isResponseEnabled: false,
            currentIconType: 'success',
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

    private async registerCategory(context: any): Promise<void> {
        const validator = new Validator([
            { inputName: 'titleCategory', inputValue: context.titleCategory, originalName: 'Nome da categoria', functions: ['required'] },
        ]);
        const resultValidator = validator.validate();

        context.errorMessage = '';
        context.responseLoadingCategory = true;

        if (!resultValidator.isValid) {
            context.errorMessage = context.getErrorMessage(resultValidator.nonValidFields);
            context.resetValues();
            return;
        }

        context.categoryService.create({
            data: {
                title: context.titleCategory,
                color: context.colorCategory,
                description: context.descriptionCategory,
            },
        }).then((response) => {
            if (response.success) {
                // Removendo loader do botão de cadastrar
                context.responseLoadingCategory = false;

                // Definindo a resposta da requisição
                context.currentIconType = 'success';

                // Alternando a aba de resposta
                context.toggleResponse();
            }
        }).catch((error) => Object.assign(context, {
            errorMessage: error,
            responseLoadingCategory: false,
            isResponseEnabled: true,
            currentIconType: 'failure',
        }))
    }

    private async updateCategory(context: any): Promise<void> {
        const validator = new Validator([
            { inputName: 'titleCategory', inputValue: context.titleCategory, originalName: 'Nome da categoria', functions: ['required'] },
        ]);
        const resultValidator = validator.validate();

        context.errorMessage = '';
        context.responseLoadingCategory = true;

        if (!resultValidator.isValid) {
            context.errorMessage = context.getErrorMessage(resultValidator.nonValidFields);
            context.resetValues();
            return;
        }

        context.categoryService.update(context.idCategory, {
            data: {
                title: context.titleCategory,
                color: context.colorCategory,
                description: context.descriptionCategory,
            },
        }).then((response) => {
            if (response.success) {
                // Removendo loader do botão de cadastrar
                context.responseLoadingCategory = false;

                // Definindo a resposta da requisição
                context.currentIconType = 'success';

                // Alternando a aba de resposta
                context.toggleResponse();
            }
        }).catch((error) => Object.assign(context, {
            errorMessage: error,
            responseLoadingCategory: false,
            isResponseEnabled: true,
            currentIconType: 'failure',
        }))
    }

    public async submit(): Promise<void> {
        const responseMethod = (methodType: string) => ({
            'true': this.registerCategory,
            'false': this.updateCategory,
        })[methodType];

        await responseMethod(this.isNewCategory.toString())(this);
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

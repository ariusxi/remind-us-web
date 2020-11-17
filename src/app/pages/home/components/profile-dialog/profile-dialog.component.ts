import { Component } from '@angular/core';

import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { NonValidInput, Validator } from 'src/app/utils/classes/Validator';
import Storage from 'src/app/utils/classes/Storage';

@Component({
    selector: 'profile-dialog',
    templateUrl: './profile-dialog.component.html',
    styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent {

    public userProfile: User = Storage.get('user').user;

    public errorMessage: string = '';
    public errorsMessage: NonValidInput[] = [];

    // Profile
    public emailUser: string = '';
    public fullnameUser: string = '';
    public responseLoadingProfile: boolean = false;

    // Password
    public passwordUser: string = '';
    public confirmPasswordUser: string = '';
    public responseLoadingPassword: boolean = false;

    constructor(
        private userService: UserService,
    ) {
        Object.assign(this, {
            emailUser: this.userProfile.email,
            fullnameUser: this.userProfile.name,
        })
    }

    private resetValues(): void {
        Object.assign(this, {
            emailUser: this.userProfile.email,
            fullnameUser: this.userProfile.name,
            passwordUser: '',
            confirmPasswordUser: '',
            responseLoadingProfile: false,
            responseLoadingPassword: false,
        })
    }

    private getErrorMessage(errorMessagesArray: NonValidInput[]): string {
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

    public updateProfile(): void {
        const validator = new Validator([
            { inputName: 'emailUser', inputValue: this.emailUser, originalName: 'E-mail', functions: ['required', 'email'] },
            { inputName: 'fullnameUser', inputValue: this.fullnameUser, originalName: 'Nome completo', functions: ['required'] },
        ])
        const resultValidator = validator.validate();

        this.errorMessage = '';
        this.responseLoadingProfile = true;

        if (!resultValidator.isValid) {
            this.errorMessage = this.getErrorMessage(resultValidator.nonValidFields);
            this.resetValues();
            return;
        }

        this.userService.updateProfile({
            email: this.emailUser,
            name: this.fullnameUser,
        }).then((response) => {
            if (response.success) {
                // Defindo os dados de usuário na sessão
                Storage.set('user', response.data);

                this.responseLoadingPassword = false;
            }
        }).catch((error) => Object.assign(this, {
            errorMessage: error,
            responseLoadingProfile: false,
        }))
    }

    public updatePassword(): void {
        const validator = new Validator([
            { inputName: 'passwordUser', inputValue: this.passwordUser, originalName: 'Senha', functions: ['required'] },
            { inputName: 'confirmPasswordUser', inputValue: this.confirmPasswordUser, originalName: 'Confirmar senha', functions: ['required', 'compare'], compare: this.passwordUser },
        ])
        const resultValidator = validator.validate();

        this.errorMessage = '';
        this.responseLoadingPassword = true;

        if (!resultValidator.isValid) {
            this.errorMessage = this.getErrorMessage(resultValidator.nonValidFields);
            this.resetValues();
            return;
        }

        this.userService.updatePassword({
            password: this.passwordUser,
        }).then((response) => {
            if (response.success) {
                // Defindo os dados de usuário na sessão
                Storage.set('user', response.data);

                this.responseLoadingPassword = false;
            }
        }).catch((error) => Object.assign(this, {
            errorMessage: error,
            responseLoadingPassword: false,
        }))
    }

    public hasError(fieldName: string): NonValidInput {
        return this.errorsMessage.find((currentField) => currentField.fieldName === fieldName);
    }

    public onChangeValue(value: string, dataType: string): void{
        this[dataType] = value;
    }

}
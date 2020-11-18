import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { NonValidInput, Validator } from 'src/app/utils/classes/Validator';
import Storage from 'src/app/utils/classes/Storage';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @Output() onPageChange: EventEmitter<Object> = new EventEmitter();

    public errorMessage: string = '';

    public responseLoading: boolean = false;

    // Login
    public emailLogin: string = '';
    public passwordLogin: string = '';

    // Register
    public emailRegister: string = '';
    public fullnameRegister: string = '';
    public passwordRegister: string = '';
    public confirmPasswordRegister: string = '';
    public agreeTermsRegister: string = '';

    public errorsMessage: NonValidInput[] = [];

    public buttonType: string = 'button';
    public imageLogin: string = '/assets/images/icon-login.png';

    constructor(
        private userService: UserService,
        private route: Router,
    ) { }

    ngOnInit(): void {

    }

    private resetValues(): void {
        Object.assign(this, {
            passwordLogin: '',
            passwordRegister: '',
            confirmPasswordRegister: '',
            responseLoading: false,
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
            if (currentErrorMessage.fieldProperty.requiredTrue) {
                errorMessage = `Você deve aceitar os termos de uso`;
            }
        })

        return errorMessage
    }

    public login(): void {
        const validator = new Validator([
            { inputName: 'emailLogin', inputValue: this.emailLogin, originalName: 'E-mail', functions: ['required', 'email'] },
            { inputName: 'passwordLogin', inputValue: this.passwordLogin, originalName: 'Senha', functions: ['required'] },
        ]);
        const resultValidator = validator.validate();

        this.errorMessage = '';
        this.responseLoading = true;

        if (!resultValidator.isValid) {
            this.errorMessage = this.getErrorMessage(resultValidator.nonValidFields);
            this.resetValues();
            return;
        }

        this.userService.login(this.emailLogin, this.passwordLogin).then((response) => {
            if (response.success) {
                const { token, user } = response.data;
                // Definindo sessão de usuário
                Storage.set('token', token);
                Storage.set('user', user);

                // Enviando o usuário para a rota de dashboard
                this.route.navigate(['/home']);
            }
        }).catch((error) => Object.assign(this, {
            errorMessage: error,
            responseLoading: false,
        }))
    }

    public signin(): void {
        const validator = new Validator([
            { inputName: 'emailRegister', inputValue: this.emailRegister, originalName: 'E-mail', functions: ['required', 'email'] },
            { inputName: 'fullnameRegister', inputValue: this.fullnameRegister, originalName: 'Nome completo', functions: ['required'] },
            { inputName: 'passwordRegister', inputValue: this.passwordRegister, originalName: 'Senha', functions: ['required'] },
            { inputName: 'confirmPasswordRegister', inputValue: this.confirmPasswordRegister, originalName: 'Confirmar Senha', functions: ['required', 'compare'], compare: this.passwordRegister },
            { inputName: 'agreeTermsRegister', inputValue: this.agreeTermsRegister, originalName: 'Termos de uso', functions: ['requiredTrue'] },
        ]);
        const resultValidator = validator.validate();

        this.errorMessage = '';
        this.responseLoading = true;

        if (!resultValidator.isValid) {
            this.errorMessage = this.getErrorMessage(resultValidator.nonValidFields);
            this.resetValues();
            return;
        }

        this.userService.signin({
            email: this.emailRegister,
            password: this.passwordRegister,
            name: this.fullnameRegister,
        }).then((response) => {
            if (response.success) {
                const { token, user } = response.data;
                // Definindo sessão de usuário
                Storage.set('token', token);
                Storage.set('user', user);

                // Enviando o usuário para a rota de dashboard
                this.route.navigate(['/home']);
            }
        }).catch((error) => Object.assign(this, {
            errorMessage: error,
            responseLoading: false,
        }))
    }

    hasError(fieldName: string): NonValidInput {
        return this.errorsMessage.find((currentField) => currentField.fieldName === fieldName);
    }

    public onChangeValue(value: string, dataType: string): void{
        this[dataType] = value;
    }
}

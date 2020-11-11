import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { NonValidInput, Validator } from 'src/app/utils/classes/Validator';
import Storage from 'src/app/utils/classes/Storage';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @Output() onPageChange: EventEmitter<Object> = new EventEmitter();

    public errorMessage: string = '';

    // Login
    public emailLogin: string = '';
    public passwordLogin: string = '';

    // Register
    public emailRegister: string = '';
    public fullnameRegister: string = '';
    public passwordRegister: string = '';
    public confirmPasswordRegister: string = '';

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
            errorMessage: '',
            passwordLogin: '',
            passwordRegister: '',
            confirmPasswordRegister: '',
        })
    }

    public login(): void {
        const validator = new Validator([
            { inputName: 'emailLogin', inputValue: this.emailLogin, functions: ['required', 'email'] },
            { inputName: 'passwordLogin', inputValue: this.passwordLogin, functions: ['required'] },
        ]);
        const resultValidator = validator.validate();

        if (!resultValidator.isValid) {
            this.errorsMessage = resultValidator.nonValidFields;
            this.resetValues();
            return;
        }

        this.userService.login(this.emailLogin, this.passwordLogin).then((response) => {
            if (response.success) {
                const { token } = response.data;
                // Definindo sessão de usuário
                Storage.set('token', token);
                Storage.set('user', response.data);

                // Enviando o usuário para a rota de dashboard
                this.route.navigate(['/home']);
            }
        }).catch((error) => {
            this.errorMessage = error;
        })

    }

    public signin(): void {
        const validator = new Validator([
            { inputName: 'emailRegister', inputValue: this.emailRegister, functions: ['required', 'email'] },
            { inputName: 'fullnameRegister', inputValue: this.fullnameRegister, functions: ['required'] },
            { inputName: 'passwordRegister', inputValue: this.passwordRegister, functions: ['required'] },
            { inputName: 'confirmPasswordRegister', inputValue: this.confirmPasswordRegister, functions: ['required', 'compare'], compare: this.passwordRegister },
        ]);
        const resultValidator = validator.validate();

        if (!resultValidator.isValid) {
            this.errorsMessage = resultValidator.nonValidFields;
            this.resetValues();
            return;
        }

        this.userService.signin({
            email: this.emailRegister,
            password: this.passwordRegister,
            name: this.fullnameRegister,
        }).then((response) => {
            if (response.success) {
                const { token } = response.data;
                // Definindo sessão de usuário
                Storage.set('token', token);
                Storage.set('user', response.data);

                // Enviando o usuário para a rota de dashboard
                this.route.navigate(['/home']);
            }
        }).catch((error) => {
            this.errorMessage = error;
        })
    }

    hasError(fieldName: string): NonValidInput {
        return this.errorsMessage.find((currentField) => currentField.fieldName === fieldName);
    }

    public onChangeValue(value: string, dataType: string): void{
        this[dataType] = value;
    }
}

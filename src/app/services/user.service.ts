import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/User';
import { AbstractService } from './abstract.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends AbstractService<User> {

    /**
     * @param {string} email
     * @param {string} password
     * @description Método que efetua o login do usuário e retorna os dados
     * @returns {Observable<User>}
     * @memberof UserService
     */
    async login(email: string, password: string): Promise<User> {
        return await this.sendRequisition('auth/login', 'post', {
            email,
            password,
        });
    }

    /**
     * @param {User} user
     * @description Método que efetua o cadastro do usuário e retorna os dados dele
     * @returns {Observable<User>}
     * @memberof UserService
     */
    async signin(user: User): Promise<User> {
        return await this.sendRequisition('auth/signin', 'post', user);
    }

}

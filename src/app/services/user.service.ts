import { Injectable } from '@angular/core';

import { User } from '../models/User';
import { AbstractService, ResponseApi } from './abstract.service';

export interface AuthResponse {
    token: string;
    user: User;
}

@Injectable({
    providedIn: 'root'
})
export class UserService extends AbstractService<User> {

    /**
     * @param {string} email
     * @param {string} password
     * @description Método que efetua o login do usuário e retorna os dados
     * @returns {Promise<ResponseApi<User>>}
     * @memberof UserService
     */
    async login(email: string, password: string): Promise<ResponseApi<AuthResponse>> {
        return await this.sendRequisition('auth/login', 'post', {
            email,
            password,
        });
    }

    /**
     * @param {User} user
     * @description Método que efetua o cadastro do usuário e retorna os dados dele
     * @returns {Promise<ResponseApi<User>>}
     * @memberof UserService
     */
    async signin(user: User): Promise<ResponseApi<AuthResponse>> {
        return await this.sendRequisition('auth/signin', 'post', user);
    }

    /**
     * @param {User} user
     * @description Método que efetua a atualização de perfil do usuário
     * @returns {Promise<ResponseApi<User>>}
     * @memberof UserService
     */
    async updateProfile(user: User): Promise<ResponseApi<User>> {
        return await this.sendRequisition('auth/update-profile', 'put', user, true);
    }

    /**
     * @param {User} user
     * @description Método que efetua a atualização da foto de perfil de usuário
     * @returns {Promise<ResponseApi<User>>}
     * @memberof UserService
     */
    async updateProfilePhoto(user: User): Promise<ResponseApi<User>> {
        return await this.sendRequisition('auth/update-profile-photo', 'put', user, true);
    }

    /**
     * @param {User} user
     * @description Método que efetua a atualização da senha do usuário
     * @returns {Promise<ResponseApi<User>>}
     * @memberof UserService
     */
    async updatePassword(user: User): Promise<ResponseApi<User>> {
        return await this.sendRequisition('auth/update-password', 'put', user, true);
    }

}

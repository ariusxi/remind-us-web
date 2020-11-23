import { Injectable } from '@angular/core';

import { Reminder } from '../models/Reminder';
import { AbstractService, Paginate, ResponseApi } from './abstract.service';

@Injectable({
    providedIn: 'root',
})
export class ReminderService extends AbstractService<Reminder> {

    /**
     * @param {Reminder} reminder
     * @description Método que efetua o cadastro de categorias
     * @returns {Promise<ResponseApi<Reminder>>}
     * @memberof ReminderService
     */
    async create(reminder: Reminder): Promise<ResponseApi<Reminder>> {
        return await this.sendRequisition(`reminder/create`, 'post', reminder, true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a atualização da categoria
     * @returns {Promise<ResponseApi<Category>>}
     * @memberof CategoryService
     */
    async update(id: string, reminder: Reminder): Promise<ResponseApi<Reminder>> {
        return await this.sendRequisition(`category/update/${id}`, 'put', reminder, true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a busca pelo id da categoria
     * @returns {Promise<ResponseApi<Category>>}
     * @memberof CategoryService
     */
    async get(id: string): Promise<ResponseApi<Reminder>> {
        return await this.sendRequisition(`category/get/${id}`, 'get', true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a busca das categorias com base no usuário
     * @returns {Promise<ResponseApi<Category>>}
     * @memberof CategoryService
     */
    async getAll(): Promise<ResponseApi<Paginate<Reminder>>> {
        return await this.sendRequisition(`category/get-all`, 'get', {}, true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a remoção de uma categoria pelo id
     * @returns {Promise<ResponseApi<Category>>}
     * @memberof CategoryService
     */
    async delete(id: string): Promise<ResponseApi<Reminder>> {
        return await this.sendRequisition(`category/remove/${id}`, 'delete', {}, true);
    }

}

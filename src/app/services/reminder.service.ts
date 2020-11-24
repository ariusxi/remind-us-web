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
     * @returns {Promise<ResponseApi<Reminder>>}
     * @memberof ReminderService
     */
    async update(id: string, reminder: Reminder): Promise<ResponseApi<Reminder>> {
        return await this.sendRequisition(`reminder/update/${id}`, 'put', reminder, true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a busca pelo id da categoria
     * @returns {Promise<ResponseApi<Reminder>>}
     * @memberof ReminderService
     */
    async get(id: string): Promise<ResponseApi<Reminder>> {
        return await this.sendRequisition(`reminder/get/${id}`, 'get', true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a busca dos lembretes com base no usuário
     * @returns {Promise<ResponseApi<Reminder>>}
     * @memberof ReminderService
     */
    async getAll(page: number = 1, limit: number = 99999): Promise<ResponseApi<Paginate<Reminder>>> {
        return await this.sendRequisition(`reminder/get-all`, 'get', {
            page,
            limit,
        }, true);
    }

    /**
     * @param {string} user
     * @param {string} [periodType='week']
     * @description Método que efetua a busca dos lembretes com base no período de tempo
     * @returns {Promise<ResponseApi<Reminder[]>>}
     * @memberof ReminderService
     */
    async getAllByPeriod(user: string, periodType: string = 'week'): Promise<ResponseApi<Reminder[]>> {
        return await this.sendRequisition(`reminder/get-all-list/${user}/${periodType}`, 'get', {}, true);
    }

    /**
     * @param {string} category
     * @description Método que efetua a busca das lembretes com base na categoria
     * @returns {Promise<ResponseApi<Reminder[]>>}
     * @memberof ReminderService
     */
    async getAllByCategory(category: string): Promise<ResponseApi<Reminder[]>> {
        return await this.sendRequisition(`reminder/get-all-by-category/${category}`, 'get', {}, true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a remoção de uma categoria pelo id
     * @returns {Promise<ResponseApi<Reminder>>}
     * @memberof ReminderService
     */
    async delete(id: string): Promise<ResponseApi<Reminder>> {
        return await this.sendRequisition(`reminder/remove/${id}`, 'delete', {}, true);
    }

}

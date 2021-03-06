import { Injectable } from '@angular/core';

import { Category } from '../models/Category';
import { AbstractService, Paginate, ResponseApi } from './abstract.service';

@Injectable({
    providedIn: 'root',
})
export class CategoryService extends AbstractService<Category> {

    /**
     * @param {Category} category
     * @description Método que efetua o cadastro de categorias
     * @returns {Promise<ResponseApi<Category>>}
     * @memberof CategoryService
     */
    async create(category: Category): Promise<ResponseApi<Category>> {
        return await this.sendRequisition(`category/create`, 'post', category, true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a atualização da categoria
     * @returns {Promise<ResponseApi<Category>>}
     * @memberof CategoryService
     */
    async update(id: string, category: Category): Promise<ResponseApi<Category>> {
        return await this.sendRequisition(`category/update/${id}`, 'put', category, true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a busca pelo id da categoria
     * @returns {Promise<ResponseApi<Category>>}
     * @memberof CategoryService
     */
    async get(id: string): Promise<ResponseApi<Category>> {
        return await this.sendRequisition(`category/get/${id}`, 'get', true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a busca das categorias com base no usuário
     * @returns {Promise<ResponseApi<Category>>}
     * @memberof CategoryService
     */
    async getAll(page: number = 1, limit: number = 99999): Promise<ResponseApi<Paginate<Category>>> {
        return await this.sendRequisition(`category/get-all`, 'get', {
            page,
            limit,
        }, true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a busca em lista das categorias com base no usuário
     * @returns {Promise<ResponseApi<Category[]>>}
     * @memberof CategoryService
     */
    async getAllList(): Promise<ResponseApi<Category[]>>{
        return await this.sendRequisition(`category/get-all-list`, 'get', {}, true);
    }

    /**
     * @param {Category} category
     * @description Método que efetua a remoção de uma categoria pelo id
     * @returns {Promise<ResponseApi<Category>>}
     * @memberof CategoryService
     */
    async delete(id: string): Promise<ResponseApi<Category>> {
        return await this.sendRequisition(`category/remove/${id}`, 'delete', {}, true);
    }

}

'use strict'

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import Storage from 'src/app/utils/classes/Storage';

export interface ResponseApi<T> {
    success: boolean;
    data: T;
}

export interface Paginate<T> {
    docs: T[];
    totalDocs: number;
    totalPages: number;
    limit: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;
}

@Injectable({
    providedIn: 'root'
})
export class AbstractService<T> {

    public url: string = 'https://remind-us-api.vercel.app/api/v1';
    public numberOfTries: number = 2;

    constructor(
        private httpClient: HttpClient,
    ) {}

    private getCurrentMethodType(methodType: string): string {
        return ['get', 'delete'].includes(methodType) ? 'get' : 'default';
    }

    private getCurrentHttpOptions(isAuth: boolean, methodType: string = 'get', dataRequisition: any = {}) {
        // Adicionando parametros à url
        let params = new HttpParams();
        if (methodType === 'get' && Object.keys(dataRequisition).length > 0) {
            const {page, limit} = dataRequisition;

            // Adicionando parametros para url tipo GET
            params = new HttpParams()
                .set('page', page)
                .set('limit', limit);
        }

        if (isAuth) {
            const sessionToken = Storage.get('token');
            return ({
                params,
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'x-access-token': sessionToken,
                }),
            })
        }

        return ({
            params,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        })
    }

    public getEndPointRoute(endpoint: string): string {
        return `${this.url}/${endpoint}`;
    }

    public handleError(errorData: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
        if (errorData.error) {
            errorMessage = errorData.error.message;
        } else {
            errorMessage = `Error code: ${errorData.status}, message: ${errorData.message}`;
        }
        return throwError(errorMessage);
    }

    public urlRequisition(endpoint: string, methodType: string = 'get', dataRequisition: object = {}, isAuthRoute: boolean = false): Observable<T> {
        const route: string = this.getEndPointRoute(endpoint);
        const httpOptions: object = this.getCurrentHttpOptions(isAuthRoute, methodType, dataRequisition);

        return this.httpClient[methodType]<T>(route, httpOptions)
            .pipe(
                retry(this.numberOfTries),
                catchError(this.handleError),
            );
    }

    public dataRequisition(endpoint: string, methodType: string = 'post', dataRequisition: Object = {}, isAuthRoute: boolean = false): Observable<T> {
        const formattedData: string = JSON.stringify(dataRequisition);
        const route: string = this.getEndPointRoute(endpoint);
        const httpOptions: object = this.getCurrentHttpOptions(isAuthRoute, methodType, dataRequisition);

        return this.httpClient[methodType]<T>(route, formattedData, httpOptions)
            .pipe(
                retry(this.numberOfTries),
                catchError(this.handleError),
            );
    }

    public sendRequisition(endpoint: string, methodType: string = 'get', dataRequisition: Object = {}, isAuthRoute: boolean = false): any {
        const currentMethodType: string = this.getCurrentMethodType(methodType);
        const getRequisitionMethod = (type: string) => ({
            'get': () => this.urlRequisition(endpoint, methodType, dataRequisition, isAuthRoute),
            'default': () => this.dataRequisition(endpoint, methodType, dataRequisition, isAuthRoute),
        }[type]);

        // Verificando se o método enviado está dentro do esperado dos 4 tipos
        if (!['get', 'post', 'put', 'delete'].includes(methodType)) {
            throw new Error('Method type not found');
        }

        const methodResult = getRequisitionMethod(currentMethodType)();

        return new Promise((resolve, reject) => {
            methodResult.subscribe(
                (data) => resolve(data),
                (err) => reject(err),
            )
        })
    }

}

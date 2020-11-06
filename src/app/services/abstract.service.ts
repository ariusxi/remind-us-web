'use strict'

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AbstractService<T> {

    public url: string = 'https://api-remind-us.herokuapp.com/api/v1';
    public numberOfTries: number = 2;

    public httpOptions: Object = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(
        private httpClient: HttpClient,
    ) {}

    private getCurrentMethodType(methodType: string): string {
        return methodType === 'get' ? 'get' : 'default';
    }

    public getEndPointRoute(endpoint: string): string {
        return `${this.url}/${endpoint}`;
    }

    public handleError(errorData: HttpErrorResponse): Observable<never> {
        let errorMessage = ''
        if (errorData.error instanceof ErrorEvent) {
            errorMessage = errorData.error.message;
        } else {
            errorMessage = `Error code: ${errorData.status}, message: ${errorData.message}`;
        }
        return throwError(errorMessage);
    }

    public urlRequisition(endpoint: string, methodType: string = 'get'): Observable<T> {
        const route: string = this.getEndPointRoute(endpoint);
        return this.httpClient[methodType]<T>(route)
            .pipe(
                retry(this.numberOfTries),
                catchError(this.handleError),
            );
    }

    public dataRequisition(endpoint: string, methodType: string = 'post', dataRequisition: Object = {}): Observable<T> {
        const formattedData: string = JSON.stringify(dataRequisition);
        const route: string = this.getEndPointRoute(endpoint);

        return this.httpClient[methodType]<T>(route, formattedData, this.httpOptions)
            .pipe(
                retry(this.numberOfTries),
                catchError(this.handleError),
            );
    }

    public sendRequisition(endpoint: string, methodType: string = 'get', dataRequisition: Object = {}): Promise<T> {
        const currentMethodType: string = this.getCurrentMethodType(methodType);
        const getRequisitionMethod = (type: string) => ({
            'get': () => this.urlRequisition(endpoint, methodType),
            'default': () => this.dataRequisition(endpoint, methodType, dataRequisition),
        }[type]);

        // Verificando se o método enviado está dentro do esperado dos 4 tipos
        if (!['get', 'post', 'put', 'delete'].includes(methodType)) {
            throw new Error('Method type not found');
        }

        const methodResult = getRequisitionMethod(currentMethodType)();

        return new Promise((resolve, reject) => {
            methodResult.subscribe(
                (data) => resolve(data),
                (err) => reject(err)
            )
        })
    }

}

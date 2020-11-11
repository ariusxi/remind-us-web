import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import Storage from 'src/app/utils/classes/Storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public jwtHelper: JwtHelperService,
    ) {}

    public isAuthenticated(): boolean {
        const token = Storage.get('token');

        return !this.jwtHelper.isTokenExpired(token);
    }

}

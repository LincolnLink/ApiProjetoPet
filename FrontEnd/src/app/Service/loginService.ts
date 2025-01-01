import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "./baseService";
import { User } from "../Module/user";
import { UserServiceInterface } from "../Interface/loginServiceInterface";

@Injectable({
    providedIn: 'root',
})
export class LoginService extends BaseService implements UserServiceInterface {
    constructor(private http: HttpClient) { 
        super();
    }

    isBrowser(): boolean {
        return typeof window !== 'undefined';
    }

    login(user: User): Observable<User> {
        return this.http
            .post(`${this.UrlServiceV1}entrar`, user, super.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError)
        );
    }

    persistirUserApp(response: any): void {
        if (this.isBrowser()) {
            localStorage.setItem('app.token', response.accessToken);
            localStorage.setItem('app.user', JSON.stringify(response.userToken));
        }
    }

    obterTokenUsuario(): string | null{
        if (this.isBrowser()) {
            return localStorage.getItem('app.token');
        }
        return null;
    }

    obterUsuario(): any {
        if (this.isBrowser()) {
            return JSON.parse(localStorage.getItem('app.user') || 'null');
        }
        return null;
    }
}
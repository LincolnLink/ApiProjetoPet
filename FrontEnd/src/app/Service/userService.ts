import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "./baseService";
import { User } from "../Module/user";

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseService {
    constructor(private http: HttpClient) { 
        super();
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
        localStorage.setItem('app.token', response.accessToken);
        localStorage.setItem('app.user', JSON.stringify(response.userToken));
    }

    obterTokenUsuario(): string | null {
        return localStorage.getItem('app.token');
    }

    obterUsuario(): any {
        return JSON.parse(localStorage.getItem('app.user') || 'null');
    }

    // public obterUsuario(): string | null {
    //     if (typeof window !== 'undefined' && localStorage) {
    //         return JSON.parse(localStorage.getItem('app.user') || 'null');
    //     }     
    //     return null;   
    // }

    // protected obterTokenUsuario(): string | null {
    //     if (typeof window !== 'undefined' && localStorage) {
    //         return localStorage.getItem('app.token');
    //     }
    //     return null;
    // }
}
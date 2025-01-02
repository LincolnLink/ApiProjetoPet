import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "./baseService";
import { User } from "../Module/user";
import { UserServiceInterface } from "../Interface/loginServiceInterface";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService implements UserServiceInterface {
   
    constructor(
        private http: HttpClient,
        private router: Router) {
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
            localStorage.setItem('app.tokenExpiration', response.expiresIn);
            
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

    isTokenValid(): boolean {
        const expiration = localStorage.getItem('app.tokenExpiration');
        return expiration ? new Date(expiration).getTime() > Date.now() : false;
    }

    isUserAuthenticated(): boolean {
        if (typeof localStorage === 'undefined') {
            return false;
        }
        const token = localStorage.getItem('app.token');
        return !!token && this.isTokenValid();
    }
    
    logout(): void {
        // Limpa os dados armazenados no navegador
        localStorage.removeItem('app.token');
        localStorage.removeItem('app.user');
        
    
        // (Opcional) Envia requisição para o backend para invalidar a sessão ou token
        this.http.post(`${this.UrlServiceV1}logout`, {}, super.ObterHeaderJson())
            .subscribe({
                next: () => {
                    console.log('Logout realizado com sucesso no backend');
                },
                error: (error) => {
                    console.error('Erro ao realizar logout no backend', error);
                }
            });
    
        // Redireciona para a tela de login
        this.router.navigate(['/login']);
    }
    
}
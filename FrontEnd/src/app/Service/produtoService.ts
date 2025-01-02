import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Produto } from '../Module/produto';
import { BaseService } from './baseService';
import { Fornecedor } from '../Interface/fornecedor';
import { AuthService } from './authService';

@Injectable({
    providedIn: 'root',
})
export class ProdutoService extends BaseService {
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { super() }

    obterTodos(): Observable<Produto[]> {
        let token = this.authService.obterTokenUsuario();

        if(token != null)
        {        
            return this.http
                .get<Produto[]>(this.UrlServiceV1 + 'produtos/ObterTodos', super.ObterAuthHeaderJson(token))
                .pipe(
                    catchError(this.serviceError));
        } else {
            return throwError(() => new Error('Token inválido ou inexistente.'));
        } 
    }

    registrarProdutoAlternativo(produto: FormData): Observable<Produto> {

        let token = this.authService.obterTokenUsuario();

        if(token != null)
        {        
            return this.http
                .post(this.UrlServiceV1 + 'produtos/AdicionarAlternativo', produto, super.ObterHeaderFormData(token))
                .pipe(
                    map(super.extractData),
                    catchError(super.serviceError)
                );

        } else {
            return throwError(() => new Error('Token inválido ou inexistente.'));
        } 
    }

    registrarProduto(produto: Produto): Observable<Produto> {

        let token = this.authService.obterTokenUsuario();

        if(token != null)
        {
            return this.http
            .post(this.UrlServiceV1 + 'produtos/Adicionar', produto, super.ObterAuthHeaderJson(token))
            .pipe(
                map(super.extractData),
                catchError(super.serviceError)
            );
        } else {
            return throwError(() => new Error('Token inválido ou inexistente.'));
        }        
    }

    obterFornecedores(): Observable<Fornecedor[]> {

        let token = this.authService.obterTokenUsuario();

        if(token != null)
        {
            return this.http
                .get<Fornecedor[]>(this.UrlServiceV1 + 'fornecedores', super.ObterAuthHeaderJson(token))
                .pipe(
                    catchError(super.serviceError)
                );

        } else {
            return throwError(() => new Error('Token inválido ou inexistente.'));
        }
    }
}
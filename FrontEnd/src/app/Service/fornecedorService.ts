import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Fornecedor } from '../Interface/fornecedor';
import { BaseService } from './baseService';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService extends BaseService { 

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    super();
  }

  obterTodos(): Observable<Fornecedor[]> {
    const token = this.authService.obterTokenUsuario();

    if (token != null) {
      return this.http
        .get<Fornecedor[]>(
          this.UrlServiceV1 + 'fornecedores/ObterTodos',
          super.ObterAuthHeaderJson(token)
        )
        .pipe(catchError(this.serviceError));
    } else {
      return throwError(() => new Error('Token inválido ou inexistente.'));
    }
  }

  cadastrarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    const token = this.authService.obterTokenUsuario();

    if (token != null) {
      return this.http.post<Fornecedor>(
          this.UrlServiceV1 + 'fornecedor/Adicionar', fornecedor
      ).pipe(
        catchError((error) => throwError(() => error))
      );
    } else {
      return throwError(() => new Error('Token inválido ou inexistente.'));
    }
  }




}

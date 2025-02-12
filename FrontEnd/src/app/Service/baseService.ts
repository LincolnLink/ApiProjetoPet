import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {

    //protected UrlServiceV1: string = "https://localhost:44376/api/v1/";
    protected UrlServiceV1: string = "https://localhost:5001/api/v1/";
    //protected UrlServiceV1: string = "http://localhost:36787/api/";
    //protected UrlServiceV1: string = "https://localhost:44320/api/v1/";
    //protected UrlServiceV1: string = "https://devioapi.azurewebsites.net/api/v1/";

    //Pega o token com o medodo obterTokenUsuario que está em userService.
    protected ObterHeaderFormData(token: string) {
        return {
            headers: new HttpHeaders({
                'Content-Disposition': 'form-data; name="produto"',
                'Authorization': `Bearer ${token}`
                // 'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        };
    }

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    //Pega o token com o medodo obterTokenUsuario que está em userService.
    protected ObterAuthHeaderJson(token: string) {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                // 'Authorization': `Bearer ${this.obterTokenUsuario()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }
   
    protected serviceError(error: any) {
        let customError: string[] = [];
    
        if (error.error) {
            // Se o backend retornar erros no formato esperado
            if (error.error.errors && Array.isArray(error.error.errors)) {
                customError = error.error.errors;
            } 
            // Captura mensagens específicas de erro, caso não esteja no formato padrão
            else if (typeof error.error === 'string') {
                customError.push(error.error);
            } 
            // Se o backend retornar um objeto de erro
            else if (error.error.message) {
                customError.push(error.error.message);
            }
        } else {
            customError.push('Ocorreu um erro inesperado.');
        }
    
        console.error('Erro no serviço:', customError);
        // Retorna o erro em um formato consistente para o componente
        return throwError(() => ({
            status: error.status,
            errors: customError
        }));
    }
    


    // protected serviceError(error: Response | any) {
    //     let errMsg: string;

    //     if (error instanceof Response) {

    //         errMsg = `${error.status} - ${error.statusText || ''}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }

    //     console.error(errMsg);
    //     return throwError(errMsg);
    // }
}
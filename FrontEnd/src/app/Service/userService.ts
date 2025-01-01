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
export class UserService extends BaseService{
    constructor(private http: HttpClient) { 
        super();
    }

    register(user: User): Observable<any> {
        return this.http
          .post(`${this.UrlServiceV1}nova-conta`, user, super.ObterHeaderJson())
          .pipe(
            map(super.extractData),
            catchError(super.serviceError)
          );
    }


}
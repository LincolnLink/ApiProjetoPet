import { Observable } from "rxjs/internal/Observable";
import { User } from "../Module/user";

export interface UserServiceInterface{
    
    login(user: User): Observable<User>;
    persistirUserApp(response: any): void;
    obterTokenUsuario(): string | null;
    obterUsuario(): any;
}
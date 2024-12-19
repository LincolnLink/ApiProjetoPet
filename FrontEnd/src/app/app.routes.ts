import { Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { ListaProdutoComponent } from './Component/lista-produto/lista-produto.component';
import { CadastroProdutoComponent } from './Component/cadastro-produto/cadastro-produto.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},    
    {path: 'cadastro-produto', component: CadastroProdutoComponent}, 
    {path: 'lista-produto', component: ListaProdutoComponent},
    {path: 'login', component: LoginComponent},  
    {path: '', redirectTo:'login', pathMatch: 'full' },
    {path: '**', redirectTo:'login', pathMatch: 'full' }

];

import { Routes } from '@angular/router';
import { ListaProdutoComponent } from './lista-produto/lista-produto.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';


export const PRODUTO_ROUTES: Routes = [
    {path: '', component: ListaProdutoComponent},
    {path: ':id', component: CadastroProdutoComponent}
]
import { Routes } from '@angular/router';
import { ListaFornecedorComponent } from './lista-fornecedor/lista-fornecedor.component';
import { CadastroFornecedorComponent } from './cadastro-fornecedor/cadastro-fornecedor.component';

export const FORNECEDOR_ROUTES: Routes = [
    {path: '', component: ListaFornecedorComponent},
    {path: 'novo', component: CadastroFornecedorComponent},
    {path: ':id', component: CadastroFornecedorComponent}
]
import { Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { ListaProdutoComponent } from './Component/produto/lista-produto/lista-produto.component';
import { CadastroProdutoComponent } from './Component/produto/cadastro-produto/cadastro-produto.component';
import { CadastroUsuarioComponent } from './Component/usuario/cadastro-usuario/cadastro-usuario.component';

export const routes: Routes = [    
    {path: '', component: LoginComponent},    
    {
        path: 'produtos',
        loadChildren: () => import('../app/Component/produto/produto.routes')
        .then(r => r.PRODUTO_ROUTES)
    },
    {path: 'login', component: LoginComponent},
    {path: 'cadastro-usuario', component: CadastroUsuarioComponent},
    {path: '', redirectTo:'login', pathMatch: 'full' },
    {path: '**', redirectTo:'login', pathMatch: 'full' }
];

// {path: 'cadastro-produto', component: CadastroProdutoComponent},
// {path: 'lista-produto', component: ListaProdutoComponent},

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { CadastroUsuarioComponent } from './Component/usuario/cadastro-usuario/cadastro-usuario.component';
import { AuthGuard } from './Guard/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},    
    {
        path: 'home',        
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'produtos',
        canActivate: [AuthGuard],
        loadChildren: () => import('../app/Component/produto/produto.routes')
        .then(r => r.PRODUTO_ROUTES)
    },    
    {
        path: 'cadastro-usuario',        
        component: CadastroUsuarioComponent,
        canActivate: [AuthGuard],
    },
    {path: '', redirectTo:'login', pathMatch: 'full' },
    {path: '**', redirectTo:'login', pathMatch: 'full' }
];

// {path: 'cadastro-produto', component: CadastroProdutoComponent},
// {path: 'lista-produto', component: ListaProdutoComponent},

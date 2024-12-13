import { Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';

export const routes: Routes = [
    {path: 'home', component: LoginComponent},
    // {path: 'teste', component: TesteComponent},
    {path: '', redirectTo:'home', pathMatch: 'full' },
    {path: '**', redirectTo:'home', pathMatch: 'full' }

];

import { Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { TesteComponent } from './Component/teste/teste.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'teste', component: TesteComponent},
    {path: '', redirectTo:'home', pathMatch: 'full' },
    {path: '**', redirectTo:'home', pathMatch: 'full' }

];

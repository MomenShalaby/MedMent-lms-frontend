import { Routes } from '@angular/router';
import { HomeComponent } from './home-page/home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },{
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    }
];

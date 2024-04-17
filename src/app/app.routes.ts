import { Routes } from '@angular/router';
import { HomeComponent } from './home-page/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },{
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },{
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    }
];

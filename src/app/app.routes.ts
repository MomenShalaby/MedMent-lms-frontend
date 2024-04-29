import { Routes } from '@angular/router';
import { HomeComponent } from './home-page/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CourseComponent } from './course-page/course/course.component';
import { ContactUsComponent } from './contact-us-page/contact-us/contact-us.component';
import { AboutComponent } from './about-page/about/about.component';
import { SupportUsPageComponent } from './support-us-page/support-us-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    },

    {
        path: 'course',
        component: CourseComponent,
        title: 'Course'
    },

    {
        path: 'about',
        component: AboutComponent,
        title: 'About'
    },

    {
        path: 'contact-us',
        component: ContactUsComponent,
        title: 'Contact Us'
    },

    {
        path: 'support-us',
        component: SupportUsPageComponent,
        title: 'Support Us'
    }
];

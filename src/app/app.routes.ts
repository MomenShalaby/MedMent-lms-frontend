import { Routes } from '@angular/router';
import { HomeComponent } from './home-page/home/home.component';
import { LoginComponent } from './auth/user/login/login.component';
import { RegisterComponent } from './auth/user/register/register.component';
import { CourseComponent } from './course-page/course/course.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AddEventComponent } from './admin/dashboard/add-event/add-event.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AddCourseComponent } from './admin/dashboard/add-course/add-course.component';
import { ViewCoursesComponent } from './admin/dashboard/view-courses/view-courses.component';
import { ViewEventsComponent } from './admin/dashboard/view-events/view-events.component';

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
    }, {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin',
        children: [
            {
                path: 'login',
                component: AdminLoginComponent,
                title: 'Admin login'
            }, {
                path: 'dashboard',
                component: DashboardComponent,
                title: 'Dashboard',
                children: [
                    {
                        path: 'add-event',
                        component: AddEventComponent,
                        title: 'Add event',
                    },{
                        path: 'add-course',
                        component: AddCourseComponent,
                        title: 'Add Course',
                    },{
                        path: 'view-courses',
                        component: ViewCoursesComponent,
                        title: 'Courses',
                    },{
                        path: 'view-events',
                        component: ViewEventsComponent,
                        title: 'Events',
                    }
                ]
            }]


    }, {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot password'
    }, {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'Reset password'
    }, {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: 'Reset password'
    }
    //dashboard
    , {
        path: 'admin-profile',
        component: ProfileComponent,
        title: 'Admin profile'
    }
];

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
import { ProfileComponent } from './profile/profile.component';
import { AddCourseComponent } from './admin/dashboard/add-course/add-course.component';
import { ViewCoursesComponent } from './admin/dashboard/view-courses/view-courses.component';
import { ViewEventsComponent } from './admin/dashboard/view-events/view-events.component';
import { ContactUsComponent } from './contact-us-page/contact-us/contact-us.component'; 
import { AboutComponent } from './about-page/about/about.component';
import { SupportUsPageComponent } from './support-us-page/support-us-page.component';
import { SocialActivitiesPageComponent } from './social-activities-page/social-activities-page.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { MembershipComponent } from './membership/membership.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseVideoComponent } from './course-video/course-video.component';
import { InterestsComponent } from './interests/interests.component';

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
        path: 'profile',
        component: ProfileComponent,
        title: 'profile'
    },

    {   
        path: 'support-us',
        component: SupportUsPageComponent,
        title: 'Support Us'
    },

    {
        path: 'events',
        component: SocialActivitiesPageComponent,
        title: 'Events'
    },

    {
        path: 'event/:id',
        component: EventDetailsComponent,
        title: 'Event Details'
    },

    {
        path: 'course/:id',
        component: CourseDetailsComponent,
        title: 'Course Details'
    },

    {
        path: 'course/:id/vedio',
        component: CourseVideoComponent,
        title: 'Course Vedio'
    },

    {
        path: 'membership',
        component: MembershipComponent,
        title: 'Membership'
    },

    {
        path: 'interests',
        component: InterestsComponent,
        title: 'Interests'
    },

    {
        path: 'add',
        component: AddCourseComponent,
        title: 'Add Course'
    }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './home-page/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CourseComponent } from './course-page/course/course.component';
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
];

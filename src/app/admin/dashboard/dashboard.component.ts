import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { RouterOutlet } from '@angular/router';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { DisplayCourseComponent } from './display-course/display-course.component';
import { CounterSectionComponent } from '../../counter-section/counter-section.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,AddEventComponent,AddCourseComponent,AdminNavbarComponent,RouterOutlet,
    UpdateCourseComponent, DisplayCourseComponent, CounterSectionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

import { Component } from '@angular/core';
import { CardComponent } from '../../../course-page/card/card.component';

@Component({
  selector: 'app-view-courses',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './view-courses.component.html',
  styleUrl: './view-courses.component.css'
})
export class ViewCoursesComponent {

}

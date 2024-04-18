import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

}

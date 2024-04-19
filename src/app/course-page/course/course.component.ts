import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CategoryComponent } from '../category/category.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CardComponent, CategoryComponent, SearchComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

}

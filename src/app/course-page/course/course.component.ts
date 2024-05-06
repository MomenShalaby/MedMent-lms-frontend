import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CategoryComponent } from '../category/category.component';
import { SearchComponent } from '../search/search.component';
import { CourseService } from '../../core/services/course/course-service.service';
import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CardComponent, CategoryComponent, SearchComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit{
  courses: Course[] = [];

  constructor(private courseService: CourseService){}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

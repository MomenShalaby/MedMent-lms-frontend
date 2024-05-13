import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CategoryComponent } from '../category/category.component';
import { SearchComponent } from '../search/search.component';
import { CourseService } from '../../core/services/course/course-service.service';
import { Course } from '../../core/models/course.model';
import { PageTitleComponent } from '../../partials/page-title/page-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CardComponent, CategoryComponent, SearchComponent, PageTitleComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit{
  courses: Course[] = [];

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const categoryId = Number(params.get("category"));
      if(categoryId){
        this.getCourses();
        // this.getCategoryCourses(categoryId);
      }
      else{
        this.getCourses();
      }
    });
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

  getCategoryCourses(categoryId: number){
    this.courseService.getCategoryCourses(categoryId).subscribe({
      next: (res) => {
        this.courses = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

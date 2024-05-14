import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CategoryComponent } from '../category/category.component';
import { SearchComponent } from '../search/search.component';
import { CourseService } from '../../core/services/course/course-service.service';
import { Course } from '../../core/models/course.model';
import { PageTitleComponent } from '../../partials/page-title/page-title.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../core/services/categories/category.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CardComponent, CategoryComponent, SearchComponent, PageTitleComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit{
  courses: Course[] = [];
  category: string = "";

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const categoryId = Number(params.get("category"));
      if(categoryId){
        this.getCategoryCourses(categoryId);
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
        this.category = res.data.name;
        this.courses = res.data.course;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  searchCourse(courseName: string){
    console.log(courseName);
    this.courseService.searchCourse(courseName).subscribe({
      next: (res) => {
        this.courses = res.data.courses;
        this.categoryService.getCategory(res.data.courses[0].category_id).subscribe({
          next: (res) => {
            this.category = res.data.name;
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

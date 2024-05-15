import { Component, OnInit } from '@angular/core';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course/course-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-courses.component.html',
  styleUrl: './view-courses.component.css'
})
export class ViewCoursesComponent implements OnInit{
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

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

  deleteCourse(id: number){
    this.courseService.deleteCourse(id).subscribe({
      next: (res) => {
        this.getCourses();
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }
}

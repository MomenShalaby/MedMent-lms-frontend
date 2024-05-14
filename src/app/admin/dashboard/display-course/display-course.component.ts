import { Component, OnInit } from '@angular/core';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course/course-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-display-course',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './display-course.component.html',
  styleUrl: './display-course.component.css'
})
export class DisplayCourseComponent implements OnInit{

  course: Course = {} as Course;
  courseId: number = 0;

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCourseById();
  }

  getCourseById(){
    this.activatedRoute.paramMap.subscribe( params => {
      this.courseId = Number(params.get("id"));
      if(!this.courseId) return;
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (res) => {
          this.course = res.data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  addSection(){
    
  }

}

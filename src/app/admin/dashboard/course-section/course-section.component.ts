import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course/course-service.service';
import { Course } from '../../../core/models/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.css'
})
export class CourseSectionComponent implements OnInit{

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

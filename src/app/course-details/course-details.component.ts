import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../core/models/course.model';
import { CourseService } from '../core/services/course/course-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css', '../../assets/css/style.css']
})
export class CourseDetailsComponent implements OnInit{
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
}

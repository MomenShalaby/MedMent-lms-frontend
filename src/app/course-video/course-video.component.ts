import { Component, OnInit } from '@angular/core';
import { CourseService } from '../core/services/course/course-service.service';
import { CategoryService } from '../core/services/categories/category.service';
import { Course, Lecture } from '../core/models/course.model';
import { Category } from '../core/models/category.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../core/pipe/safe.pipe';
import { NgbAccordionModule, NgbAccordionToggle, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-video',
  standalone: true,
  imports: [CommonModule, SafePipe, NgbAccordionModule],
  templateUrl: './course-video.component.html',
  styleUrl: './course-video.component.css'
})
export class CourseVideoComponent implements OnInit{

  course: Course = {} as Course;
  categories: Category[] = [];
  courseId: number = 0;
  lectures: Lecture[] = [{} as Lecture];
  currentLecture: number = 0;
  relatedCourses: Course[] = [{} as Course];

  constructor(private courseService: CourseService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCourse();
    this.getCategories();
  }

  getCourse(){
    this.activatedRoute.paramMap.subscribe( params => {
      this.courseId = Number(params.get("id"));
      if(!this.courseId) return;
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (res) => {
          this.course = res.data;
          this.lectures = this.course.sections.flatMap(x => x.lectures);
          console.log(this.lectures);
          
          this.getRelatedCourses(this.course.prerequisites);
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getRelatedCourses(prerequisites: string){
    // this.courseService.getRelatedCourse(prerequisites).subscribe({
    //     next: (res) => {
    //     this.relatedCourses = res.data;
    //   },
    //   error: (err) => {
    //     console.log(err); 
    //   }
    // });
    var prerequisitesList = prerequisites.split(',');
    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.relatedCourses = (res.data as Course[]).filter(x => prerequisitesList.includes(x.name));
      },
      error: (err) => {
        console.log(err); 
      }
    });
  }

  previousLecture(){
    this.currentLecture--;
  }

  nextLecture(){
    this.currentLecture++;
  }

  changeLecture(index: number){
    this.currentLecture = index;
    window.scroll({
      behavior: 'smooth',
      top: 0
    })
  }
}

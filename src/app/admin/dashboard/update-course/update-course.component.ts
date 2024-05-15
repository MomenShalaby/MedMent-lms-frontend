import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course/course-service.service';
import { CategoryService } from '../../../core/services/categories/category.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category.model';
import { ActivatedRoute } from '@angular/router';
import { Course, UpdateCourse } from '../../../core/models/course.model';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent implements OnInit{
  courseId: number = 0;
  selectedCourse: Course = {} as Course;
  categories: Category[] = [];
  form = new FormGroup({
    course_name: new FormControl<string>("", [Validators.required]),
    description: new FormControl<string>("", [Validators.required]),
    instructor: new FormControl<string>("", []),
    course_title: new FormControl<string>("", [Validators.required]),
    video: new FormControl<string>("", [Validators.required]),
    label: new FormControl<string>("", []),
    duration: new FormControl<string>("", [Validators.required]),
    resources: new FormControl<string>("", []),
    certificate: new FormControl<string>("", []),
    prerequisites: new FormControl<string>("", []),
    featured: new FormControl<string>("", []),
    status: new FormControl<string>("", []), //active || inactive: default
    price: new FormControl<number>(0, [Validators.required])
  });

  constructor(private courseService: CourseService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCourseById();
    this.getCategories();
  }

  getCourseById(){
    this.activatedRoute.paramMap.subscribe( params => {
      this.courseId = Number(params.get("id"));
      if(!this.courseId) return;
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (res) => {
          this.selectedCourse = res.data;
          this.form = new FormGroup({
            course_name: new FormControl<string>(this.selectedCourse.name, [Validators.required]),
            description: new FormControl<string>(this.selectedCourse.description, [Validators.required]),
            instructor: new FormControl<string>(this.selectedCourse.instructor, []),
            course_title: new FormControl<string>(this.selectedCourse.title, [Validators.required]),
            video: new FormControl<string>(this.selectedCourse.video, [Validators.required]),
            label: new FormControl<string>(this.selectedCourse.label, []),
            duration: new FormControl<string>(this.selectedCourse.duration, [Validators.required]),
            resources: new FormControl<string>(this.selectedCourse.resources, []),
            certificate: new FormControl<string>(this.selectedCourse.certificate, []),
            prerequisites: new FormControl<string>(this.selectedCourse.prerequisites, []),
            featured: new FormControl<string>(this.selectedCourse.featured, []),
            status: new FormControl<string>(this.selectedCourse.status, []), //active || inactive: default
            price: new FormControl<number>(this.selectedCourse.price, [Validators.required])
          });
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

  updateCourse(){
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return
    }
    var course = this.form.value as UpdateCourse;
    this.courseService.updateCourse(this.courseId, course).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateCourseImage(event: any){
    var image = event.target.files?.[0];
    if(image){
      const formData = new FormData();
      formData.append('image', image, image.name);
      this.courseService.updateCourseImage(this.courseId, formData).subscribe({
        next: (res) => {
          this.selectedCourse = res.data
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}

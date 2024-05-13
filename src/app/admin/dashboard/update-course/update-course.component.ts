import { Component } from '@angular/core';
import { CourseService } from '../../../core/services/course/course-service.service';
import { CategoryService } from '../../../core/services/categories/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent {
  categories: Category[] = [];
  courseImage: any = null;
  form = new FormGroup({
    course_name: new FormControl<string>("", [Validators.required]),
    description: new FormControl<string>("", [Validators.required]),
    category_id: new FormControl<number>(0, [Validators.required]),
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
  ) {}

  ngOnInit(): void {
    this.getCategories();
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

  imageChange(event: any){
    this.courseImage = event.target.files[0]; 
  }

  updateCourse(){
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return
    }
    const formData = new FormData();
    formData.append('course_name', this.form.controls.course_name.value!);
    formData.append('description', this.form.controls.description.value!);
    formData.append('image', this.courseImage, this.courseImage.name);
    formData.append('category_id', this.form.controls.category_id.value!.toString());
    formData.append('instructor', this.form.controls.instructor.value!);
    formData.append('course_title', this.form.controls.course_title.value!);
    formData.append('video', this.form.controls.video.value!);
    formData.append('label', this.form.controls.label.value!);
    formData.append('duration', this.form.controls.duration.value!);
    formData.append('resources', this.form.controls.resources.value!);
    formData.append('certificate', this.form.controls.certificate.value!);
    formData.append('prerequisites', this.form.controls.prerequisites.value!);
    formData.append('featured', this.form.controls.featured.value!);
    formData.append('status', this.form.controls.status.value!);
    formData.append('price', this.form.controls.price.value!.toString());
    this.courseService.addCourse(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

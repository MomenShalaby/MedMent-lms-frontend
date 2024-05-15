import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../core/services/course/course-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-lecture',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-lecture.component.html',
  styleUrl: './add-lecture.component.css'
})
export class AddLectureComponent implements OnInit{
  courseId: number = 0;
  sectionId: number = 0;
  lectureVideo: any = null;
  form = new FormGroup({
    title: new FormControl<string>("", [Validators.required]),
    content: new FormControl<string>("", [Validators.required]),
  });

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      this.courseId = Number(params.get("id"));
      this.sectionId = Number(params.get("sectionId"));
    });
  }

  changeVideo(event: any){
    this.lectureVideo = event.target.files[0]; 
  }

  addLecture(){
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return
    }
    const formData = new FormData();
    formData.append('title', this.form.controls.title.value!);
    formData.append('content', this.form.controls.content.value!);
    formData.append('video', this.lectureVideo, this.lectureVideo.name);    
    this.courseService.addCourseLecture(this.courseId, this.sectionId, formData).subscribe({
      next: (res) => {
        this.router.navigate([`admin/dashboard/courses/${this.courseId}/sections/${this.sectionId}`]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

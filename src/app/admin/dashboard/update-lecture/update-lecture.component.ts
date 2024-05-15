import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../core/services/course/course-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecture } from '../../../core/models/course.model';
import { SafePipe } from '../../../core/pipe/safe.pipe';

@Component({
  selector: 'app-update-lecture',
  standalone: true,
  imports: [ReactiveFormsModule, SafePipe],
  templateUrl: './update-lecture.component.html',
  styleUrl: './update-lecture.component.css'
})
export class UpdateLectureComponent implements OnInit{
  courseId: number = 0;
  sectionId: number = 0;
  lectureId: number = 0;
  lectureVideo: any = null;
  lecture: Lecture = {} as Lecture;
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
      this.lectureId = Number(params.get("lectureId"));
      this.getLectureById();
    });
  }

  getLectureById(){
    this.courseService.getCourseLecture(this.courseId, this.sectionId, this.lectureId).subscribe({
      next: (res) => {
        this.lecture = res.data;
        this.form = new FormGroup({
          title: new FormControl<string>(this.lecture.title || "", [Validators.required]),
          content: new FormControl<string>(this.lecture.content || "", [Validators.required]),
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  changeVideo(event: any){
    this.lectureVideo = event.target.files[0];
    this.editLectureVideo();
  }

  editLecture(){
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return
    }
    const formData = new FormData();
    formData.append('title', this.form.controls.title.value!);
    formData.append('content', this.form.controls.content.value!);
    this.courseService.updateCourseLecture(this.courseId, this.sectionId, this.lectureId, formData).subscribe({
      next: (res) => {
        this.router.navigate([`admin/dashboard/courses/${this.courseId}/sections/${this.sectionId}`]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editLectureVideo(){
    if(this.lectureVideo){
      const formData = new FormData();
      formData.append('video', this.lectureVideo, this.lectureVideo.name);    
      this.courseService.updateLectureVideo(this.courseId, this.sectionId, this.lectureId, formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  videoLink(videoUrl: string): string{
    if(videoUrl.startsWith('/')){
      return "http://localhost:8000" + videoUrl;
    }
    return videoUrl;
  }
}

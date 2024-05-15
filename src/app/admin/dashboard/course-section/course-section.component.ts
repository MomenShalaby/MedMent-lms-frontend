import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course/course-service.service';
import { Course, Section } from '../../../core/models/course.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SafePipe } from '../../../core/pipe/safe.pipe';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [RouterLink, SafePipe],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.css'
})
export class CourseSectionComponent implements OnInit{

  course: Course = {} as Course;
  section: Section = {} as Section;
  courseId: number = 0;
  sectionId: number = 0;

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      this.courseId = Number(params.get("id"));
      this.sectionId = Number(params.get("sectionId"));
      if(!this.courseId || !this.sectionId) return;
      this.getCourseById();
      this.getSectionById();
    });
  }

  getCourseById(){
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (res) => {
        this.course = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getSectionById(){
    this.courseService.getCourseSection(this.courseId, this.sectionId).subscribe({
      next: (res) => {
        this.section = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteLecture(lectureId: number){
    this.courseService.deleteCourseLecture(this.courseId, this.sectionId, lectureId).subscribe({
      next: (res) => {
        this.getSectionById();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  videoLink(videoUrl: string): string{
    if(videoUrl.startsWith('/')){
      return "http://localhost:8000" + videoUrl;
    }
    return videoUrl;
  }
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { Course, Section } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course/course-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-course',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './display-course.component.html',
  styleUrl: './display-course.component.css'
})
export class DisplayCourseComponent implements OnInit{

  course: Course = {} as Course;
  courseId: number = 0;
  section: Section = {} as Section;
  closeResult = '';


  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    public modalService: NgbModal
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
    var formData = new FormData();
    formData.append("title", this.section.title);
    this.courseService.addCourseSection(this.courseId, formData).subscribe({
      next: (res) => {
        this.getCourseById();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editSection(){
    var formData = new FormData();
    formData.append("title", this.section.title);
    this.courseService.updateCourseSection(this.courseId, this.section.id, formData).subscribe({
      next: (res) => {
        this.getCourseById();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteSection(sectionId: number){
    this.courseService.deleteCourseSection(this.courseId, sectionId).subscribe({
      next: (res) => {
        this.getCourseById();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  open(content: TemplateRef<any>, selectedSection: Section = {} as Section) {
    this.section = selectedSection;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}

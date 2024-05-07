import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../core/services/course/course-service.service';
import { Course } from '../../core/models/course.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgbRatingModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() courses : Course[] = [];
  
  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
  }

  addOrRemoveToFav(event: Event, courseId: number){
    let icon = event.target as HTMLElement;
    if(icon.classList.contains("fa-regular")){
      icon.classList.replace("fa-regular","fa-solid"); 
      //to do: add course to favList
    }
    else{
      icon.classList.replace("fa-solid", "fa-regular"); 
      //to do: remove course from favList
    }
  }
}

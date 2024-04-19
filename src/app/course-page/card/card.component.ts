import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

interface Course {
  id: number;
  coursename: string;
  level: string;
  category: string;
  image: string;
  rate: number;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgbRatingModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  Courses : Course[] = [
    {
      "id": 1,
      "coursename": "Build a computer vision app with Azure Cognitive Services",
      "level": "Begginer",
      "category": "Anatomy",
      "image": "assets/img/courses/blood research-amico.png",
      "rate": 4
    },
    {
      "id": 2,
      "coursename": "BI Foundations with SQL, ETL and Data Warehousing Specialization",
      "level": "Middle",
      "category": "Pathology",
      "image": "assets/img/courses/rice field-pana.png",
      "rate": 5
    },
    {
      "id": 3,
      "coursename": "Data Science with Databricks for Data Analysts Specialization",
      "level": "Advance",
      "category": "Physiology",
      "image": "assets/img/courses/blood research-cuate.png",
      "rate": 4.3
    }
  ];

  filteredCourses: Course[] = [];
  searchTerm: string = '';

  constructor() {
    this.filteredCourses = this.Courses;
  }
  
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

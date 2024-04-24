import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

interface Counter {
  id: number;
  number: number;
  counter_icon: string;
  title: string;
}

@Component({
  selector: 'app-counter-section',
  standalone: true,
  imports: [CommonModule, NgbRatingModule, RouterLink],
  templateUrl: './counter-section.component.html',
  styleUrl: './counter-section.component.css'
})
export class CounterSectionComponent {
  Counters : Counter[] = [
    {
      "id": 1,
      "number": 5000,
      "counter_icon": "assets/img/events/online-course.png",
      "title": "Courses & Videos",
    },
    {
      "id": 2,
      "number": 25000,
      "counter_icon": "assets/img/events/contract.png",
      "title": "Students Enrolled",
    },
    {
      "id": 3,
      "number": 100,
      "counter_icon": "assets/img/events/satisfaction.png",
      "title": "Satisfaction Rate",
    },
    {
      "id": 4,
      "number": 10,
      "counter_icon": "assets/img/events/experience.png",
      "title": "Years of Experience",
    }
  ];

  filteredCounters: Counter[] = [];
  searchTerm: string = '';

  constructor() {
    this.filteredCounters = this.Counters;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 810) {
      let element = document.getElementById('counter1');
      element!.classList.add('counter-number1');
    } else {
      let element = document.getElementById('counter1');
      element!.classList.remove('counter-number1');
    }

    if (window.scrollY > 810) {
      let element = document.getElementById('counter2');
      element!.classList.add('counter-number2');
    } else {
      let element = document.getElementById('counter2');
      element!.classList.remove('counter-number2');
    }
    
    if (window.scrollY > 810) {
      let element = document.getElementById('counter3');
      element!.classList.add('counter-number3');
    } else {
      let element = document.getElementById('counter3');
      element!.classList.remove('counter-number3');
    }

    if (window.scrollY > 810) {
      let element = document.getElementById('counter4');
      element!.classList.add('counter-number4');
    } else {
      let element = document.getElementById('counter4');
      element!.classList.remove('counter-number4');
    }
  }
}

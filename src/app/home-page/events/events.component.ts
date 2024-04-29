import { Component } from '@angular/core';

interface Event {
  id: number;
  Eventname: string;
  level: string;
  category: string;
  image: string;
  rate: number;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  Events : Event[] = [
    {
      "id": 1,
      "Eventname": "Build a computer vision app with Azure Cognitive Services",
      "level": "Begginer",
      "category": "Anatomy",
      "image": "assets/img/Events/blood research-amico.png",
      "rate": 4
    },
    {
      "id": 2,
      "Eventname": "BI Foundations with SQL, ETL and Data Warehousing Specialization",
      "level": "Middle",
      "category": "Pathology",
      "image": "assets/img/Events/rice field-pana.png",
      "rate": 5
    },
    {
      "id": 3,
      "Eventname": "Data Science with Databricks for Data Analysts Specialization",
      "level": "Advance",
      "category": "Physiology",
      "image": "assets/img/Events/blood research-cuate.png",
      "rate": 4.3
    }
  ];

  allEvents: Event[] = [];
  searchTerm: string = '';

  constructor() {
    this.allEvents = this.Events;
  }
}

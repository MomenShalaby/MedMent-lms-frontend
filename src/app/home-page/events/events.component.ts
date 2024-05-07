import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/events/event-service.service';
import { Event } from '../../core/models/event.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events : Event[] = [];
  searchTerm: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getNewestEvents();
  }
  
  getNewestEvents(){
    this.eventService.getEvents().subscribe({
      next: (res) => {
        this.events = res.data.slice(0, 2);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

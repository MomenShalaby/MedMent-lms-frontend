import { Component } from '@angular/core';
import { EventService } from '../../../core/services/events/event-service.service';
import { Router, RouterLink } from '@angular/router';
import { Event } from '../../../core/models/event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-events',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-events.component.html',
  styleUrl: './view-events.component.css'
})
export class ViewEventsComponent {
  events: Event[] = [];
  searchTerm: string = '';

  constructor(private eventService: EventService, private router : Router) { }

  ngOnInit(): void {
    this.getNewestEvents();
  }

  getNewestEvents() {
    this.eventService.getEvents().subscribe({
      next: (res) => {
        this.events = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteEvent(id: number, name: string) {
    if (confirm(`Are you sure you want to delete "${name}" event?`)) {
      this.eventService.deleteEvent(id).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);

        })
    }
  }
  editEvent(id: number) {
    this.router.navigate([`/admin/dashboard/update-event/${id}`])
  }
}

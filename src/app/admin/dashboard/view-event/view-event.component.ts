import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../core/services/events/event-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.css',
})
export class ViewEventComponent {
  eventId: number;
  eventData: any;
  image?: string;
  baseUrl = `http://localhost:8000`;
  attendees : any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) {
    this.eventId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.eventService.getEventById(this.eventId).subscribe((response) => {
      this.eventData = response.data;
      this.attendees = response.data.attendees      
      this.image = this.baseUrl + response.data.image;
    });
  }

  deleteAttendee(id : number, name :string){
    if (confirm(`Are you sure you want to delete "${name}" from attendees?`)) {
      this.eventService.deleteAttendee(id).subscribe(
        (response) => {
          window.location.href =`admin/dashboard/view-event/${this.eventData.id}`;
        },
        (error) => {
          console.log(error);

        })
  }
  }
}

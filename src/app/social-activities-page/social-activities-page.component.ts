import { Component, OnInit } from '@angular/core';
import { EventService } from '../core/services/events/event-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Event } from '../core/models/event.model';
import { CommonModule } from '@angular/common';
import { Tag } from '../core/models/tag.model';
import { TagService } from '../core/services/tags/tag.service';

@Component({
  selector: 'app-social-activities-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './social-activities-page.component.html',
  styleUrls: ['./social-activities-page.component.css', '../../assets/css/style.css']
})
export class SocialActivitiesPageComponent implements OnInit{
  events: Event[] = [];
  tagName: string | null = null;
  tags: Tag[] = [];

  constructor(private eventService: EventService,
    private tagService: TagService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }
  
  getEvents(){
    this.eventService.getEvents().subscribe({
      next: (res) => {
        this.events = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTags(){
    this.tagService.getTags().subscribe({
      next: (res) => {
        this.tags = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  filterByTag(name: string){
    this.tagName = name;
    //to do: call getEvents by tag
  }
}

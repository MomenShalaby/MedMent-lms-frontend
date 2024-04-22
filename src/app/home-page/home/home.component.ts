import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { EventsComponent } from '../events/events.component';
import { HistoryComponent } from '../history/history.component';
import { StayUpdatedComponent } from '../../partials/stay-updated/stay-updated.component';
import { VisionComponent } from '../vision/vision.component';
import { HomeSectionComponent } from '../home-section/home-section.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent ,EventsComponent, HistoryComponent,StayUpdatedComponent, VisionComponent, HomeSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

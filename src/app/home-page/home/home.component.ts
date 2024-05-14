import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { EventsComponent } from '../events/events.component';
import { HistoryComponent } from '../history/history.component';
import { StayUpdatedComponent } from '../../partials/stay-updated/stay-updated.component';
import { VisionComponent } from '../vision/vision.component';
import { HomeSectionComponent } from '../home-section/home-section.component';
import { CounterSectionComponent } from '../../counter-section/counter-section.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent ,EventsComponent, HistoryComponent,StayUpdatedComponent, VisionComponent, HomeSectionComponent, CounterSectionComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { EventsComponent } from '../events/events.component';
import { HistoryComponent } from '../history/history.component';
import { StayUpdatedComponent} from '../stay-updated/stay-updated.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent ,EventsComponent, HistoryComponent,StayUpdatedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

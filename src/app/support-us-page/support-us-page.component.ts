import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-support-us-page',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './support-us-page.component.html',
  styleUrl: './support-us-page.component.css'
})
export class SupportUsPageComponent {

}

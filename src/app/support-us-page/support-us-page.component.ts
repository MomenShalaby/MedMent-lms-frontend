import { Component, Input } from '@angular/core';
import { NgbNav, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-support-us-page',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './support-us-page.component.html',
  styleUrls: ['./support-us-page.component.css', '../../assets/css/style.css']
})
export class SupportUsPageComponent {
  @Input() course: any;
}

import { Component } from '@angular/core';
import { PageTitleComponent } from '../../partials/page-title/page-title.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}

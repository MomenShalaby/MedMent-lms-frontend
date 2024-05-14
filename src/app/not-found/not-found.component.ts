import { Component } from '@angular/core';
import { PageTitleComponent } from '../partials/page-title/page-title.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}

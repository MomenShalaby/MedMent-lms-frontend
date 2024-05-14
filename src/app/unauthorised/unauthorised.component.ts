import { Component } from '@angular/core';
import { PageTitleComponent } from '../partials/page-title/page-title.component';

@Component({
  selector: 'app-unauthorised',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './unauthorised.component.html',
  styleUrl: './unauthorised.component.css'
})
export class UnauthorisedComponent {

}

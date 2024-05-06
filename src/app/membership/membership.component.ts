import { Component } from '@angular/core';
import { PageTitleComponent } from '../partials/page-title/page-title.component';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {

}

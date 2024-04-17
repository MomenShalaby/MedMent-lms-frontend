import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-stay-updated',
  standalone: true,
  imports: [],
  templateUrl: './stay-updated.component.html',
  styleUrl: './stay-updated.component.css'
})
export class StayUpdatedComponent {
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is '/login'
        this.isLoginPage = event.url === '/login';
        this.isRegisterPage = event.url === '/register';
      }
    });
  }
}

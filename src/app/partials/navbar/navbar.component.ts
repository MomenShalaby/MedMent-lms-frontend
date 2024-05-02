import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAdmin: boolean = false;

  constructor(private router: Router) {
   this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
       // Check if the current route starts with '/admin'
       this.isAdmin = event.url.startsWith('/admin');
     }
   });
 }
}

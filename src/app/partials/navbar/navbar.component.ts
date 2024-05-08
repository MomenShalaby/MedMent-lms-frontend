import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAdmin: boolean = false;
  user: any;
  private userSubscription?: Subscription;



  constructor(private router: Router, private userService: UsersService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route starts with '/admin'
        this.isAdmin = event.url.startsWith('/admin');
      }
    });
    this.userSubscription = new Subscription();

  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getLoggedUser().subscribe(
      user => {
        if (user && Object.keys(user).length !== 0) {
          this.user = user;
          console.log(user);
        }
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.user = JSON.parse(userDataString);
    }
  }


  ngOnDestroy(): void {
    this.userService.reset()
    this.user = {}
    this.subscribeToUser()

    localStorage.removeItem('userData');
    window.location.href = '/';

  }

  subscribeToUser() {
    this.userSubscription = this.userService.getLoggedUser().subscribe(
      user => {
        if (user && Object.keys(user).length !== 0) {
          this.user = user;
          console.log(user);
        }
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }
}

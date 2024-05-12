import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAdmin: boolean = false;
  user: any;
  isAuthinticated?: boolean;

  constructor(
    private router: Router, private userService: UsersService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route starts with '/admin'
        this.isAdmin = event.url.startsWith('/admin');
      }
    });
  }

  ngOnInit(): void {
    // check for user data in service
    this.userService.getIsAuthenticated().subscribe(
      (isAuthinticated) => {
        this.isAuthinticated = isAuthinticated;
        // // get user data from service
        this.userService.getLoggedUser().subscribe(
          (user) => {
            console.log(user);
            this.user = user;
            // console.log(this.user);
          },
          (error) => { 
            console.error('Error egtting user data from service:', error) }
        )
      }
    )




    // if (!this.isAuthinticated){
    //   this.userService.getLoggedUser().subscribe(
    //     (user) => { this.user = user },
    //     (error)=>{ console.error('Error fetching user from api:', error) }
    //   )
    // }
  }

  ngOnDestroy(): void {
    this.userService.reset();
    this.user = {};
    this.subscribeToUser();

    localStorage.removeItem('userData');
    window.location.href = '/';
  }

  subscribeToUser() {
    this.userService.getLoggedUser().subscribe(
      (user) => {
        if (user && Object.keys(user).length !== 0) {
          this.user = (user as any).data;
          localStorage.setItem('token', JSON.stringify((user as any).data.token));
          console.log(this.user);
        }
      },
      (error) => {
        this.user = JSON.parse((localStorage.getItem('userData') as any))
        console.error('Error fetching user:', error);
      }
    );
  }
}

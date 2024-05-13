import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterLink } from '@angular/router';
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
  isAdminRole? : boolean;

  constructor(
    private router: Router, private route: ActivatedRoute, private userService: UsersService) { }
  ngOnInit(): void {
    if (localStorage.getItem('role')){
      this.isAdminRole = true;
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route starts with '/admin'
        this.isAdmin = event.url.startsWith('/admin');
      }
    });



    // check for user data in service
    this.userService.getIsAuthenticated().subscribe(
      (isAuthinticated) => {
        this.isAuthinticated = isAuthinticated;
        // // get user data from service
        if (isAuthinticated) {
          this.userService.getLoggedUser().subscribe(
            (user) => {
              this.user = user;
              // console.log(this.user);
            },
            (error) => {
              console.error('Error egtting user data from service:', error)
            }
          )
        } else if (localStorage.getItem('userData')) {
          this.user = JSON.parse(localStorage.getItem('userData') as string)
        }
      }
    )




  }

  ngOnDestroy(): void {
    this.userService.reset();
    this.user = '';
    this.subscribeToUser();

    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  subscribeToUser() {
    this.userService.getLoggedUser().subscribe(
      (user) => {
        if (user && Object.keys(user).length !== 0) {
          this.user = (user as any).data;
          localStorage.setItem('token', JSON.stringify((user as any).data.token));
        }
      },
      (error) => {
        this.user = JSON.parse((localStorage.getItem('userData') as any))
        console.error('Error fetching user:', error);
      }
    );
  }
}

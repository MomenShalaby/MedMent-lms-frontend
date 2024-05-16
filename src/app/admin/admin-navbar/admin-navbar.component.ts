import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  admin? : any ;
  isAuthinticated? : boolean ;

  constructor(private userService : UsersService) { }

  ngOnInit(){
    this.userService.getIsAuthenticated().subscribe(
      (isAuthinticated) => {
        this.isAuthinticated = isAuthinticated;
        // // get user data from service
        if (isAuthinticated) {
          this.userService.getLoggedUser().subscribe(
            (user) => {
              this.admin = user;
              console.log(user);
            },
            (error) => {
              console.error('Error egtting user data from service:', error)
            }
          )
        } else if (localStorage.getItem('userData')) {
          this.admin = JSON.parse(localStorage.getItem('userData') as string)
        }
      }
    )
  }
logout(){
  this.userService.reset();
  localStorage.removeItem('userData');
  localStorage.removeItem('token');
  if(localStorage.getItem('role')){
    localStorage.removeItem('role')
  }
  window.location.href = '/';
}
}
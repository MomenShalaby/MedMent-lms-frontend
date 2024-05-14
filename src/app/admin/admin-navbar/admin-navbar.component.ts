import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {



  constructor(private userService : UsersService) { }

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
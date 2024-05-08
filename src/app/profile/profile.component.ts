import { Component } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AboutUserComponent } from './about-user/about-user.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ChangePasswordComponent, AboutUserComponent, EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private userSubscription?: Subscription;
  user: any;


  constructor(private userService: UsersService, private router: Router) {
    this.userSubscription = new Subscription();
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);

    } else {
      this.router.navigate(['/login '])
    }
    // this.userSubscription = this.userService.getLoggedUser().subscribe(
    //   // this.userService.getLoggedUser().subscribe(
    //   user => {
    //     if (user && Object.keys(user).length !== 0) {
    //       this.user = user;
    //       console.log(user);
    //     }

    //   },
    //   error => {
    //     console.error('Error fetching user:', error);
    //   }
    // );
  }


}

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
  // private userSubscription?: Subscription;
  user: any;


  constructor(private userService: UsersService, private router: Router) {
    // this.userSubscription = new Subscription();
  }

  ngOnInit(): void {

    if(localStorage.getItem('token') ){
      console.log('fff');
      

      this.userService.fetchLoggedUser().subscribe(
        (response) => {
          this.user = (response as any).data.user;
          this.user.avatar = `http://localhost:8000${this.user.avatar}`;
          console.log(this.user);
          
        },
        (error) => {
          this.router.navigate(['/login'])
          console.error('Error fetching user:', error);
        }
      );
    } else {
      console.log('eeee');
      
      this.router.navigate(['/login'])
    }

  }


}

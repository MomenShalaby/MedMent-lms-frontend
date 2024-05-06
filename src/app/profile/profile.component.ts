import { Component } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private userSubscription?: Subscription;
  user :any;


  constructor(private userService: UsersService) {
    this.userSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getLoggedUser().subscribe(
      // this.userService.getLoggedUser().subscribe(
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

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}

import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loggedUserData: any;
  errorMessage?: string;

  updated: string = this.activatedRoute.snapshot.queryParams['updated'];
  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  handleLogin() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.userService.login(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('userData', JSON.stringify((response as any).data.user));
          localStorage.setItem('token', JSON.stringify((response as any).data.token));
          this.userService.setIsAuthenticated(true)
          this.userService.setLoggedUser((response as any).data.user)          
          this.router.navigate(['/']);
        },
        error => {
          this.errorMessage = error.error.message;
          console.error('Error Logging in post:', error);
        }
      );

    }

  }
}

import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  @Input() success?: boolean;
  errorMessage?: string;

  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService, private router: Router) {

    console.log(this.activatedRoute.snapshot.queryParams['success']);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  handleLogin() {

    if (!this.loginForm.valid) {
      console.log('not valid');

      this.loginForm.markAllAsTouched();
    } else {
      this.userService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Logged in successfully:', response);
          // console.log(response.);

          localStorage.setItem('token', (response as any).data.token)
          console.log(localStorage.getItem('token'));

          // this.router.navigate(['/']);
        },
        error => {
          // const values = Object.values(error.error.errors) as string[];
          this.errorMessage = error.error.message;
          console.error('Error Logging in post:', error);
        }
      );
    }
    console.log(this.loginForm.value);

  }
}

import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  adminLoginForm: FormGroup;
  errorMessage?: string;
  // updated: string = this.activatedRoute.snapshot.queryParams['updated'];

  constructor(private activatedRoute: ActivatedRoute, private adminService: AdminService, private router: Router, private userService: UsersService) {

    console.log(this.activatedRoute.snapshot.queryParams['success']);
    this.adminLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  handleLogin() {

    if (!this.adminLoginForm.valid) {

      this.adminLoginForm.markAllAsTouched();
    } else {
      this.adminService.login(this.adminLoginForm.value).subscribe(
        response => {
          console.log('Logged in successfully:', response);
          // console.log(response.);

          localStorage.setItem('userData', JSON.stringify((response as any).data.user));
          localStorage.setItem('token', (response as any).data.token);
          localStorage.setItem('role', JSON.stringify((response as any).data.user.roles[0].name));
          this.userService.setIsAuthenticated(true)
          this.userService.setLoggedUser((response as any).data.user)
          console.log(localStorage.getItem('role'));
          this.router.navigate(['/admin/dashboard'])

          // this.router.navigate(['/']);
        },
        error => {
          // const values = Object.values(error.error.errors) as string[];
          this.errorMessage = error.error.message;
          console.error('Error Logging in post:', error);
        }
      );
    }
    console.log(this.adminLoginForm.value);

  }
}

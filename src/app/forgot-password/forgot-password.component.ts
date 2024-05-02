import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, catchError, throwError, of, map } from 'rxjs';
import { PasswordService } from '../services/account/password.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})


export class ForgotPasswordComponent {
  forgotPassword: FormGroup;
  errorMessage?: string;
  private handleError(operation = 'operation', user: object) {
    return (error: any): Observable<object> => {
      console.error(`${operation} failed:`, error);
      // Let the app keep running by returning an empty result.
      return throwError(error);
    };
  }
  constructor(private http: HttpClient, private passwordService: PasswordService, private router: Router) {
    this.forgotPassword = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  handleForgot() {
    if (!this.forgotPassword.valid) {
      console.log('not valid');

      this.forgotPassword.markAllAsTouched();
    } else {
      console.log(this.forgotPassword.value);

      this.passwordService.forgetPassword(this.forgotPassword.value).subscribe(
        response => {
          console.log('email sent successfully:', response);
          this.router.navigate(['/reset-password'], { queryParams: { success: true } });
        },
        error => {
          console.error('Error sending email:', error);
          const values = Object.values(error.error.errors) as string[];
          this.errorMessage = values[0];


          console.log(this.errorMessage);

        }
      );
    }

  }
}
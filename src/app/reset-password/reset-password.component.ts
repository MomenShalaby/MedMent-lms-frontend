import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PasswordService } from '../services/account/password.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  success: string = this.activatedRoute.snapshot.queryParams['success'];
  errorMessage?: string;
  resetPassword: FormGroup = new FormGroup({});
  constructor(private activatedRoute: ActivatedRoute, private passwordService: PasswordService, private router: Router) { }
  // console.log(this.success);


  ngOnInit(): void {
    this.resetPassword = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      password_confirmation: new FormControl('', Validators.required)
    },
      { validators: this.confirmPasswordValidator }
    );
  }
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordValue = control.get('password')?.value;
    const password_confirmationValue = control.get('password_confirmation')?.value;

    return passwordValue === password_confirmationValue ? null : { PasswordNoMatch: true };
  }

  handleReset() {
    if (!this.resetPassword.valid) {
      this.resetPassword.markAllAsTouched();
    } else {
      console.log(this.resetPassword.value);

      this.passwordService.resetPassword(this.resetPassword.value).subscribe(
        response => {
          console.log('email sent successfully:', response);
          this.router.navigate(['/login'], { queryParams: { updated: true } });
        },
        error => {
          this.success = '';
          console.error('Error sending email:', error);
          const values = error.error.error.message;
          this.errorMessage = values;
          console.log(this.errorMessage);

        }
      );
    }

  }

}

import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PasswordService } from '../../services/account/password.service';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  // @Input() token: any;
  changePasswordForm: FormGroup;
  errorMessage?: string;
  successMessage?: string;
  token : string = JSON.parse(localStorage.getItem('token') as string);
  constructor(private passwordService: PasswordService) {
    this.changePasswordForm = new FormGroup({
      current_password: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', Validators.required)
    },
      { validators: this.confirmPasswordValidator })
  }

  changePassword() {
    if (!this.changePasswordForm.valid) {
      console.log('not valid');
      console.log(this.changePasswordForm.value);
      this.changePasswordForm.markAllAsTouched();
    } else {
      console.log(this.changePasswordForm.value);
      console.log(this.token);
      
      this.passwordService.changePassword(this.changePasswordForm.value, this.token).subscribe(
        response => {
          console.log('changed password successfull:', response);
          this.successMessage =(response as any).message ;
          this.errorMessage = '';
          console.log(this.successMessage);
        },
        error => {
          console.error('Error changing password:', error);
          const values = Object.values(error.error.errors) as string[];
          this.errorMessage = values[0];
          this.successMessage = '';
          console.log(this.errorMessage);
        })
    }
  }
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordValue = control.get('password')?.value;
    const password_confirmationValue = control.get('password_confirmation')?.value;

    return passwordValue === password_confirmationValue ? null : { PasswordNoMatch: true };
  }
}

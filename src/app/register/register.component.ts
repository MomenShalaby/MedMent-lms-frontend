import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      pass1: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      pass2: new FormControl('', [Validators.required, this.confirmPassword.bind(this)])
    });
  }

  // Method to access pass1 value
  get pass1Value() {
    return this.registerForm.get('pass1')?.value;
  }

  // Method to access pass2 value
  get pass2Value() {
    return this.registerForm.get('pass2')?.value;
  }

  // confirmPassword method
  confirmPassword(control: AbstractControl): ValidationErrors | null {
    const confirmPassword = control.value;
    const password = this.registerForm.get('pass1')?.value;

    console.log(password);
    console.log(confirmPassword);

    if (password !== confirmPassword) {
      return { passwordsNotMatching: true };
    }
    return null;
  }

  handleRegister() {
    console.log(this.registerForm.controls);
  }
}

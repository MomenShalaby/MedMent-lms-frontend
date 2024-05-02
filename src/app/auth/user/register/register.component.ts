import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { CountryService } from '../../../services/locations/country.service';
import { StateService } from '../../../services/locations/state.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  user!: Object;
  countries: any;
  states: any;
  errorMessage?: string;

  constructor(private userService: UsersService, private countryService: CountryService, private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    // Initialize registerForm and bind confirmPasswordValidator
    this.registerForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', Validators.required),
      country_id: new FormControl(''),
      state_id: new FormControl('')
    },
      { validators: this.confirmPasswordValidator }
    );

    // Fetch countries
    this.countryService.getCountries().subscribe(
      countries => {
        this.countries = countries.data.countries;
        console.log(this.countries);
      },
      error => {
        console.error('Error fetching countries:', error);
      }
    );

    // Subscribe to country_id value changes
    this.registerForm.get('country_id')?.valueChanges.subscribe(countryId => {
      console.log(countryId);

      if (countryId) {

        // Fetch states for the selected country
        this.stateService.getStates(countryId).subscribe(
          states => {
            this.states = states.data.country.states;
            console.log(this.states);
          },
          error => {
            console.error('Error fetching states:', error);
          }
        );
      }
    });
  }

  // confirmPassword method
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordValue = control.get('password')?.value;
    const password_confirmationValue = control.get('password_confirmation')?.value;

    return passwordValue === password_confirmationValue ? null : { PasswordNoMatch: true };
  }

  handleRegister() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
    }
    else {
      this.userService.addUser(this.registerForm.value).subscribe(
        response => {
          localStorage.setItem('token', (response as any).data.token)
          console.log(localStorage.getItem('token'));
          console.log('User added successfully:', response);

          // this.router.navigate(['/login'], { queryParams: { success: true } });
        },
        error => {
          console.error('Error creating post:', error);
          const values = Object.values(error.error.errors) as string[];
          this.errorMessage = values[0];
          console.log(this.errorMessage);

        }
      );
    }

    console.log("ddddddd", this.registerForm.value);
  }
}
// [disabled]="registerForm.invalid"
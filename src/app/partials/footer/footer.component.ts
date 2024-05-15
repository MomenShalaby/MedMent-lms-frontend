import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ContactUs } from '../../core/models/contact-us.model';
import { ContactUsService } from '../../core/services/contact-us/contact-us.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isAdmin: boolean = false;
  success: boolean = false;
  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });
   constructor(private router: Router, private contactUsService: ContactUsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route starts with '/admin'
        this.isAdmin = event.url.startsWith('/admin');
      }
    });
  }

  send(e: Event){
    e.preventDefault();
    this.form.markAllAsTouched();
    if(!this.form.valid) return;

    const conactDetails = {} as ContactUs;
    conactDetails.email = this.form.controls.email.value!;
    conactDetails.name = this.form.controls.email.value!;
    conactDetails.subject = "Subscrib";
    conactDetails.message = "Keep me updated";
    this.contactUsService.sendMessage(conactDetails).subscribe({
      next: (res) => {
        this.success = true;
        this.form.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

import { Component } from '@angular/core';
import { PageTitleComponent } from '../partials/page-title/page-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactUsService } from '../core/services/contact-us/contact-us.service';
import { ContactUs } from '../core/models/contact-us.model';


@Component({
  selector: 'app-support-us-page',
  standalone: true,
  imports: [PageTitleComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './support-us-page.component.html',
  styleUrls: ['./support-us-page.component.css', '../../assets/css/style.css']
})
export class SupportUsPageComponent {
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    subject: new FormControl<string>('', [Validators.required]),
    message: new FormControl<string>('', [Validators.required]),
  });

  errorMessage: string = "";

  constructor(private contactUsService: ContactUsService){}

  send(e: Event){
    debugger
    e.preventDefault();
    this.form.markAllAsTouched();
    if(!this.form.valid) return;

    const conactDetails = this.form.value as ContactUs;
    this.contactUsService.sendMessage(conactDetails).subscribe({
      next: (res) => {

      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
      }
    });
  }
}

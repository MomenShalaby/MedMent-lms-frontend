import { Component } from '@angular/core';
import { ContactUsService } from '../../core/services/contact-us/contact-us.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactUs } from '../../core/models/contact-us.model';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

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

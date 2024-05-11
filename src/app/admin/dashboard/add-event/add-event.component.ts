import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagsService } from '../../../services/tags.service'; 
import { TagSelectionComponent } from '../../../partials/tag-selection/tag-selection.component';
@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [ReactiveFormsModule, TagSelectionComponent],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  addEventForm: FormGroup = new FormGroup({});
  tags: any[] = [];

  constructor(private tagService: TagsService) {
    this.addEventForm = new FormGroup({
      name: new FormControl(''),
      short_description: new FormControl(''),
      description: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      image: new FormControl('')
    });
  }

  ngOnInit() {
    this.tagService.getTags().subscribe(response => {
      this.tags = response.data;
      console.log(this.tags);
    }, error => {
      console.log(error);

    });
  }

  get imageSrc(): string | ArrayBuffer | null {
    return this.addEventForm.get('image')?.value;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.addEventForm.get('image')?.setValue(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  }

  cancelImage() {
    this.addEventForm.get('image')?.setValue('');
    // Optionally, you can clear the file input value as well
    const inputElement = document.getElementById('uploadImage') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagsService } from '../../../services/tags.service';
import { TagSelectionComponent } from '../../../partials/tag-selection/tag-selection.component';
import { EventService } from '../../../core/services/events/event-service.service';
// import { FormData } from '@angular/common/http';

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
  eventTags: number[] = [];
  image: any;
  errorMessage: any;
  successMessage: string = '';

  borderColor: string[] = ["#3182c8", "#8b1079", "#faa030",
    "#64d4d2", "#733ca6", "#c164bd", "#4eb7f5", "#65c888", "#f37e63", "#32babc"];

  constructor(private tagService: TagsService, private eventService: EventService) {
    this.addEventForm = new FormGroup({
      name: new FormControl(''),
      short_description: new FormControl(''),
      description: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      image: new FormControl(''),
      tag: new FormControl(this.eventTags)
    });
  }

  ngOnInit() {
    this.tagService.getTags().subscribe(response => {
      this.tags = response.data;
    }, error => {
      console.log(error);

    });
  }

  get imageSrc(): string | ArrayBuffer | null {
    return this.image;
    // return this.addEventForm.get('image')?.value;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        this.image = base64String; // Display the image as base64
        this.addEventForm.get('image')?.setValue(file);
      };
      reader.readAsDataURL(file);
    }

  }

  cancelImage() {
    this.image = '';
    // Optionally, you can clear the file input value as well
    const inputElement = document.getElementById('uploadImage') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  addRemoveTag(e: Event, tagId: number, i: number) {
    const index = this.eventTags.indexOf(tagId);

    if (index === -1) {
      this.eventTags.push(tagId);
      console.log(this.eventTags);

      (e.target as HTMLElement).style.borderColor = this.borderColor[i % 10];
    } else {
      this.eventTags.splice(index, 1);
      (e.target as HTMLElement).style.borderColor = "#dadada";
    }
  }


  addEvent() {

    const formData = new FormData();
    console.log(this.addEventForm.value);

    // Append form field values to the FormData object
    Object.keys(this.addEventForm.value).forEach(key => {
      const value = this.addEventForm.value[key];

      // Check if the value is an array
      if (Array.isArray(value)) {

        value.forEach((item: any) => {
            formData.append(key + '[]', item);
        });      } else {
        // If it's not an array, append it directly
        formData.append(key, value);
      }
    });

    this.eventService.addEvent(formData).subscribe(
      response => {
        console.log(response);
        this.successMessage = 'Event added successfully';
      }, error => {
        console.log(error);
        this.errorMessage = error.error.errors;
      }
    );
  }



}

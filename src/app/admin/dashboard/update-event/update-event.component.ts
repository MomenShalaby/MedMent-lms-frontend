import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TagsService } from '../../../services/tags.service';
import { EventService } from '../../../core/services/events/event-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css',
})
export class UpdateEventComponent {
  updateEventForm: FormGroup = new FormGroup({});
  updateEventImageForm: FormGroup = new FormGroup({});
  tags: any[] = [];
  eventTags: number[] = [];
  image: any;
  errorMessage: any;
  successMessage: string = '';
  eventData: any;
  eventId: number;
  file : any ;

  borderColor: string[] = [
    '#3182c8',
    '#8b1079',
    '#faa030',
    '#64d4d2',
    '#733ca6',
    '#c164bd',
    '#4eb7f5',
    '#65c888',
    '#f37e63',
    '#32babc',
  ];

  constructor(
    private tagService: TagsService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.tagService.getTags().subscribe(
      (response) => {
        this.tags = response.data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.eventService.getEventById(this.eventId).subscribe(
      (response) => {
        this.eventData = response.data;
        console.log(this.eventData);
        this.image = `http://localhost:8000/${this.eventData.image}`;
        // this.eventTags = this.eventData.tags.map((tag: { id: any; }) => tag.id);

        this.updateEventForm = new FormGroup({
          name: new FormControl(this.eventData.name),
          short_description: new FormControl(
            this.eventData['short description']
          ),
          description: new FormControl(this.eventData.description),
          start_date: new FormControl(this.eventData.start_date),
          end_date: new FormControl(this.eventData.end_date),
          tag: new FormControl(this.eventTags),
        });
        this.updateEventImageForm = new FormGroup({
          image: new FormControl(''),
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get imageSrc(): string | ArrayBuffer | null {
    return this.image;
    // return this.updateEventForm.get('image')?.value;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
this.file = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        this.image = base64String; // Display the image as base64
        this.updateEventForm.get('image')?.setValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  cancelImage() {
    this.image = '';
    // Optionally, you can clear the file input value as well
    const inputElement = document.getElementById(
      'uploadImage'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  addRemoveTag(e: Event, tagId: number, i: number) {
    const index = this.eventTags.indexOf(tagId);

    if (index === -1) {
      this.eventTags.push(tagId);
      (e.target as HTMLElement).style.borderColor = this.borderColor[i % 10];
    } else {
      this.eventTags.splice(index, 1);
      (e.target as HTMLElement).style.borderColor = '#dadada';
    }
    console.log(this.eventTags);
  }

  updateEvent() {
    const body: any = this.updateEventForm.value;
    body['tag'] = this.eventTags;
    this.eventService.updateEvent(body, this.eventId).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = 'Event updated successfully';
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.errors;
      }
    );
  }

  updateEventImage() {
    const formImage = new FormData();
    // Object.keys(this.updateEventImageForm.value).forEach((key) => {
    //   const value = this.updateEventImageForm.value[key];
      formImage.append('image', this.file);
    // });
    console.log(this.updateEventImageForm.value);

    this.eventService.updateEventImage(formImage, this.eventId).subscribe(
      (response) => {
        console.log(response);
        this.successMessage = 'Event image updated successfully';
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.errors;
      }
    );
  }
}

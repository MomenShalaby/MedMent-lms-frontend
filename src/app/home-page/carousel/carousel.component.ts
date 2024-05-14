import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import keenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements AfterViewInit{
  images = ['menna1', 'menna2', 'menna3', 'menna5'].map((n) => `../assets/img/${n}.jpg`);

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined
  opacities: number[] = []
  slider: KeenSliderInstance | null = null
  interval: any = null

  ngAfterViewInit() {
	if(this.sliderRef){
		this.slider = new keenSlider(this.sliderRef.nativeElement, {
		  slides: this.images.length,
		  loop: true,
		  defaultAnimation: {
			duration: 3000,
		  },
		  detailsChanged: (s) => {
			this.opacities = s.track.details.slides.map((slide) => slide.portion)
		  },
		});
		this.interval = setInterval(this.slider.next, 3000)
	}
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}

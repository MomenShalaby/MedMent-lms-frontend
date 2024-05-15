import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { PageTitleComponent } from '../../partials/page-title/page-title.component';
import keenSlider, { KeenSliderInstance } from 'keen-slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageTitleComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit{

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | undefined
  opacities: number[] = []
  slider: KeenSliderInstance | null = null
  interval: any = null

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
	});
	if(this.sliderRef){
		this.slider = new keenSlider(this.sliderRef.nativeElement, {
		  slides: 3,
		  loop: true,
		  defaultAnimation: {
			duration: 3000,
		  },
		  detailsChanged: (s) => {
        this.opacities = s.track.details.slides.map((slide) => slide.portion);
        this.cdRef.detectChanges();
		  },
		});
		this.interval = setInterval(this.slider.next, 4000);
	}
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}

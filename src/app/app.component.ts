import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { StayUpdatedComponent } from './partials/stay-updated/stay-updated.component';
import Aos from 'aos';


import { HttpClientModule } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , NavbarComponent , FooterComponent,StayUpdatedComponent ,HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  title = 'abcde';
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private viewportScroll: ViewportScroller) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    Aos.init();
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe( event => {
      if(event instanceof NavigationEnd){
        this.viewportScroll.scrollToPosition([0, 0]);
      }
    });
  }

  ngAfterViewInit(): void {
    Aos.init();
  }
}


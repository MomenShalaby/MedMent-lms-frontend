import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { FooterComponent } from './partials/footer/footer.component';
import { StayUpdatedComponent } from './partials/stay-updated/stay-updated.component';
import Aos from 'aos';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , NavbarComponent , FooterComponent, StayUpdatedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'abcde';

  ngOnInit() {
    Aos.init();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  private init(): void {
    // this.toggleScrolled();
    // this.mobileNavToggle();
    // this.hideMobileNavOnSamePageLinks();
    // this.toggleMobileNavDropdowns();
    // this.preloader();
    // this.scrollTopButton();
    // this.aosInit();
    // this.initGlightbox();
    // this.initPureCounter();
    // this.initSwiper();
  }

  // private toggleScrolled(): void {
  //   const body = document.querySelector('body');
  //   const header = document.querySelector('#header');
  //   if (!header.classList.contains('scroll-up-sticky') &&!header.classList.contains('sticky-top') &&!header.classList.contains('fixed-top')) return;
  //   window.addEventListener('scroll', () => {
  //     window.scrollY > 100? body.classList.add('scrolled') : body.classList.remove('scrolled');
  //   });
  //   window.addEventListener('load', () => {
  //     window.scrollY > 100? body.classList.add('scrolled') : body.classList.remove('scrolled');
  //   });
  // }

  // private mobileNavToggle(): void {
  //   const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  //   mobileNavToggleBtn.addEventListener('click', () => {
  //     document.querySelector('body').classList.toggle('mobile-nav-active');
  //     mobileNavToggleBtn.classList.toggle('bi-list');
  //     mobileNavToggleBtn.classList.toggle('bi-x');
  //   });
  // }

  // private hideMobileNavOnSamePageLinks(): void {
  //   document.querySelectorAll('#navmenu a').forEach(navmenu => {
  //     navmenu.addEventListener('click', () => {
  //       if (document.querySelector('.mobile-nav-active')) {
  //         this.mobileNavToggle();
  //       }
  //     });
  //   });
  // }

  // private toggleMobileNavDropdowns(): void {
  //   document.querySelectorAll('.navmenu.toggle-dropdown').forEach(navmenu => {
  //     navmenu.addEventListener('click', (e) => {
  //       if (document.querySelector('.mobile-nav-active')) {
  //         e.preventDefault();
  //         navmenu.parentNode.classList.toggle('active');
  //         navmenu.parentNode.nextElementSibling.classList.toggle('dropdown-active');
  //         e.stopImmediatePropagation();
  //       }
  //     });
  //   });
  // }

  // private preloader(): void {
  //   const preloader = document.querySelector('#preloader');
  //   if (preloader) {
  //     window.addEventListener('load', () => {
  //       preloader.remove();
  //     });
  //   }
  // }

  // private scrollTopButton(): void {
  //   const scrollTop = document.querySelector('.scroll-top');
  //   if (scrollTop) {
  //     window.addEventListener('scroll', () => {
  //       window.scrollY > 100? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  //     });
  //     scrollTop.addEventListener('click', (e) => {
  //       e.preventDefault();
  //       window.scrollTo({
  //         top: 0,
  //         behavior: 'smooth'
  //       });
  //     });
  //   }
  // }

  // private aosInit(): void {
  //   window.addEventListener('load', () => {
  //     Aos.init({
  //       duration: 600,
  //       easing: 'ease-in-out',
  //       once: true,
  //       mirror: false
  //     });
  //   });
  // }

  // toggleScrolled() {
  //   const selectBody = document.querySelector('body');
  //   const selectHeader = document.querySelector('#header');
  //   if (!selectHeader?.classList.contains('scroll-up-sticky') && !selectHeader?.classList.contains('sticky-top') && !selectHeader?.classList.contains('fixed-top')) return;
  //   window.scrollY > 100 ? selectBody?.classList.add('scrolled') : selectBody?.classList.remove('scrolled');
  // }

  // private initGlightbox(): void {
  //   const glightbox = GLightbox({
  //     selector: '.glightbox'
  //   });
  // }

  // private initPureCounter(): void {
  //   new PureCounter();
  // }

  // private initSwiper(): void {
  //   window.addEventListener('load', () => {
  //     document.querySelectorAll('.swiper').forEach((swiper) => {
  //       const config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
  //       new Swiper(swiper, config);
  //     });
  //   });
  // }
}


import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  constructor(private el: ElementRef, private router: Router) {}

  ngAfterViewInit() {
    // Scroll-in animation for sections
    const sections = this.el.nativeElement.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section: Element) => observer.observe(section));

    // Force hero background video to play on reload
    const video: HTMLVideoElement | null = document.querySelector('.hero-bg-video');
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setTimeout(() => video.play(), 500);
        });
      }
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      this.onScroll();
    }, 100);
  }

  goToMembership() {
    this.router.navigate(['/membership']);
  }

  onScroll(): void {
    // Add scroll-related logic here if needed, or leave empty if not required
  }
}
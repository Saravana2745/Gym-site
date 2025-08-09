import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-why',
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.css']
})
export class WhyComponent implements OnInit, AfterViewInit, OnDestroy {
  logoAnimated = false;
  private statsObserver: IntersectionObserver | null = null;
  private stepObservers: IntersectionObserver[] = [];
  private statsAnimated = false;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.logoAnimated = true, 800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngAfterViewInit() {
    // Stats animation on scroll
    const statsSection = document.querySelector('.whyus-stats');
    if (statsSection) {
      this.statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.statsAnimated) {
              this.statsAnimated = true;
              this.animateStat('customerCount', 0, 1200, 1200);
              this.animateStat('communityCount', 0, 350, 1200);
              if (this.statsObserver) this.statsObserver.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      this.statsObserver.observe(statsSection);
    }

    // Fade in each step as it enters viewport
    const steps = Array.from(document.querySelectorAll('.whyus-step'));
    steps.forEach(step => {
      this.renderer.addClass(step, 'fade-section');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.renderer.addClass(step, 'fade-in');
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(step);
      this.stepObservers.push(observer);
    });
  }

  ngOnDestroy() {
    if (this.statsObserver) this.statsObserver.disconnect();
    this.stepObservers.forEach(obs => obs.disconnect());
  }

  animateStat(id: string, start: number, end: number, duration: number) {
    const el = document.getElementById(id);
    if (!el) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.textContent = value.toString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end.toString();
      }
    };
    requestAnimationFrame(step);
  }

  goToMembership() {
    this.router.navigate(['/membership']);
  }
}
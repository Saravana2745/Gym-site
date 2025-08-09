import { CommonModule } from '@angular/common';
import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// AuthService (should ideally be in its own file)
@Injectable({ providedIn: 'root' })
export class LocalAuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  signup(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signup`, { email, password });
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
  ]
})
export class AppComponent implements OnInit {
  showLogin = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.activateSectionFromHash();
  }

  goToHome() {
    this.router.navigate(['/']);
  }
  goToClasses() {
    this.router.navigate(['/classes']);
  }
  goToMembership() {
    this.router.navigate(['/membership']);
  }
  goToContact() {
    this.router.navigate(['/contact']);
  }
  gotowhyus() {
    this.router.navigate(['/whyus']);
  }

  navOpen = false;

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  closeNav() {
    this.navOpen = false;
  }

  activateSectionFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const section = this.el.nativeElement.querySelector(`section#${hash}`);
      if (section) {
        // Remove active-section from all sections
        this.el.nativeElement.querySelectorAll('section').forEach((sec: HTMLElement) => {
          this.renderer.removeClass(sec, 'active-section');
        });
        // Add to current section
        this.renderer.addClass(section, 'active-section');
        // Highlight nav (top nav, not sidebar)
        this.el.nativeElement.querySelectorAll('nav ul li a').forEach((a: HTMLElement) => {
          this.renderer.removeClass(a, 'active');
          if (a.getAttribute('href') === `#${hash}`) {
            this.renderer.addClass(a, 'active');
          }
        });
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
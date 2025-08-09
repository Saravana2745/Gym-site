import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

interface GymClass {
  title: string;
  desc: string;
  img: string;
  video?: string;
  rating: number;
  trainer: string;
  benefits: string[];
}

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClassesComponent implements AfterViewInit {
  classes: GymClass[] = [
    {
      title: 'Yoga',
      desc: 'Improve flexibility, balance, and strength with our relaxing yoga sessions.',
      img: 'yoga.jpg',
      video: 'yoga.mp4',
      rating: 4,
      trainer: 'Priya Sharma',
      benefits: [
        'Enhances flexibility',
        'Reduces stress',
        'Improves posture'
      ]
    },
    {
      title: 'HIIT',
      desc: 'High-Intensity Interval Training for maximum calorie burn in minimum time.',
      img: 'hiit.jpg',
      video: 'hiit.mp4',
      rating: 4,
      trainer: 'Rahul Verma',
      benefits: [
        'Burns fat quickly',
        'Boosts metabolism',
        'Time efficient'
      ]
    },
    {
      title: 'Spin',
      desc: 'Cardio-focused cycling classes to boost endurance and burn calories.',
      img: 'spin.avif',
      video: 'spin.mp4',
      rating: 3.5,
      trainer: 'Anita Singh',
      benefits: [
        'Improves cardiovascular health',
        'Low impact on joints',
        'Fun group environment'
      ]
    },
    {
      title: 'Zumba',
      desc: 'Dance your way to fitness with energetic and fun Zumba sessions.',
      img: 'zum.jpg',
      video: 'zumba.mp4',
      rating: 5,
      trainer: 'Vikram Patel',
      benefits: [
        'Burns calories',
        'Boosts mood',
        'Great for all ages'
      ]
    },
    {
      title: 'Pilates',
      desc: 'Strengthen your core and improve flexibility with our mat and reformer Pilates sessions.',
      img: 'pilates.jpg',
      video: 'pilates.mp4',
      rating: 4.5,
      trainer: 'Meera Kapoor',
      benefits: [
        'Core strength',
        'Improved posture',
        'Low-impact toning'
      ]
    },
    {
      title: 'CrossFit',
      desc: 'High-intensity functional training for strength, endurance, and agility.',
      img: 'crossfit.jpg',
      video: 'crossfit.mp4',
      rating: 3,
      trainer: 'Arjun Singh',
      benefits: [
        'Full-body workout',
        'Builds strength',
        'Community support'
      ]
    },
    {
      title: 'Boxing',
      desc: 'Learn boxing techniques, improve cardio, and relieve stress in a safe environment.',
      img: 'boxing.jpg',
      video: 'boxing.mp4',
      rating: 4,
      trainer: 'Rohit Sharma',
      benefits: [
        'Cardio endurance',
        'Stress relief',
        'Self-defense skills'
      ]
    },
    {
      title: 'Aqua Aerobics',
      desc: 'Low-impact water workouts for all ages, great for joint health and stamina.',
      img: 'aqua.jpg',
      video: 'aqua.mp4',
      rating: 4.5,
      trainer: 'Sunita Rao',
      benefits: [
        'Gentle on joints',
        'Improves stamina',
        'Fun group activity'
      ]
    }
  ];

  mostVisibleIndex: number = 0;

  @ViewChildren('bgVideo') bgVideos!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Play background videos
    setTimeout(() => {
      if (this.bgVideos) {
        this.bgVideos.forEach(videoRef => {
          const video = videoRef.nativeElement;
          video.muted = true;
          video.onloadedmetadata = () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                setTimeout(() => video.play(), 500);
              });
            }
          };
          if (video.readyState >= 1) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                setTimeout(() => video.play(), 500);
              });
            }
          }
        });
      }
    }, 400);

    // Initial scroll check
    setTimeout(() => this.onScroll(), 100);
  }

  showBookingAlert(): void {
    alert('Booking feature coming soon!');
  }

  goToMembership(i: number): void {
    this.router.navigate(['/membership'], { queryParams: { class: i } });
  }

  ngOnInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      this.onScroll();
    }, 100);
  }

  getStars(rating: number): number[] {
    return [1, 2, 3, 4, 5];
  }

  getStarType(rating: number, index: number): 'full' | 'half' | 'empty' {
    const starValue = index + 1;
    if (rating >= starValue) return 'full';
    if (rating >= starValue - 0.75 && rating < starValue - 0.25) return 'half';
    return 'empty';
  }

  @HostListener('window:scroll', [])
  onScroll() {
    let maxVisibleIdx = -1;
    let maxVisibleRatio = 0;

    this.classes.forEach((c, i) => {
      const el = document.getElementById('class-' + i);
      if (el) {
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, window.innerHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = visibleHeight / rect.height;

        if (ratio > maxVisibleRatio && ratio > 0.2) {
          maxVisibleRatio = ratio;
          maxVisibleIdx = i;
        }
      }
    });

    if (maxVisibleIdx !== -1) {
      this.mostVisibleIndex = maxVisibleIdx;
    }
  }
}
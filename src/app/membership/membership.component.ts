import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

interface GymClass {
  title: string;
  desc: string;
  img: string;
  rating: number;
  trainer: string;
  benefits: string[];
}

interface ComboOffer {
  name: string;
  price: string;
  details: string[];
  special: string;
}

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('faqAnim', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('250ms cubic-bezier(.4,0,.2,1)', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(.4,0,.2,1)', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class MembershipComponent {
  classes: GymClass[] = [
    {
      title: 'Yoga',
      desc: 'Improve flexibility, balance, and strength with our relaxing yoga sessions.',
      img: 'yoga.jpg',
      rating: 4.8,
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
      rating: 4.7,
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
      rating: 4.6,
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
      rating: 4.9,
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
      rating: 4.7,
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
      rating: 4.8,
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
      rating: 4.6,
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
      rating: 4.5,
      trainer: 'Sunita Rao',
      benefits: [
        'Gentle on joints',
        'Improves stamina',
        'Fun group activity'
      ]
    }
  ];

  comboOffers: ComboOffer[] = [
    {
      name: 'Starter Pack',
      price: '₹999/month',
      details: [
        'Any 2 classes/week',
        'Free diet consultation',
        'Access to gym floor'
      ],
      special: 'Get your first month at 20% off!'
    },
    {
      name: 'Pro Fitness',
      price: '₹1799/month',
      details: [
        'Unlimited classes',
        'Personal trainer (2 sessions/month)',
        'Free locker & steam'
      ],
      special: 'Includes 2 free personal training sessions!'
    },
    {
      name: 'Elite Annual',
      price: '₹15,999/year',
      details: [
        'Unlimited classes',
        'Dedicated personal trainer',
        'Priority booking',
        'Merchandise kit'
      ],
      special: 'Free gym merchandise kit + priority support!'
    }
  ];

  timeSlots: string[] = [
    '6:00 AM - 7:00 AM',
    '7:30 AM - 8:30 AM',
    '9:00 AM - 10:00 AM',
    '5:00 PM - 6:00 PM',
    '6:30 PM - 7:30 PM',
    '8:00 PM - 9:00 PM'
  ];

  selectedClassIndex: number | null = null;
  selectedSlot: string | null = null;
  bookingStep: number = 1;
  bookingConfirmed: boolean = false;
  confirmedBooking: { class: GymClass; slot: string } | null = null;

  openedFaq: number | null = null;
  faqs = [
    {
      question: 'Can I change my class after booking?',
      answer: 'Yes, you can reschedule or switch classes up to 2 hours before your booked slot.'
    },
    {
      question: 'Are trainers certified?',
      answer: 'All our trainers are certified and experienced in their respective fields.'
    },
    {
      question: 'Do combo offers include personal training?',
      answer: 'Our Pro and Elite combos include personal training sessions. See offer details above.'
    },
    {
      question: 'How do I cancel my membership?',
      answer: 'You can cancel anytime from your account dashboard or by contacting our support team.'
    }
  ];

  selectClass(index: number) {
    this.selectedClassIndex = index;
    this.selectedSlot = null;
    this.bookingStep = 2;
    this.bookingConfirmed = false;
    setTimeout(() => {
      const timing = document.getElementById('timing-section');
      if (timing) timing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  selectSlot(slot: string) {
    this.selectedSlot = slot;
    this.bookingStep = 3;
  }

  goBack(step: number) {
    this.bookingStep = step;
    if (step === 1) {
      this.selectedClassIndex = null;
      this.selectedSlot = null;
    }
    if (step === 2) {
      this.selectedSlot = null;
    }
  }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmBooking() {
    this.bookingConfirmed = true;
    this.confirmedBooking = {
      class: this.classes[this.selectedClassIndex!],
      slot: this.selectedSlot!
    };
    this.bookingStep = 4;
  }

  selectCombo(combo: ComboOffer) {
    alert(`You selected the "${combo.name}" offer!\nBe safe with your transaction!\n\nPrice: ${combo.price},\nDetails:\n- ${combo.details.join('\n- ')}\n\nSpecial: ${combo.special},\n\nThank you for choosing our gym!`);
  }

  scrollToCombos() {
    const combos = document.getElementById('combos');
    if (combos) {
      combos.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleFaq(index: number) {
    this.openedFaq = this.openedFaq === index ? null : index;
  }
}
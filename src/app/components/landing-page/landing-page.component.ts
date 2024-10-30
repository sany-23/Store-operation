import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective,
} from '@coreui/angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LandingPageComponent {
  features = [
    {
      icon: 'computer',
      title: 'High-Quality Hardware',
      description: 'Top-notch components for your computer needs.',
    },
    {
      icon: 'build',
      title: 'Expert Support',
      description: 'Our team of experts is here to help you.',
    },
    {
      icon: 'shopping_cart',
      title: 'Secure Checkout',
      description: 'Fast and secure checkout process.',
    },
  ];

  carouselSlides = [
    {
      imageUrl: '/public/rtx-4090-oc.webp',
      title: 'Latest GPU Models',
      description: 'Discover the latest in GPU technology.',
    },
    {
      imageUrl: '/public/ryzen9-9950X.webp',
      title: 'High-Performance CPUs',
      description: 'Upgrade your system with the latest processors.',
    },
    {
      imageUrl: '/public/elgato-stream-deck-mk2.webp',
      title: 'Accessories and Peripherals',
      description: 'Find the best accessories to complement your setup.',
    },
  ];
}

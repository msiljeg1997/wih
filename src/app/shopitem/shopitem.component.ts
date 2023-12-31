import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { iRadionice } from '../models/radionice';
import { APIServis } from '../api.service';
import { TranslateService } from '@ngx-translate/core';
import { Renderer2 } from '@angular/core';
import { AnimationBuilder, AnimationPlayer, AnimationMetadata, style, animate, trigger, transition, useAnimation, keyframes } from '@angular/animations';
import { iPredavaci } from '../models/predavaci';
import { StorageService } from '../storage.service';
import { Router, ActivatedRoute } from '@angular/router'; // Import the Router and ActivatedRoute

// Animation function for scrolling
export function animateScroll(options: any): AnimationMetadata[] {
  return [
    animate(
      options.timing,
      style({
        transform: 'translateY(-100%)',
        height: '100%',
        opacity: 0,
      })
    ),
    animate(
      options.timing,
      style({
        transform: 'translateY(0)',
        height: '100%',
        opacity: 1,
      })
    ),
  ];
}

@Component({
  selector: 'app-shopItems',
  templateUrl: './shopitem.component.html',
  styleUrls: ['./shopitem.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      transition(':enter', [
        animate(
          '500ms ease-in-out',
          keyframes([
            style({
              transform: 'translateY(-100%)',
              height: '100%',
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: 'translateY(0)',
              height: '100%',
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ShopitemComponent {
  // Input properties
  @Input() radionice!: iRadionice;
  @Input() cardIndex?: number;

  // Output event
  @Output() cardSelected = new EventEmitter<string>();

  // Component state variables
  isSelected: boolean = false;
  isExpanded: boolean = false;
  showMoreMobile: boolean = false;
  isExpandedMobile: boolean = false;
  participants: iPredavaci[] = [];

  ngOnInit() {
    // Initialize component
    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
    this.loadParticipants();
    this.storageService.getButtonTranslation(this.radionice);
  }

  constructor(
    private storageService: StorageService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private el: ElementRef,
    private predavaciService: APIServis,
    private router: Router, // Inject Router
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  // Redirect to the 'radionice' component with the cardIndex query parameter
  redirectToRadionice() {
    if (this.cardIndex !== undefined) {
      console.log(this.cardIndex);
      this.router.navigate(['/radionice'], {
        queryParams: { cardIndex: this.cardIndex },
      });
    }
  }

  // Handle adding items to the basket
  addToBasket() {
    const cardTitle = this.radionice?.theme;
    if (cardTitle) {
      this.cardSelected.emit(cardTitle);
    }
  }

  // Toggle item selection
  toggleSelected() {
    this.radionice.selected = !this.radionice.selected;
    this.storageService.getButtonTranslation(this.radionice);
  }

  // Toggle item expansion (desktop)
  toggleExpanded2() {
    if (window.innerWidth < 770) {
      this.toggleExpandedMobile();
    } else {
      this.toggleExpandedDesktop();
    }
  }

  // Toggle item expansion (desktop)
  toggleExpandedDesktop() {
    this.isExpanded = !this.isExpanded;
    const cardTextElement = document.querySelector('.pTextDiv p.card-body') as HTMLElement;
    if (this.isExpanded) {
      this.renderer.removeStyle(cardTextElement, 'max-height');
      this.renderer.removeStyle(cardTextElement, 'overflow');
    } else {
      this.renderer.setStyle(cardTextElement, 'max-height', '500px');
      this.renderer.setStyle(cardTextElement, 'overflow', 'hidden');
    }
  }

  // Toggle item expansion (mobile)
  toggleExpandedMobile() {
    this.isExpandedMobile = !this.isExpandedMobile;
    const cardTextElement = document.querySelector('.pTextDiv p.card-body') as HTMLElement;
    if (this.isExpandedMobile) {
      this.renderer.removeStyle(cardTextElement, 'max-height');
      this.renderer.removeStyle(cardTextElement, 'overflow');
    } else {
      this.renderer.setStyle(cardTextElement, 'max-height', '200px');
      this.renderer.setStyle(cardTextElement, 'overflow', 'hidden');
    }
  }

  // Check screen width for mobile view
  checkScreenWidth() {
    this.showMoreMobile = window.innerWidth <= 768;
  }
    // Scroll to the heading element
    scrollToHeading() {
      if (this.cardIndex !== undefined) {
        console.log(`Scrolling to card index ${this.cardIndex}`);
        const h1Element = document.getElementById(`card-text-${this.cardIndex}`);
        if (h1Element) {
          h1Element.focus();
        }
      }
    }
  
    // Load participants data from the API
    loadParticipants() {
      this.predavaciService.getPredavaci(this.translate.currentLang).subscribe(
        (response: any) => {
          if (this.isApiResponseValid(response)) {
            this.participants = response.data;
            console.log('Loaded participants:', this.participants);
          } else {
            this.handleApiError('Invalid API response', response);
          }
        },
        (error) => {
          this.handleApiError('API request failed', error);
        }
      );
    }
  

  //error handling functions section

  private isApiResponseValid(response: any): boolean {
    return (
      response &&
      response.status === 'OK' &&
      response.msg === 'request_success' &&
      Array.isArray(response.data)
    );
  }

  private handleApiError(message: string, error: any): void {
    const errorMessage = error.status
      ? `API request failed with status ${error.status}`
      : 'An error occurred';

    console.error(`${message}:`, errorMessage, error);
  }



}

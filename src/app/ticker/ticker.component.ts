import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss']
})
export class TickerComponent implements AfterViewInit {

  organizations = [
    'assets/wihsvg.png',
    'assets/wihsvg.png',
    'assets/wihsvg.png',
    'assets/wihsvg.png',
    'assets/wihsvg.png',
    'assets/wihsvg.png',
    


];

  @ViewChild('tickerItems', { static: false }) tickerItems!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const tickerItemsWidth = this.tickerItems.nativeElement.getBoundingClientRect().width;
    const animationDuration = 50000; 

    this.tickerItems.nativeElement.style.setProperty('--animation-duration', `${animationDuration / tickerItemsWidth}s`);
  }
}

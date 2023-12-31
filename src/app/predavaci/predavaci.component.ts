import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { iPredavaci } from '../models/predavaci';
import { APIServis } from '../api.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-predavaci',
  templateUrl: './predavaci.component.html',
  styleUrls: ['./predavaci.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PredavaciComponent implements OnInit {
  participants: iPredavaci[] = [];
  imageUrlBasePredavaci = 'https://wih.hr/beauty/public/predavaci_images/';

  constructor(private predavaciService: APIServis, private translate: TranslateService) { }

  ngOnInit() {
this.loadParticipants();
  }


  loadParticipants() {
    this.predavaciService.getPredavaci(this.translate.currentLang).subscribe(
      (response: any) => {
        if (this.isApiResponseValid(response)) {
          this.participants = response.data;
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
  
  
  getImageUrl(photoName: string): string {
    return this.imageUrlBasePredavaci + photoName;
  }

}
  


// notes
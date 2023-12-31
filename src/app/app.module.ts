import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaslovnaComponent } from './naslovna/naslovna.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TickerComponent } from './ticker/ticker.component';
import { PredavaciComponent } from './predavaci/predavaci.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { RadioniceComponent } from './radionice/radionice.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { OkonferencijComponent } from './okonferencij/okonferencij.component';
import { ShopitemComponent } from './shopitem/shopitem.component';
import { KupovinaComponent } from './kupovina/kupovina.component';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SmjestajComponent } from './smjestaj/smjestaj.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ZnanstvenoStrucniOdborComponent } from './znanstveno-strucni-odbor/znanstveno-strucni-odbor.component';
import { OrganizacijskiOdborComponent } from './organizacijski-odbor/organizacijski-odbor.component';
import { PapperComponent } from './papper/papper.component';






@NgModule({
  declarations: [
    AppComponent,
    NaslovnaComponent,
    NavBarComponent,
    TickerComponent,
    PredavaciComponent,
    RadioniceComponent,
    OkonferencijComponent,
    ShopitemComponent,
    KupovinaComponent,
    SmjestajComponent,
    OrganizationsComponent,
    ZnanstvenoStrucniOdborComponent,
    OrganizacijskiOdborComponent,
    PapperComponent
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AccordionModule,
    AppRoutingModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    AlertModule.forRoot(),
    

  ],
  exports: [
    NgxSpinnerModule,
    ShopitemComponent
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
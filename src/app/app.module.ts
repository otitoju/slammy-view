import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Angular4PaystackModule } from 'angular4-paystack';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlutterwaveModule } from "flutterwave-angular-v3"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layouts/header/header.component';
import { FooterComponent } from './Layouts/footer/footer.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ProductsComponent } from './pages/products/products.component';
import { BlogComponent } from './pages/blog/blog.component';
import { SliderComponent } from './components/slider/slider.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { VideoComponent } from './components/video/video.component';
import { ServicesComponent } from './components/services/services.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { SubcribeComponent } from './components/subcribe/subcribe.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { WhatWeDoComponent } from './components/what-we-do/what-we-do.component';
import { ContactComponent } from './components/contact/contact.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ServiceListsComponent } from './components/service-lists/service-lists.component';
import { RequestServiceComponent } from './components/request-service/request-service.component';
import { LoaderComponent } from './components/loader/loader.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    ProductsComponent,
    BlogComponent,
    SliderComponent,
    AboutusComponent,
    VideoComponent,
    ServicesComponent,
    LatestNewsComponent,
    SubcribeComponent,
    ContactUsComponent,
    WhatWeDoComponent,
    ContactComponent,
    SingleProductComponent,
    ServiceListsComponent,
    RequestServiceComponent,
    LoaderComponent,
    WhatsappButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Angular4PaystackModule.forRoot('pk_live_c7ef5c396217bd7ee57a02fa884d8f668d4b7ba3'),
    HttpClientModule,
    FormsModule,
    FlutterwaveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { CoverComponent } from './components/cover/cover.component';
import { EventComponent } from './components/event/event.component';
import { PartnerComponent } from './components/partner/partner.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {
    path: `home`,
    component: CoverComponent
  },
  {
    path: `about`,
    component: AboutComponent
  },
  {
    path: `event`,
    component: EventComponent
  },
  {
    path: `partner`,
    component: PartnerComponent
  },
  {
    path: `contact`,
    component: ContactComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    CoverComponent,
    EventComponent,
    PartnerComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

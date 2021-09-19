import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BookingFormsComponent } from './booking-forms/booking-forms.component';
import { TrainComponent } from './train/train.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HttpWebService } from './http-web.service';
import { SignupComponent } from './signup/signup.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { VerifiedComponent } from './verified/verified.component';
import { VerifyComponent } from './verify/verify.component';
import { PaymentGooglepayComponent } from './payment-googlepay/payment-googlepay.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    routingComponent,
    BookingFormsComponent,
    TrainComponent,
    LoginComponent,
    AdminComponent,
    SignupComponent,
    SignupSuccessComponent,
    VerifiedComponent,
    VerifyComponent,
    PaymentGooglepayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePayButtonModule
  ],
  providers: [HttpWebService],
  bootstrap: [AppComponent]
})
export class AppModule { }

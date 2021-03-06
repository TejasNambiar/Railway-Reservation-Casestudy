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
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { SignedinComponent } from './signedin/signedin.component';
import { UserComponent } from './user/user.component';
import { Admin1Component } from './admin1/admin1.component';
import { PaymentGooglepayComponent } from './payment-googlepay/payment-googlepay.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
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
    SignedinComponent,
    UserComponent,
    Admin1Component,
    PaymentGooglepayComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePayButtonModule,
    NgxPaginationModule
  ],
  providers: [HttpWebService],
  bootstrap: [AppComponent]
})
export class AppModule { }

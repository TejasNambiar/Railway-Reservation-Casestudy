import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { BookingFormsComponent } from './booking-forms/booking-forms.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { LoginComponent } from './login/login.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { SignupComponent } from './signup/signup.component';
import { TrainComponent } from './train/train.component';
import { VerifiedComponent } from './verified/verified.component';
import { VerifyComponent } from './verify/verify.component';

// api routing or routing in between pages 
const routes: Routes = [
  //{path:"",component:HomePageComponent},
  {path:"loginPage",component:LoginComponent},
  {path:"homePage",component:HomePageComponent},
  {path:"trainData",component:TrainComponent},
  {path:"booking",component:BookingFormsComponent},
  {path:"signup1",component:LoginSignupComponent},
  {path:"admin", component:AdminComponent},
  {path: '', component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  { path: 'signupsuccess', component: SignupSuccessComponent },
  { path: 'otp/userVerifyChallenge', component: VerifyComponent },
  { path: 'verifiedOTP', component: VerifiedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  LoginSignupComponent,
  HomePageComponent,
  TrainComponent,
  BookingFormsComponent,
  LoginComponent,
  AdminComponent
]
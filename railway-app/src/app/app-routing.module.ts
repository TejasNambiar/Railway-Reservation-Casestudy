import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookingFormsComponent } from './booking-forms/booking-forms.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { TrainComponent } from './train/train.component';

// api routing or routing in between pages 
const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"loginPage",component:LoginSignupComponent},
  {path:"homePage",component:HomePageComponent},
  {path:"trainData",component:TrainComponent},
  {path:"booking",component:BookingFormsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [
  AppComponent,
  LoginSignupComponent
]
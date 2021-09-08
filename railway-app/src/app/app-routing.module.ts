import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { TrainComponent } from './train/train.component';

const routes: Routes = [
  {path:"loginPage",component:LoginSignupComponent},
  {path:"homePage",component:HomePageComponent},
  {path:"trainData",component:TrainComponent}
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
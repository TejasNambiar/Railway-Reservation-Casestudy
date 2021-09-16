import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { SignupService } from '../signup.service';


@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  myForm = {
    email: '',
    username: '',
    password: ''  
  }
  confirmPassword = ''
  error = ''

  constructor(private formBuild: FormBuilder, private authService:SignupService) { 
  }

  ngOnInit(): void {
  }
  addUsers(){
    if(this.myForm.password == this.confirmPassword){
      this.error = ''
      this.authService.addUser(this.myForm).subscribe(signUpUser => this.myForm = signUpUser)
    }
    else{
      this.error = "passwords dont match"
    }
    this.error = ''
    this.reset()
  }
  
  reset(){
    this.myForm = {
      email: '',
      username: '',
      password: ''  
    }
  }
}

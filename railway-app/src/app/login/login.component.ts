import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpWebService } from '../http-web.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  errors: any;
  validateStatus: boolean;
  errorDetl: string;

  private token!: string;
  // logged!: boolean;

    constructor(private _httpWebService: HttpWebService,  private router: Router) {
      this.validateStatus = false;
      this.errorDetl = '';
    }



    validateSignIn() {

        if (this.username != null) {
          if (EMAIL_REGEX.test(this.username)) {
              this.validateStatus = true;
          } else {
            document.getElementById('username')!.classList.add('invalid-input');
            document.getElementById('password')!.classList.add('invalid-input');
            this.validateStatus = false;
            this.errorDetl = 'Enter a valid email';
          }
        }else {
          document.getElementById('username')!.classList.add('invalid-input');
          document.getElementById('password')!.classList.add('invalid-input');
          this.validateStatus = false;
          this.errorDetl = 'Email is required';
        }

        if (this.validateStatus) {
          if (this.password == null) {
            document.getElementById('username')!.classList.add('invalid-input');
            this.errorDetl = 'Password is required';
            this.validateStatus = false;
          }else {
            this.validateStatus = true;
          }
        }

        // end of validation!!!!
      if (this.validateStatus) {
        this._httpWebService.getSignInConfirmation(this.username, this.password)
          .subscribe((resp: any) => {
            const userData = resp;

            if (userData.status === '403') {
              this.errorDetl = 'We could not verify you! Please try again with a valid email';
            }else {

              if (userData.status === 401) {
                window.sessionStorage.setItem('identifier', userData.userid);
                this.router.navigate(['otp/userVerifyChallenge']);
              } else {
                this.token = userData.token;
                window.sessionStorage.setItem('userid', this.username);
                window.sessionStorage.setItem('auth-token', this.token);

                if (userData.route === '/user') {
                  this.router.navigate(['homePage']);
                  // this.logged = true
                  // // this._httpWebService.setLoggedStatus(this.logged)
                } else {
                  this.router.navigate(['admin']);
                }

              }

            }


          },
            (          error: any) => {
              this.errors = error;
          });
        }


  }

}


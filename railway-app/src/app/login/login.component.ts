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
            // check status if verified
            this._httpWebService.getSignInConfirmation(this.username, this.password)
              .subscribe((resp: any) => {
            const userData = resp;
            // invalid user
            if (userData.status === '403') {
              this.errorDetl = 'We could not verify you! Please try again with a valid email';
            }else {
              // valid but not verified
              if (userData.status === 401) {
                // allows me to store locally while session, the user value id for future reference
                window.sessionStorage.setItem('identifier', userData.userid);
                this.router.navigate(['otp/userVerifyChallenge']);
              } else {
                // verified user
                this.token = userData.token;
                // create a local storage for the user credentials
                window.sessionStorage.setItem('userid', this.username);
                window.sessionStorage.setItem('auth-token', this.token);

                if (userData.route === '/user') {
                  this.router.navigate(['homePage']);
                } else {
                  this.router.navigate(['admin']);
                }

              }

            }


          },
          (error: any) => {
              this.errors = error;
          });
        }
  }

}


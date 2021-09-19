import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpWebService } from '../http-web.service';

@Component({
  selector: 'app-signedin',
  templateUrl: './signedin.component.html',
  styleUrls: ['./signedin.component.css']
})
export class SignedinComponent implements OnInit {

  user!: string;
  
  constructor( private _httpWebService:HttpWebService, private router:Router) { }

  ngOnInit(): void {
    if (window.sessionStorage.getItem('auth-token') != null) {
      this._httpWebService.verifyUserLogin(window.sessionStorage.getItem('auth-token'))
      .subscribe((resp: any) => {
        const userData = resp;
        if (userData.status === '403') {
          this.router.navigate(['#']);
        } else {
          if (userData.route === '/user') {
            this.router.navigate(['user']);
            this._httpWebService.signInDetails()
              .subscribe( (respd: { status: string; firstName: string; }) => {
                if (respd.status === '200') {
                  this.user = respd.firstName;

                }
              });

          } else {
            this.router.navigate(['admin']);
          }
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }
  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['']);
  }
}

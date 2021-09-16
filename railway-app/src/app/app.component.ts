import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpWebService } from './http-web.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'railway-app';
  user = '';
  // logged=false

  constructor(private _httpWebService: HttpWebService,  private router: Router) { }

  ngOnInit() {
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
                  // // this._httpWebService.getLoggedStatus().subscribe((value: boolean) => this.logged =value)
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
     //this.logged=false
   }

}

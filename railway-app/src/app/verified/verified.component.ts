import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // clears the local storage after key verified has 200 status
    if (window.sessionStorage.getItem('verified') === '200') {
      window.sessionStorage.clear();
    } else {
      // routes back to login page
      this.router.navigate(['']);
    }
  }

}

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
    if (window.sessionStorage.getItem('verified') === '200') {
      window.sessionStorage.clear();
    } else {
      this.router.navigate(['']);
    }
  }

}

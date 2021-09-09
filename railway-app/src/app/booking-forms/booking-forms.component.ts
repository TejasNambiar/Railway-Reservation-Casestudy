import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-forms',
  templateUrl: './booking-forms.component.html',
  styleUrls: ['./booking-forms.component.css']
})
export class BookingFormsComponent implements OnInit {

  constructor(private bookService:BookingService, private formBuild:FormBuilder) { }

  bookingArray = {
    fullName:'',
    tier:'',
    email:'',
    start:'',
    destination:'',
    trainName:'',
    date:'',
    adhaar:'',
    cardHolder:'',
    cardNumber:'',
    cvv:''
  }

  ngOnInit(): void {
  }

  addBooking(){
    this.bookService.addBooking(this.bookingArray)
      .subscribe(booking => this.bookingArray = booking)
  }
}

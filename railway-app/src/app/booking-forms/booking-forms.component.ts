import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { BookingService } from '../booking.service';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-booking-forms',
  templateUrl: './booking-forms.component.html',
  styleUrls: ['./booking-forms.component.css']
})
export class BookingFormsComponent implements OnInit {
  errorMsg: any;
  error!: boolean;

  constructor(private bookService:BookingService, private trainService:TrainService) { }

  bookingArray = {
    fullName:'',
    tier:'',
    email:'',
    start:'',
    destination:'',
    trainName:'',
    date:'',
    adhaar:'',
    gender:'',
    cvv:'',
    pnr:''
  }
  id!:any
  trainPrefill!:any
  visible:boolean = false
  pnrStatus!:String
  
  creditArray ={
    accountNumber:'',
    accountHolder:'',
    secret:''
  }

  ngOnInit(): void {
    this.id=this.trainService.getTrainPrefill()
    console.log('Booking train id: ',this.id)
    this.Prefill(this.id)
    this.error=false
    
  }

  addBooking(form:NgForm){
    // generating and assigning PNR value to this.pnr seperately 
    this.bookingArray.pnr = this.getRandomString()

    // capturing this.pnr to callback and display the customer booking details
    this.pnrStatus = this.bookingArray.pnr

    // displaying pnr generated in console
    console.log("pnr: "+this.bookingArray.pnr+" referenced PNR Status: "+this.pnrStatus)

    this.bookService.addBooking(this.bookingArray)
      .subscribe(
        booking =>{
          this.bookingArray = booking,
          this.error = false
        }, 
        () => {
          this.errorMsg ='Opps! Some error occured upon submission.'
          this.error=true
        }
      )
    form.reset()
  }

  Prefill(id:any){
    

    this.trainService.getTrainId(id)
      .subscribe(prefill => {
        console.log("prefill response: "+prefill.value)
        this.trainPrefill =prefill
      })
    console.log("prefilled data: "+this.trainPrefill)
  }

  reset(){
    this.bookingArray = {
      fullName:'',
    tier:'',
    email:'',
    start:'',
    destination:'',
    trainName:'',
    date:'',
    adhaar:'',
    gender:'',
    cvv:'',
    pnr:''
    }
  }

  next(){
    this.visible = !this.visible
    console.log("visible after click: "+this.visible)
  }

  back(){
    this.visible=false
  }

  getRandomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 6; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

}

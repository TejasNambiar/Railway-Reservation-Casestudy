import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { HttpWebService } from '../http-web.service';
import { StationService } from '../station.service';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  to = new FormControl('', [Validators.required]);
  from = new FormControl('', [Validators.required]);
  TrainArray!:any
  
  // PNR Tab Instructions Code Segment
  pnrArray = {
    adhaar:'',
    pnr:''
  }
  pnrObject!:any 
  clicked!:boolean

  // ideally supposed to be used while handling errors (if any)
  loading!:boolean
  errorMessage!:String
  stationArray: any;
 
  constructor(private trainService:TrainService, private bookService:BookingService, 
    private stationService:StationService, private _httpWebService:HttpWebService, private router:Router) { }

  ngOnInit(): void {
    this.loading = false;
    this.errorMessage = "";
    this.clicked = false
    this.stationService.getStation()
      .subscribe(station => this.stationArray = station)
  }
  getErrorMessage() {

    // error catching in train search tab
    if (this.to.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.from.hasError('required')) {
      return 'You must enter a value';
    }
    return null
  }
  
  searchTrain(){

    this.trainService.getTrainToFrom(this.to.value,this.from.value)
      .subscribe(
        train => {
          this.TrainArray = train
          console.log("retrieving data: "+JSON.stringify(this.TrainArray))
          this.loading = true
          this.errorMessage = ""
        },
        (error) => {                              //Error callback
          console.error('error caught in component')
          this.errorMessage = error;
          this.loading = false;
        }
      )
    
    console.log("retrieved data: "+JSON.stringify(this.TrainArray))
  }

  prefill(train: any){
    this.loading =true
    console.log("train id: "+train._id)
    console.log("train Name: "+train.trainName)
    this.trainService.setTrainPrefill(train._id)
  }
  getPrefill(){
    this.trainService.getTrainPrefill()
  }

  getPNR(){
    this.loading =true
    this.bookService.getBookingPnr(this.pnrArray.pnr,this.pnrArray.adhaar)
     .subscribe(booking => this.pnrObject=booking )
     console.log("pnrObject:"+ this.pnrObject)
  }

  deleteService(object:any){
    if(confirm("Are you sure to delete booking with PNR "+object.pnr)) { 
      this.bookService.deleteBooking(object._id)
      .subscribe(booking => this.pnrObject = booking)
    }
    // after delete, displays data aded on webpage
    this.ngOnInit()
  }

  bookClick(){
    this.clicked=true
  }
}

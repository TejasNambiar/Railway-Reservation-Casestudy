import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookingService } from '../booking.service';
import { StationService } from '../station.service';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  trainArray: any=[]
  newTrain = {
    trainName: '',
    trainNumber: '',
    startStation: '',
    destination: '',
    arrivalTime: '',
    departureTime: '',
    date: ''
  } 

  bookingArray:any = []
  stationArray: any;
 
  constructor(private bookService:BookingService, private trainService:TrainService, private stationService:StationService){} 
  ngOnInit(): void {
    // on itnialization, displays the contacts on the webpage
    this.trainService.getTrain()
      .subscribe(train => this.trainArray = train)

    this.bookService.getBooking()
      .subscribe(booking => this.bookingArray = booking)

    
    this.stationService.getStation()
      .subscribe(station => this.stationArray = station)
  }

  addTrain(form:NgForm){
    this.trainService.addTrain(this.newTrain)
      .subscribe(train => this.trainArray = train)
    
    // after add, displays data aded on webpage
    this.trainService.getTrain()
      .subscribe(train=> this.trainArray =train)
    form.reset()
  }

  deleteTrain(object:any){
    console.log("id: "+object._id)
    this.trainService.deleteTrain(object._id)
      .subscribe(train => this.trainArray = train)
    // after add, displays data aded on webpage
    this.trainService.getTrain()
    .subscribe(train => this.trainArray = train)
  }



  // Booking Services Admin Interface
  deleteBooking(object:any){
    console.log("id: "+object._id)
    this.bookService.deleteBooking(object._id)
      .subscribe(booking => this.bookingArray = booking)
    
    this.bookService.getBooking()
      .subscribe(booking => this.bookingArray = booking)
  }

}

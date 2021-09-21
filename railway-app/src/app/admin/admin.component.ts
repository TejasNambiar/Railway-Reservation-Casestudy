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

  bookingArray:any = []
  stationArray: any;
  trainArray: any=[]
  True = true
  five= 5
  totalRecords1 !:string
  totalRecords2 !:string
  totalRecords3 !:string
  page:number = 1

  newTrain = {
    trainName: '',
    trainNumber: '',
    startStation: '',
    destination: '',
    arrivalTime: '',
    departureTime: '',
    date: ''
  } 
  newStation = {
    stationName: '',
    stationCode: ''
  }
 
  constructor(private bookService:BookingService, private trainService:TrainService, private stationService:StationService){} 
  ngOnInit(): void {
    // on itnialization, displays the contacts on the webpage
    this.trainService.getTrain()
      .subscribe(train => 
        this.trainArray = train
        )
    this.totalRecords1 = this.trainArray.length
    
    // loading booking data
    this.bookService.getBooking()
      .subscribe(booking => this.bookingArray = booking)
    
    this.totalRecords2 = this.bookingArray.length

    // select stations from db
    this.stationService.getStation()
      .subscribe(station => this.stationArray = station)
    
    this.totalRecords3 = this.stationArray.length
  }

  // adding train data
  addTrain(form:NgForm){
    this.trainService.addTrain(this.newTrain)
      .subscribe(train => this.trainArray = train)
    
    // after add, displays data aded on webpage
    this.ngOnInit()
    form.reset()
  }

  deleteTrain(object:any){
    if(confirm("Are you sure to delete "+object.trainName)) {
      console.log("id: "+object._id)
      this.trainService.deleteTrain(object._id)
        .subscribe(train => this.trainArray = train)
    }
    
    // after add, displays data aded on webpage
    this.trainService.getTrain()
    .subscribe(train => this.trainArray = train)
  }

  // Station Service Admin Interface
  
  // Add Station
  addStation(form:NgForm){
    this.stationService.addStation(this.newStation)
      .subscribe(station => this.stationArray = station)
    
    // after add, displays data aded on webpage
    this.stationService.getStation()
    .subscribe(station => this.stationArray =station)
    form.reset()
  }

  // Delete Station
  deleteStation(object:any){
    if(confirm("Are you sure to delete booking with PNR "+object.stationName)) {
      console.log("id: "+object._id)
      this.stationService.deleteStation(object._id)
        .subscribe(booking => this.bookingArray = booking)
    }
    
    this.stationService.getStation()
      .subscribe(booking => this.stationArray = booking)
  }

  // Booking Services Admin Interface
  deleteBooking(object:any){
    if(confirm("Are you sure to delete booking with PNR "+object.pnr)) {
      console.log("id: "+object._id)
      this.bookService.deleteBooking(object._id)
        .subscribe(booking => this.bookingArray = booking)
    }
    this.bookService.getBooking()
      .subscribe(booking => this.bookingArray = booking)
  }

}

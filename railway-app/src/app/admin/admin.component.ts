import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from '../booking.service';
import { ConfirmationDialogService } from '../confirmation-dialog.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
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
 
  constructor(private bookService:BookingService, private trainService:TrainService, 
    private stationService:StationService, private dialog: MatDialog){} 
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
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Remove Train',
        message:"Are you sure to delete "+object.trainName
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        console.log("id: "+object._id)
        this.trainService.deleteTrain(object._id)
          .subscribe(train => this.trainArray = train)
        // after add, displays data aded on webpage
        this.trainService.getTrain()
          .subscribe(train => this.trainArray = train)
      }
    })
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
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Remove Station',
        message: "Are you sure to delete Station "+object.stationName
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        console.log("id: "+object._id)
        this.stationService.deleteStation(object._id)
          .subscribe(booking => this.bookingArray = booking)
          
        this.stationService.getStation()
        .subscribe(booking => this.stationArray = booking)
      }
    })    
  }

  // Booking Services Admin Interface
  deleteBooking(object:any){
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Remove Booking',
        message:"Are you sure to delete booking with PNR "+object.pnr
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        console.log("id: "+object._id)
        this.bookService.deleteBooking(object._id)
          .subscribe(booking => this.bookingArray = booking)
        this.bookService.getBooking()
          .subscribe(booking => this.bookingArray = booking)
      }
    })
  }
}

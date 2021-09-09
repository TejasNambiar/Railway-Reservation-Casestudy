import { Component, OnInit } from '@angular/core';
import { Trains } from '../train';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css'],
  providers: [TrainService]
})
export class TrainComponent implements OnInit {

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

 
  constructor(private trainService:TrainService){}

  ngOnInit(): void {
    // on itnialization, displays the contacts on the webpage
    this.trainService.getTrain()
      .subscribe(train => this.trainArray = train)
  }
  addTrain(){
    this.trainService.addTrain(this.newTrain)
      .subscribe(train => this.trainArray = train)
    
    // after add, displays data aded on webpage
    this.trainService.getTrain()
      .subscribe(train=> this.trainArray =train)
  }

  deleteTrain(object:any){
    console.log("id: "+object._id)
    this.trainService.deleteTrain(object._id)
      .subscribe(train => this.trainArray = train)
    // after add, displays data aded on webpage
    this.trainService.getTrain()
    .subscribe(train => this.trainArray = train)
  }
  

}

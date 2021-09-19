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
    date: '',
    AC1:'',
    AC2:'',
    S:''
  } 
  loading = false;
  errorMessage = "";

 
  constructor(private trainService:TrainService){}

  ngOnInit(): void {
    // on itnialization, displays the contacts on the webpage
    this.trainService.getTrain()
      .subscribe(train => this.trainArray = train)
  }
  addTrain(){
    this.trainService.addTrain(this.newTrain)
      .subscribe(
        train => {
          this.trainArray = train,
          this.loading = true;
          this.errorMessage = "";
        },
        (error) => {                              //Error callback
          console.error('error caught in component')
          this.errorMessage = error;
          this.loading = false;
        }
      )
    
    // after add, displays data aded on webpage
    this.ngOnInit()
    //this.reset()
  }
  reset() {
    this.newTrain = {
      trainName: '',
      trainNumber: '',
      startStation: '',
      destination: '',
      arrivalTime: '',
      departureTime: '',
      date: '',
      AC1:'',
      AC2:'',
      S:''
    }
  }

  deleteTrain(object:any){
    console.log("id: "+object._id)
    this.trainService.deleteTrain(object._id)
      .subscribe(train => this.trainArray = train)
    // after delete, displays data aded on webpage
    this.ngOnInit()
  }
  

}

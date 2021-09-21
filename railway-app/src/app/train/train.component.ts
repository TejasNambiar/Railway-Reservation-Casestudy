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
 
  totalRecords !:string
  page:number = 1
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
  True = true
  five= 5
 
  constructor(private trainService:TrainService){}

  ngOnInit(): void {
    // on itnialization, displays the contacts on the webpage
    this.trainService.getTrain()
      .subscribe(train => 
        this.trainArray = train
        )
    this.totalRecords = this.trainArray.length
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

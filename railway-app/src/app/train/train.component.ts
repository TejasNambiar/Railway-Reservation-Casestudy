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
 
  constructor(private trainService:TrainService){}

  ngOnInit(): void {
  }
  

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TrainService {

 /* constructor(private http:HttpClient) { }

  // this ur url to connect to mongodb
  urlTrain = 'http://localhost:3060/api/trains'
  
  getTrain(){

    // this will set ur header to GET 
    return this.http.get(this.urlTrain)
    .pipe(map(resp=>resp))
  }*/
}

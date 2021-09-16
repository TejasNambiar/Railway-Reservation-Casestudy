import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class TrainService {

 constructor(private http:HttpClient) { }

 id!:any 

  // this ur url to connect to mongodb
  urlTrain = 'http://localhost:3060/api/trains'
  //urlTrain = 'assets/data/trains.json'
  getTrain():Observable<any>{

    console.log("calling getTrain: "+ this.http.get<any>(this.urlTrain))
    // this will set ur header to GET 
    // return this.http.get(this.urlTrain).pipe(map(resp=>resp))
    return this.http.get<any>(this.urlTrain)
  }
  // add contact method
  // this will set ur header to POST
  addTrain(newTrain:any):Observable<any>{
    var headers = new HttpHeaders()
    console.log("inside addTrain -> newTrain:",newTrain.toString())
    headers.append('Contact-Type','application/json')
    return this.http.post<any>(this.urlTrain, newTrain,{headers:headers})
    .pipe(map(resp=>resp)).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
  getTrainId(id:any){
    console.log("get id: "+id)
    console.log(this.http.get<any>(this.urlTrain+"/"+id))
    return this.http.get<any>(this.urlTrain+"/"+id).pipe(map(resp=>resp))
  }

  deleteTrain(id:any):Observable<any>{
    console.log("deleteTrain id: "+id)
    return this.http.delete<any>(this.urlTrain+'/'+id)
    .pipe(map(resp=>resp))
  }

  getTrainToFrom(to:any, from:any){
    console.log("to: "+to+" from: "+from)
    console.log("urlresponse: "+this.urlTrain+'/'+to+'/'+from)
    return this.http.get<any>(this.urlTrain+'/'+to+'/'+from).pipe(map(resp=>resp)).pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        //Handle the error here
        return throwError(err);    //Rethrow it back to component
      })
    )
  }

  setTrainPrefill(id:any){
    this.id = id
    console.log("object set i.e in use: "+ id)
  }
  getTrainPrefill(){
    console.log(this.id)
    return this.id
  }
}

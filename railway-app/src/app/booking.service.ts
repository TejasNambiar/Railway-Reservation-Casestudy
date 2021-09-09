import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  // this ur url to connect to mongodb
  urlBooking = 'http://localhost:3050/api/booking'
  //urlTrain = 'assets/data/trains.json'
  getBooking():Observable<any>{

    console.log("calling getBooking: "+ this.http.get<any>(this.urlBooking))
    // this will set ur header to GET 
    // return this.http.get(this.urlTrain).pipe(map(resp=>resp))
    return this.http.get<any>(this.urlBooking)
  }
  
  // add contact method
  // this will set ur header to POST
  addBooking(newBooking:any):Observable<any>{
    var headers = new HttpHeaders()
    console.log("inside addTrain -> newTrain:",newBooking.toString())
    headers.append('Contact-Type','application/json')
    return this.http.post<any>(this.urlBooking, newBooking,{headers:headers})
    .pipe(map(resp=>resp))
  }

  getBookingId(id:any):Observable<any>{
    console.log("Booking id: "+id)
    return this.http.get<any>(this.urlBooking+'/'+id)
    .pipe(map((resp=>resp)))
  }

  deleteBooking(id:any):Observable<any>{
    console.log("deleteTrain id: "+id)
    return this.http.delete<any>(this.urlBooking+'/'+id)
    .pipe(map((resp=>resp)))
  }
}

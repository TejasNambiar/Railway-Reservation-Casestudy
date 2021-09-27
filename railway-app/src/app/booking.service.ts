import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  // this ur url to connect to mongodb
  urlBooking = 'http://localhost:3050/api/booking'
  apiGatewayUrl ='http://localhost:4000/booking/booking'
  //urlTrain = 'assets/data/trains.json'
  getBooking():Observable<any>{

    console.log("calling getBooking: "+ this.http.get<any>(this.apiGatewayUrl))
    // this will set ur header to GET 
    // return this.http.get(this.urlTrain).pipe(map(resp=>resp))
    return this.http.get<any>(this.apiGatewayUrl)
  }
  
  // add contact method
  // this will set ur header to POST
  addBooking(newBooking:any):Observable<any>{
    var headers = new HttpHeaders()
    console.log("inside addTrain -> newTrain:",newBooking.toString())
    headers.append('Contact-Type','application/json')
    return this.http.post<any>(this.apiGatewayUrl, newBooking,{headers:headers})
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

  // gets booking details via prn
  getBookingPnr(pnr:any,adhaar:any):Observable<any>{
    return this.http.get<any>(this.apiGatewayUrl+'/'+pnr)
     .pipe(map((resp=>resp))).pipe(catchError(this.erroHandler))
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}

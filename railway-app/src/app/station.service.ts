import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  urlStation = "http://localhost:3070/api/stations"
  constructor(private http:HttpClient) { }

  getStation():Observable<any>{

    // this will set ur header to GET 
    return this.http.get<any>(this.urlStation)
  }
  addStation(newStation:any):Observable<any>{
    var headers = new HttpHeaders()
    console.log("inside addStation -> newStation:",newStation.toString())
    headers.append('Contact-Type','application/json')
     return this.http.post<any>(this.urlStation, newStation,{headers:headers})
     .pipe(map(resp=>resp)).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
  deleteStation(id:any):Observable<any>{
    console.log("deleteStation id: "+id)
    return this.http.delete<any>(this.urlStation+'/'+id)
    .pipe(map(resp=>resp))
  }
}

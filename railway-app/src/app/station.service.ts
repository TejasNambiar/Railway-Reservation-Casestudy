import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}

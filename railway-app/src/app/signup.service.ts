import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

   // this ur url to connect to mongodb
   urlSignUp = 'http://localhost:3030/api/signup'
   //urlTrain = 'assets/data/trains.json'
   
   addUser(newAuth:any):Observable<any>{
    var headers = new HttpHeaders()
    console.log("inside addTrain -> newTrain:",newAuth.toString())
    headers.append('Contact-Type','application/json')
    return this.http.post<any>(this.urlSignUp, newAuth,{headers:headers})
    .pipe(map(resp=>resp)).pipe(catchError(this.erroHandler));
    }
    
    erroHandler(error: HttpErrorResponse) {
      return throwError(error.message || 'server Error');
    }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
// import 'rxjs/Rx';
@Injectable()
export class HttpWebService {
  // logged: any;

  constructor(private http: Http) { }

  getSignInConfirmation(username: string, password: string) {
    const url = 'http://localhost:2000/login';
    const reqBody = {
      'identifier': username,
      'password': password
    };
    const req = this.http.post(url, reqBody).pipe(map((res: Response) => res.json()));

    return req;
  }

  verifyUserLogin(token: string | null) {
    const url = 'http://localhost:2000/login/signOn';
    const options = new RequestOptions({headers : new  Headers({ 'authorization': token})});
    const reqBody = '';
    const req = this.http.post(url, reqBody, options ).pipe(map((res: Response) => res.json()));

    return req;
  }


  createNewUser(usertype:string, username: string, password: string, aadhaar: string, PAN: string, occupation: string, firstname: string, lastname: string, dob: string, phone: string, address: string, city: string, state: string, country: string, zip: string) {
    const url = 'http://localhost:2000/signUpUser';
    const reqBody = {
      'email': username,
      'password': password,
      'lang': 'english',
      'firstName': firstname,
      'lastName': lastname,
      'dob': dob,
      'aadhaar': aadhaar,
      'pan': PAN,
      'occupation': occupation,
      'countryCode': '+91',
      'phone': phone,
      'address': address,
      'city': address,
      'state': state,
      'country': country,
      'pin': zip,
      'userType': usertype,
      'lastLoggIn': 'NA',
      'sessionStatus': 'Not Verified',
      'currentSession': 'NA'
    };
    const req = this.http.post(url, reqBody);
    req.subscribe();
  }
  profileDetlCheck() {
    const url = 'http://localhost:2000/api/myprofile/details';
    const reqBody = {
      'identifier': window.sessionStorage.getItem('userid'),
    };
    const req = this.http.post(url, reqBody).map((res: Response) => res.json());
    return req;
  }

  signInDetails() {
    const url = 'http://localhost:2000/api/sigin/details';
    const reqBody = {
      'identifier': window.sessionStorage.getItem('userid'),
    };
    const req = this.http.post(url, reqBody).map((res: Response) => res.json());
    return req;
  }

  createOTP(userid: string | null) {
    const url = 'http://localhost:2000/verifyUserChallenge';
    const reqBody = {
      'identifier': userid
    };

    const req = this.http.post(url, reqBody).map((res: Response) => res.json());
    return req;
  }


  sendOTPVerification(userid: string | null, session_id: string | null, otp: string) {
    const url = 'http://localhost:2000/verifyOTP';
    const reqBody = {
      'identifier': userid,
      'session_id': session_id,
      'otpn': otp
    };

    const req = this.http.post(url, reqBody).map((res: Response) => res.json());
    return req;
  }

  // setLoggedStatus(value:any){
  //   this.logged= value
  // }
  // getLoggedStatus(){
  //   console.log(this.logged)
  //   return this.logged
  // }

}

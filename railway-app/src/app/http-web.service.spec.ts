import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';

import { HttpWebService } from './http-web.service';

describe('HttpWebService', () => {
  let service: HttpWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpModule
      ],
      providers:[HttpWebService]
    });
    service = TestBed.inject(HttpWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

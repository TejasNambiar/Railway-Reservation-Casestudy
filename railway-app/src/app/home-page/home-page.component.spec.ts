import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainService } from '../train.service';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';

import { HomePageComponent } from './home-page.component';
import { HttpWebService } from '../http-web.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let testBedTrainService: TrainService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports:[
        FormsModule,
        HttpClientTestingModule,
        HttpModule,
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers:[TrainService,HttpWebService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // creating a simple instance of TrainService
    testBedTrainService = TestBed.get(TrainService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the  train service instance', ()=> {
    let service: TrainService;
    service = TestBed.inject(TrainService);
    expect(service).toBeTruthy();
  })
  it('should inject the HttpWeb service and check its instance ', ()=>{
    let service: HttpWebService;
    service = TestBed.inject(HttpWebService);
    expect(service).toBeTruthy();
  })
});

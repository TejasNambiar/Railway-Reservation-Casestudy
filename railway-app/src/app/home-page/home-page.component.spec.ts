import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TrainService } from '../train.service';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';

import { HomePageComponent } from './home-page.component';

xdescribe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let testBedTrainService: TrainService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports:[FormsModule,HttpClientTestingModule],
      providers:[TrainService]
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
    const service: TrainService = TestBed.get(TrainService)
    expect( service).toBeTruthy()
  })
  xit('should inject the train service and check its instance ', inject([TrainService],(injectedService:TrainService)=>{
    expect(injectedService).toBeTruthy()
    expect(injectedService instanceof TrainService).toBeTruthy()
  }))
});

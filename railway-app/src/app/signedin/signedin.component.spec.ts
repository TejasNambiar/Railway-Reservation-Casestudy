import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpWebService } from '../http-web.service';

import { SignedinComponent } from './signedin.component';

describe('SignedinComponent', () => {
  let component: SignedinComponent;
  let fixture: ComponentFixture<SignedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        HttpClientModule,
        HttpModule,
        RouterTestingModule,
        RouterModule,
        MatMenuModule
      ],
      declarations: [ SignedinComponent ],
      providers:[HttpWebService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});

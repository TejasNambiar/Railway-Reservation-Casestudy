import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpWebService } from '../http-web.service';

import { Admin1Component } from './admin1.component';

describe('Admin1Component', () => {
  let component: Admin1Component;
  let fixture: ComponentFixture<Admin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        HttpClientModule,
        HttpModule,
        RouterModule,
        RouterTestingModule,
        MatMenuModule
      ],
      declarations: [ Admin1Component ],
      providers:[
        HttpWebService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

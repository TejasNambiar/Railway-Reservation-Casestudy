import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentGooglepayComponent } from './payment-googlepay.component';

xdescribe('PaymentGooglepayComponent', () => {
  let component: PaymentGooglepayComponent;
  let fixture: ComponentFixture<PaymentGooglepayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGooglepayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGooglepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

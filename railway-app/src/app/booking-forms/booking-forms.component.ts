import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookingService } from '../booking.service';
import { TrainService } from '../train.service';
import {} from '@google-pay/button-angular';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-forms',
  templateUrl: './booking-forms.component.html',
  styleUrls: ['./booking-forms.component.css']
})
export class BookingFormsComponent implements OnInit {
  errorMsg: any;
  error!: boolean;
  payTrue!: boolean;
  resetFlag!:boolean
  resetTouched !:boolean
  totalAmount !: number

  constructor(private bookService:BookingService, private trainService:TrainService, private dialog: MatDialog) { }

  bookingArray = {
    fullName:'',
    tier:'',
    email:'',
    start:'',
    destination:'',
    trainName:'',
    date:'',
    adhaar:'',
    gender:'',
    cvv:'',
    pnr:''
  }
  id!:any
  trainPrefill!:any
  visible:boolean = false
  pnrStatus!:String
  dummyData!:any
  set!:boolean 
  
  creditArray ={
    accountNumber:'',
    accountHolder:'',
    secret:''
  }

  ngOnInit(): void {
    this.id=this.trainService.getTrainPrefill()
    console.log('Booking train id: ',this.id)
    this.Prefill(this.id)
    this.error=true
    this.payTrue=false    
    this.resetTouched = false
    this.resetFlag=false
    
  }

  addBooking(form:NgForm){
    // generating and assigning PNR value to this.pnr seperately 
    this.bookingArray.pnr = this.getRandomString()

    // capturing this.pnr to callback and display the customer booking details
    this.pnrStatus = this.bookingArray.pnr

    // displaying pnr generated in console
    console.log("pnr: "+this.bookingArray.pnr+" referenced PNR Status: "+this.pnrStatus)

    this.bookService.addBooking(this.bookingArray)
      .subscribe(
        booking =>{
          this.bookingArray = booking,
          this.error = false
        }, 
        () => {
          this.errorMsg ='Opps! Some error occured upon submission.'
          this.error=true
        }
      )
    this.amount()
    form.reset()
  }

  Prefill(id:any){
    

    this.trainService.getTrainId(id)
      .subscribe(prefill => {
        console.log("prefill response: "+prefill.value)
        this.trainPrefill =prefill
      })
    console.log("prefilled data: "+this.trainPrefill)
  }

  reset(){
    this.bookingArray = {
      fullName:'',
    tier:'',
    email:'',
    start:'',
    destination:'',
    trainName:'',
    date:'',
    adhaar:'',
    gender:'',
    cvv:'',
    pnr:''
    }
    this.creditArray ={
      accountNumber:'',
      accountHolder:'',
      secret:''
    }
  }
  reset1(pnr:any){
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Remove Booking',
        message: "Are you sure to delete booking with PNR "+pnr
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.resetTouched = true
      console.log("Parameter PNR: "+pnr)
      console.log("ADHAAR: "+this.bookingArray.pnr)
      console.log("ADHAAR: "+this.bookingArray.pnr,this.bookingArray.adhaar)
      this.bookService.getBookingPnr(pnr,this.bookingArray.adhaar).subscribe(data=>this.dummyData=data)
      console.log("Object In Question: "+JSON.stringify(this.dummyData))
      if(this.dummyData){
        this.resetTouched=false
        console.log("ID selected: "+this.dummyData._id)
        console.log("Name selected: "+this.dummyData.fullName)
        this.bookService.deleteBooking(this.dummyData._id).subscribe(data=>this.dummyData=data)
        console.log("ID Deleted: "+this.dummyData._id)
        console.log("Name deleted: "+this.dummyData.fullName)
        this.reset()
      }
      else
        this.resetFlag=false
      }
    })
    // if(confirm("Are you sure to delete booking with PNR "+pnr)) {  
    //   this.resetTouched = true
    //   console.log("Parameter PNR: "+pnr)
    //   console.log("ADHAAR: "+this.bookingArray.pnr)
    //   console.log("ADHAAR: "+this.bookingArray.pnr,this.bookingArray.adhaar)
    //   this.bookService.getBookingPnr(pnr,this.bookingArray.adhaar).subscribe(data=>this.dummyData=data)
    //   console.log("Object In Question: "+JSON.stringify(this.dummyData))
    //   if(this.dummyData){
    //     this.resetTouched=false
    //     console.log("ID selected: "+this.dummyData._id)
    //     console.log("Name selected: "+this.dummyData.fullName)
    //     this.bookService.deleteBooking(this.dummyData._id).subscribe(data=>this.dummyData=data)
    //     console.log("ID Deleted: "+this.dummyData._id)
    //     console.log("Name deleted: "+this.dummyData.fullName)
    //     this.reset()
    //   }
    //   else
    //     this.resetFlag=false
    // }
  }

  next(){
    this.visible = !this.visible
    console.log("visible after click: "+this.visible)
  }

  back(){
    this.visible=false
  }

  getRandomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 6; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
  paymentAccess(){
    this.payTrue=true
  }

  amount(){
    this.totalAmount = 3500
    if(this.bookingArray.tier === 'AC-1'){
      this.totalAmount += 600
    }
    else if(this.bookingArray.tier === 'AC-2'){
      this.totalAmount += 500
    }
    else if(this.bookingArray.tier === 'AC-1'){
      this.totalAmount += 200
    }
    
    if(this.bookingArray.cvv === 'yes')
      this.totalAmount -=100
    else
      this.totalAmount +=0
    
    if(this.bookingArray.email === 'true')
      this.totalAmount +=200
    else
      this.totalAmount +=50
  }


  // google pay
  paymentRequest: google.payments.api.PaymentDataRequest = {
    // Declare the version of the Google Pay API that your site uses
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          // Define the card networks accepted by your site.
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        // Google encrypts information about a payer's selected card for secure processing by a payment provider.
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    // transaction information
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: `4050`,
      currencyCode: 'EUR',
      countryCode: 'BE'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
  };

  // Authorize Payments is used to start the payment process and acknowledge a payment's authorization status.
  // and done as follows
  onLoadPaymentData = (
    event: Event
  ): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData:any
    ) => {
      console.log('payment authorized', JSON.stringify(paymentData));
      this.set = true
      this.payTrue=true
      return {
        transactionState: 'SUCCESS'
      };
    }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }

  onclick(){
    this.set = true
      this.payTrue=true
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute } from '@angular/router';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})
export class RequestServiceComponent implements OnInit {
  code = "";
  service:any;
  payload:any = {
    fname: "",
    lname: "",
    qty: "",
    phone: "",
    email: "",
    service: "",
    url: "",
    instruction: "",
    price: "",
    delivery: "free",
    location: "",
    filePath: ""
  }


  customerDetails = {
    name: this.payload.fname + " " + this.payload.lname,
    email: this.payload.email,
    phone_number: this.payload.phone
  }

  paymentData: InlinePaymentOptions = {
    public_key: UtilService.publicKey,
    tx_ref: UtilService.generateReference(),
    amount: 0,
    currency: 'USD',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta: UtilService.meta,
    customer: this.customerDetails,
    customizations: UtilService.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  }
  constructor(private util: UtilService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private flutterwave: Flutterwave,
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get('id');
    this.getService(serviceId);
  }

  getService(id:any): void {
    try {
      this.productService.getService(id).subscribe((res:any) => {

        this.service = res.info;
        this.payload.price = res.info.price;
        this.payload.service = res.info.title;
        this.paymentData.amount = res.info.price
      });
    } catch (error) {
      console.log(error);
    }
  }

  submit() {

    if(!this.payload.fname || !this.payload.lname || !this.payload.qty || !this.payload.phone || !this.payload.email || !this.payload.service || !this.payload.location || !this.code) {
      return this.util.errorAlert("error", "Empty field", "Please fill all empty fields.", false, "");
    }
    else {
      let initializePrice = this.payload.delivery === "express" ? (this.payload.qty * this.payload.price) * 2 : this.payload.qty * this.payload.price;
      this.customerDetails.email = this.payload.email;
      this.customerDetails.phone_number = this.payload.phone;
      this.customerDetails.name = this.payload.fname + " " + this.payload.lname;

      let data:any = {
        fname: this.payload.fname,
        lname: this.payload.lname,
        qty: this.payload.qty,
        phone: this.code + this.payload.phone,
        email: this.payload.email,
        service: this.payload.service,
        url: this.payload.url,
        instruction: this.payload.instruction,
        price: initializePrice,
        delivery: this.payload.delivery,
      }

      return
      this.productService.NewRequest(data).subscribe((res:any) => {
        console.log(res);
        this.util.alertWithSuccess('Thank you...', 'You submitted successfully!', 'success');
      }, (error:any) => {
        return this.util.errorAlert("error", "An error has occurred.", error.message, false, "");
      });
    }
   // this.util.topEnd()
    //this.util.confirmBox();
   // this.util.errorAlert();

  }

  makePayment(){
    if(!this.payload.fname || !this.payload.lname || !this.payload.qty || !this.payload.phone || !this.payload.email || !this.payload.service || !this.code) {
      return this.util.errorAlert("error", "Empty field", "Please fill all empty fields.", false, "");
    }
    else {
      this.customerDetails.email = this.payload.email;
      this.customerDetails.phone_number = this.payload.phone;
      this.customerDetails.name = this.payload.fname + " " + this.payload.lname;
      let initializePrice = this.payload.delivery === "express" ? (this.payload.qty * this.payload.price) * 2 : this.payload.qty * this.payload.price;
      this.paymentData.amount = initializePrice;
      this.flutterwave.inlinePay(this.paymentData);
    }
    }

    closedPaymentModal(): void {
      console.log('payment is closed');
      //location.reload();
    }

    makePaymentCallback(response: PaymentSuccessResponse): void {
      //console.log("Payment callback", response);

      let formData = new FormData();
      formData.append("avatar", this.payload.filePath, this.payload.filePath.name);
      this.apiService.UploadFile(formData).subscribe((res:any) => {

        if(res.status === "success") {
          let TransactionInfo = {
            product: this.payload.service,
            amount: response.amount,
            currency: response.currency,
            email: this.customerDetails.email,
            status: response.status,
            reference: response.tx_ref,
            message: response.flw_ref,
            transactionId: response.transaction_id,
            channel: "card",
            gateway: "Flutterwave",
            phone: this.code + this.customerDetails.phone_number,
            fullname: this.customerDetails.name
          }

          let initializePrice = this.payload.delivery === "express" ? (this.payload.qty * this.payload.price) * 2 : this.payload.qty * this.payload.price;

          let data:any = {
            fname: this.payload.fname,
            lname: this.payload.lname,
            qty: this.payload.qty,
            phone: this.code || this.payload.phone,
            email: this.payload.email,
            service: this.payload.service,
            url: this.payload.url,
            instruction: this.payload.instruction,
            price: initializePrice,
            delivery: this.payload.delivery,
            filePath: res.url,
          }

          this.productService.NewRequest(data).subscribe((res:any) => {
            this.util.alertWithSuccess('Thank you...', 'Your request has been submitted successfully!', 'success');
            this.apiService.NewTransaction(TransactionInfo).subscribe((res:any) => {
            }, (error:any) => {
              console.log(error);
              this.util.errorAlert("error", "Error occurred", "An error occurred while saving your information.", false, "")
            });
          }, (error:any) => {
            return this.util.errorAlert("error", "An error has occurred.", error.message, false, "");
          });
        }
        return;
      }, (error:any) => {
        return this.util.errorAlert("error", "An error has occurred.", error.message, false, "");
      })


    }

    UploadFile(e:any) {
      let file = e.target.files[0];
      this.payload.filePath = file;
      // let formData = new FormData();
      // formData.append("avatar", file, file.name);
    }

}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { PaystackOptions } from 'angular4-paystack';
import { ApiService } from 'src/app/services/api.service';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  title:any;
  productName:any;
  whatWeDo:any[] = [];
  options:any = {
    amount: 0,
    email: '',
    ref: `${Math.ceil(Math.random() * 10e10)}`,
    currency: "",
    metadata: {
      custom_fields: [

      ]
    },
    channels: ["card", "bank"],

    product: "",
    fullname: "",
    phone: "",
  }

  //flutterwave
  //publicKey = "FLWPUBK_TEST-cb6d6ecf808d2aba82fff56a2b3764f2-X";

  customerDetails = {
    name: '',
    email: '',
    phone_number: ''
  }

  // customizations = {
  //   title: 'Slammyphotography',
  //   description: 'Payment for the slammy service',
  //   logo: 'https://res.cloudinary.com/oluwapelumi/image/upload/v1668763940/slammy_logo_Black.png'
  // }

  // meta = {
  //   'counsumer_id': '7898',
  //   'consumer_mac': 'kjs9s8ss7dd'
  // }

  paymentData: InlinePaymentOptions = {
    public_key: UtilService.publicKey,
    tx_ref: UtilService.generateReference(),
    amount: 0,
    currency: '',
    payment_options: 'card,ussd',
    redirect_url: '',
    meta: UtilService.meta,
    customer: this.customerDetails,
    customizations: UtilService.customizations,
    callback: this.makePaymentCallback,
    onclose: this.closedPaymentModal,
    callbackContext: this
  }

  constructor(
    private productService: ProductService,
    private apiService: ApiService,
    private flutterwave: Flutterwave
    ) { }

  ngOnInit(): void {
    this.getWhatWeDo();
  }

  getWhatWeDo() {
    this.whatWeDo = this.productService.getWhatWeDo();
  }

  paymentInit(product:any) {
    console.log('Payment initialized');

  }

  setPrice(product:any) {
    this.options.amount = product.price * 100;
   // this.price = product.price;
    this.options.product = product.title;
    this.paymentData.amount = product.price;
    this.paymentData.currency = product.currency;
    this.productName = product.title;
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    //console.log(this.title, ref);

    let TransactionInfo = {
      product: this.options.product,
      amount: this.options.amount / 100,
      currency: this.options.currency,
      email: this.options.email,
      status: ref.status,
      reference: ref.reference,
      message: ref.message,
      transactionId: ref.transaction,
      channel: "card",
      gateway: "PayStack",
      phone: this.options.phone,
      fullname: this.options.fullname
    }

    this.apiService.NewTransaction(TransactionInfo).subscribe((res) => {
      console.log(res);
      location.reload();

    }, (error:any) => {
      console.log(error);
    });
  }

  paymentCancel() {
    console.log('payment failed');
    location.reload();
  }

  saveInfo() {
    console.log(this.options);
  }

  //flutterwave
  makePayment(){
    this.flutterwave.inlinePay(this.paymentData)
  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    console.log("Payment callback", response);

    let TransactionInfo = {
      product: this.productName,
      amount: response.amount,
      currency: response.currency,
      email: this.customerDetails.email,
      status: response.status,
      reference: response.tx_ref,
      message: response.flw_ref,
      transactionId: response.transaction_id,
      channel: "card",
      gateway: "Flutterwave",
      phone: this.customerDetails.phone_number,
      fullname: this.customerDetails.name
    }

    this.apiService.NewTransaction(TransactionInfo).subscribe((res) => {
      console.log(res);
      location.reload();

    }, (error:any) => {
      console.log(error);
    });
  }

  closedPaymentModal(): void {
    console.log('payment is closed');
    location.reload();
  }

  // generateReference(): string {
  //   let date = new Date();
  //   return date.getTime().toString();
  // }

}

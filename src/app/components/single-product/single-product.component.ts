import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from "flutterwave-angular-v3";
import { UtilService } from 'src/app/services/util.service';
import { ApiService } from 'src/app/services/api.service';
import { PaystackOptions } from 'angular4-paystack';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  code ="";
  freeStatus:boolean = false;
  reference = '';
  title:any;
  options:any = {
    amount: 0,
    email: '',
    ref: `${Math.ceil(Math.random() * 10e10)}`,
    currency: "USD",
    metadata: {
      custom_fields: [

      ]
    },
    channels: ["card", "bank"],

    product: "",
    fullname: "",
    phone: "",
  }

  product:any= {};

  productName:any;
  customerDetails = {
    name: '',
    email: '',
    phone_number: ''
  }

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
    private route: ActivatedRoute,
    private productService: ProductService,
    private apiService: ApiService,
    private flutterwave: Flutterwave,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProduct(productId);
  }

  getProduct(id:any): void {
    try {
      this.productService.getProduct(id).subscribe((res:any) => {

        this.product = res.info;
      })
    } catch (error) {
      console.log(error);
    }
  }

  setPrice(currency:any, title:any) {
    let actualPrice = this.product.actualPrice;
    let discountPrice = this.product.discountPrice;
    this.paymentData.currency = currency;
    this.productName = title;
    if(discountPrice != 0 || discountPrice != null) {
      this.paymentData.amount = discountPrice;
    }
    else {
      this.paymentData.amount = actualPrice;
    }

  }

  makePaymentCallback(response: PaymentSuccessResponse): void {
    //console.log("Payment callback", response);

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
      phone: this.code + this.customerDetails.phone_number,
      fullname: this.customerDetails.name
    }

    this.apiService.NewTransaction(TransactionInfo).subscribe((res) => {

      this.downloadAndSendEmailAfterSuccessfulPayment(this.product?.downloadLink);
      this.utilService.alertWithSuccess("Transaction successful", "A link has been sent to your email.", "success");
      //location.reload();

    }, (error:any) => {
      console.log(error);
      this.utilService.errorAlert("error", "Error occurred", "An error occurred while saving your information.", false, "<a href>Why do I have this issue?</a>")
    });
  }

 makePayment() {
  if(this.customerDetails.name === "" || this.customerDetails.email === "" || this.customerDetails.phone_number === "" || !this.code) {
    return this.utilService.topEnd("top-end", "error", "Please fill all empty fields and proceed to payment", false)
  }
    this.flutterwave.inlinePay(this.paymentData);
  }

  closedPaymentModal(): void {
    console.log('payment is closed');
    //location.reload();
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }
  goToLink1(url?: string){
    window.open(url, "_blank");
  }

  goToLink2(url?: string){
    window.open(url, "_blank");
  }

  goToLink3(url?: string){
    window.open(url, "_blank");
  }

  downloadAndSendEmailAfterSuccessfulPayment(url?: string) {
    window.open(url, "_blank");
  }

  // Paystack implementation
  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';

    let TransactionInfo = {
      product: this.options.product,
      amount: this.options.amount,
      currency: this.options.currency,
      email: this.options.email,
      status: ref.status,
      reference: ref.reference,
      message: ref.message,
      transactionId: ref.transaction,
      channel: "card",
      gateway: "PayStack",
      phone: this.code + this.options.phone,
      fullname: this.options.fullname
    }

    this.apiService.NewTransaction(TransactionInfo).subscribe((res) => {
      this.downloadAndSendEmailAfterSuccessfulPayment(this.product?.downloadLink);
      this.utilService.alertWithSuccess("Transaction successful", "A link has been sent to your email.", "success");
      //location.reload();

    }, (error:any) => {
      console.log(error.message);
      this.utilService.errorAlert("error", "Error occurred", "An error occurred while saving your information.", false, "<a href>Why do I have this issue?</a>");
    });
  }

  paymentCancel() {
    console.log('payment failed');
  }

  setPaystackPrice(currency:any, title:any) {
    let actualPrice = this.product.actualPrice;
    let discountPrice = this.product.discountPrice;
    //this.options.currency = currency;
    this.options.currency = "NGN";
    this.options.product = title;
    if(discountPrice != 0 || discountPrice != null) {
      this.options.amount = discountPrice * 790 * 100;
    }
    else {
      this.options.amount = actualPrice * 790 * 100;
    }
  }


  GetFreePackage() {
    //location.reload();

    if(!this.customerDetails.email || !this.customerDetails.name || !this.customerDetails.phone_number || !this.code) {
      return;
    }

    let TransactionInfo = {
      product: this.product.productName,
      amount: 0,
      currency: "NGN",
      email: this.customerDetails.email,
      status:"Free" ,
      reference: "Free",
      message: "Free",
      transactionId: "NONE",
      channel: "Free",
      gateway: "Free",
      phone: this.code + this.customerDetails.phone_number,
      fullname: this.customerDetails.name
    }

    this.apiService.NewTransaction(TransactionInfo).subscribe((res) => {
      this.freeStatus = true;
      this.utilService.alertWithSuccess("successful", "You can close this panel and click on the Download button to begin download.", "success");
      //location.reload();

    }, (error:any) => {
      console.log(error);
    });
  }
}

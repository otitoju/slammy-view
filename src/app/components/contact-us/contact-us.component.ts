import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  code = "";
  payload:any = {
    sender: "",
    email: "",
    phone: "",
    message: ""
  }

  constructor(private productService: ProductService, private Util: UtilService) { }

  ngOnInit(): void {
  }

  handleSubmit() {
   try {
    let data = {
      sender: this.payload.sender,
      email: this.payload.email,
      phone: this.code + this.payload.phone,
      message: this.payload.message
    }

    if(!this.payload.sender || !this.payload.email || !this.payload.phone || !this.payload.message || !this.code) {
      return this.Util.errorAlert("error", "Not allowed", "Please fill all empty fields.", false, "");
    }
    this.productService.contactUs(data).subscribe((res:any) => {
      if(res.STATUS === 201) {
        this.Util.alertWithSuccess("Message sent", "Your message has been sent to slammyphotography", "success")
      }
      else {
        this.Util.errorAlert("error", "Message failed", "An error occurred while sending your message. Please try again", false, "");
      }
    })
   } catch (error) {
    console.log(error);
    this.Util.errorAlert("error", "Message failed", "An error occurred while sending your message. Please try again", false, "");
   }
  }

}

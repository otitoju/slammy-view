import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  //static publicKey:any = "FLWPUBK_TEST-cb6d6ecf808d2aba82fff56a2b3764f2-X";
  //static publicKey:any = "FLWPUBK_TEST-43217f6e6882ce4249f3ecfc72dec3e9-X";
  // live mode
  static publicKey:any = "FLWPUBK-bcb1c2ffddc4abf4202b4cb1bf87514e-X";
  static customizations = {
    title: 'Slammyphotography',
    description: 'Payment for the slammy service',
    logo: 'https://res.cloudinary.com/oluwapelumi/image/upload/v1668763940/slammy_logo_Black.png'
  }

  static meta = {
    'counsumer_id': '7898',
    'consumer_mac': 'kjs9s8ss7dd'
  }
  constructor() { }

  static generateReference(): string {
    let date = new Date();
    return date.getTime().toString();
  }


  alertWithSuccess(title:any, message:string, alertType:any){
    Swal.fire(title, message, alertType);
  }

  errorAlert(icon:any, title:any, text:any, showConfirm:boolean, footer:any)
  {
    Swal.fire({
      icon: icon, //error, success
      title: title,
      text: text,
      footer: footer //'<a href>Why do I have this issue?</a>'
    });
  }

  topEnd(position:any, icon:any, title:any, confirm:boolean)
  {
    Swal.fire({
      position: position, // top-end
      icon: icon, // success, error
      title: title,
      showConfirmButton: confirm,
      timer: 1500
    })
  }
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}

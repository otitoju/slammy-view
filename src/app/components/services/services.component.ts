import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services:any[] =[]
  constructor(private productService: ProductService,  private router: Router) { }

  ngOnInit(): void {
    this.productService.getServices().subscribe((res:any) => {
      this.services = res.info.splice(0, 3)
    })
    //this.services = services.splice(0, 3);
  }

  requestService(id:any) {
    this.router.navigate(["/request-service", id]);
  }

}



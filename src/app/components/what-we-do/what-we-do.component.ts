import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.css']
})
export class WhatWeDoComponent implements OnInit {
  Data:any[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.Data = this.productService.getGallery();

  }

}

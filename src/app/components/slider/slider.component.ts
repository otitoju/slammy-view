import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  data:any[] = []
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.data = this.productService.getSliders();
  }

}

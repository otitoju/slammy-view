import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  packages:any[] = []
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.packages = this.productService.getFreePackages();
  }

}

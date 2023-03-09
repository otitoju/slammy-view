import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
declare var $: any;

@Component({
  selector: 'app-service-lists',
  templateUrl: './service-lists.component.html',
  styleUrls: ['./service-lists.component.css']
})
export class ServiceListsComponent implements OnInit {
  services:any[] = []
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    try {
      this.productService.getServices().subscribe((res:any) => {
        this.services = res.info;
      });


      $("input.slider").on("input change", function(event:any) {
        // var element = $(thi).parents("div.container");
        var pos = event.target.value;
        $(".before").css({width: pos + "%"});
        $(".slider-button").css({left: "calc(" + pos + "% - 18px)"});
      });

      // $("#slided").on("input change", (e:any)=>{
      //   const sliderPos = e.target.value;
      //   // Update the width of the foreground image
      //   $('.foreground-img').css('width', `${sliderPos}%`)
      // });
    } catch (error) {
      console.log(error);
    }
  }

  requestService(id:any) {
    this.router.navigate(["/request-service", id]);
  }
}

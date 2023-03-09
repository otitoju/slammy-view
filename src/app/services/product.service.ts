import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products:any[] = [
    {
      id: 1,
      productName: "Picture Editing ",
      description: "Want more inquiries than you know what to do with? Want to grow your social media? 2 Days Ago",
      image: "assets/images/Home/image1.jpg",
      actualPrice: "1500",
      discountPrice: "0",
      currency: "$"
    },
    {
      id: 2,
      productName: "Constume presentation",
      description: "Want more inquiries than you know what to do with? Want to grow your social media? 2 Days Ago",
      image: "assets/images/Home/image2.jpg",
      actualPrice: "780",
      discountPrice: "500",
      currency: "$"
    },
    {
      id: 3,
      productName: "Wedding presentation",
      description: "Want more inquiries than you know what to do with? Want to grow your social media? 2 Days Ago",
      image: "assets/images/Home/image3.jpg",
      actualPrice: "50",
      discountPrice: "0",
      currency: "$"
    },
    {
      id: 4,
      productName: "Image Gallery",
      description: "Want more inquiries than you know what to do with? Want to grow your social media? 2 Days Ago",
      image: "assets/images/Home/image4.jpg",
      actualPrice: "4500",
      discountPrice: "0",
      currency: "$"
    },
    {
      id: 5,
      productName: "Sky Access",
      description: "Want more inquiries than you know what to do with? Want to grow your social media? 2 Days Ago",
      image: "assets/images/Home/image2.jpg",
      actualPrice: "200",
      discountPrice: "0",
      currency: "$"
    },

  ]

  whatWeDo:any[] = [
    {
      id: 1,
      title: "PHOTOGRAPHY COURSE",
      content: "Package include complete Step by Step High-end Retouching from start to finish 200 LUTs and Presets for Light skin tone, normal skin tone and dark skin tone and wedding presets, Outdoor and studio LUTs and Presets",
      price: 700,
      btnTitle: "BUY NOW",
      currency: "USD",
      link: "/products"
    },
    {
      id: 2,
      title: "RETOUCHING SERVICES",
      content: "We Offer The Best online Retouching Services at the cheapest price Rate. The prices for image retouching services from Slammy Retouching Studio firm are reasonable and stable since 2022.",
      price: 16000,
      btnTitle: "ORDER NOW",
      currency: "NGN",
      link: "/services"
    },
  ];

  freePackages: any[] = [
    {
      id: 1,
      title: "Free Packs",
      content: "Get a free raw Photo or LUTs for Practice!",
      icon: "icon icon-trophy"
    },
    {
      id: 2,
      title: "Free Raw Image",
      content: "Use our free raw images for practice",
      icon: "icon icon-diamond"
    },
    {
      id: 3,
      title: "Free LUTs and Presets",
      content: "Grab a free LUTs Action and Photography Tutorials Today! Try now with these free resources ($50 value!)",
      icon: "icon icon-layers"
    }
  ]

  homeGallery:any[] = [
    {
      id: 1,
      group: "wedding",
      image: "assets/images/Home/weddings/3.jpg",
      title: "",
      subtitle: "",

    },
    {
      id: 2,
      group: ["wedding"],
      image: "assets/images/Home/portait/(29).jpg",
      title: "",
      subtitle: "",

    },
    {
      id: 3,
      group: ["wedding"],
      image: "assets/images/Home/portait/m.jpg",
      title: "",
      subtitle: "",

    },
    {
      id: 4,
      group: ["wedding"],
      image: "assets/images/Home/weddings/6.jpg",
      title: "",
      subtitle: "",

    },
    {
      id: 5,
      group: ["wedding"],
      image: "assets/images/Home/weddings/5.jpg",
      title: "",
      subtitle: "",

    },
    {
      id: 6,
      group: ["wedding"],
      image: "assets/images/Home/weddings/6.jpg",
      title: "",
      subtitle: "",

    },
  ]


  sliderData:any[] = [
    {
      id: 1,
      image: "assets/images/Home/slider/image1.jpg",
      title: "Improve your photography. ",
      content: "grow your business With Slammy Magic Retouching pack + over 200 one click lightroom (ACR) presets and Photoshop LUTs",
      link: "product/6377f944a14efca3239f618c"
    },
    {
      id: 2,
      image: "assets/images/Home/slider/image2.jpg",
      title: "Become an A-List Creative!",
      content: "We’ve figured it out the hard way… so you don’t have to  Now is your chance to become a professional retoucher with Slammy Photography Magic Retouching Pack. With this pack, you can retouch large amount of photos in less time and get beautiful results.",
      link: "product/6377f944a14efca3239f618c"
    },
    {
      id: 3,
      image: "assets/images/Home/slider/image4.jpg",
      title: "Reach the Next Level.",
      content: "Take better photos, improve your editing & get more clients. Dial in the perfect look with our 1 click lightroom presets,  Attract your ideal customer  & hone your business skills with Our Premium courses.",
      link: "product/6377f944a14efca3239f618c"
    },
  ];

  services:any[] = [
    {
      id: 1,
      title: "BASIC RETOUCHING",
      priceContent: "$2.50 per photo Services applied:",
      content: "Image cropping, Teeth whitening, Blemish removal, Scar, pimple, acne, Red eye effect removal, Light skin face correction, Basic face skin smoothing",
      image: "assets/images/Home/headshot/(6).jpg"
    },
    {
      id: 2,
      title: "PRO RETOUCHING",
      priceContent: "$2.50 per photo Services applied:",
      content: "Image cropping, Teeth whitening, Blemish removal, Scar, pimple, acne, Red eye effect removal, Light skin face correction, Basic face skin smoothing, Background enhancement, Pro skin smoothing",
      image: "assets/images/Home/image2.jpg"
    },

    {
      id: 4,
      title: "Portrait Photo Editing",
      priceContent: "$3.00 per photo Services applied:",
      content: "We make portrait photos look good and professionally edited. Our retouchers will enhance the skin texture, remove all unwanted imperfections making your models look realistically edited.",
      image: "assets/images/Home/image2.jpg"
    },
    {
      id: 3,
      title: "High End Retouching Level",
      priceContent: "$7.00 per photo Services applied:",
      content: "Every professional photographer worked with this style of modern post processing. If you work in magazine or fashion photography industry,  you know the meaning of the word “High End”.  This word combination can be understood as something higher in price and of better quality than most others.  It will suit those who need a deep image post processing",
      image: "assets/images/Home/image3.jpg"
    },
    {
      id: 5,
      title: "Color Grading",
      priceContent: "$2.50 per photo Services applied:",
      content: "We upgrade, enhance, change the color of the image. Color correction and color editing is usually applied to different types of photography like e-commerce product, fashion photography, natural photography, etc.",
      image: "assets/images/Home/image2.jpg"
    },
    {
      id: 6,
      title: "Background Removal",
      priceContent: "$3.50 per photo Services applied:",
      content: "We enhance your photo by removing the background or replacing it with another one. In some cases, there might be random people, unnecessary objects or bleak landscapes that we can easily remove.",
      image: "assets/images/Home/image2.jpg"
    }
  ];

  public BaseUrl:any = environment.baseUrl;
  //public BaseUrl:any = "http://localhost:9000/api/v1/";

  constructor(private http: HttpClient,) { }

  getProducts() {
    let Url = this.BaseUrl + "products";
    //let Url = "http://api.slammyphotography.com:5000/api/v1/products";
    return this.http.get(Url);
  }

  getProduct(id:any) {
    let Url = this.BaseUrl + "product/" + id;

    return this.http.get(Url);
  }

  contactUs(payload:any) {
    let Url = this.BaseUrl + "message";
    return this.http.post(Url, payload);
  }

  NewRequest(payload:any) {
    let Url = this.BaseUrl + "NewRequest";
    return this.http.post(Url, payload);
  }

  getService(id:any) {
    let Url = this.BaseUrl + "service/" + id;

    return this.http.get(Url);
  }

  getWhatWeDo() {
    return this.whatWeDo;
  }

  getFreePackages() {
    return this.freePackages;
  }

  getGallery() {
    return this.homeGallery;
  }

  getSliders() {
    return this.sliderData;
  }

  getServices() {
    let Url = this.BaseUrl + "services";

    return this.http.get(Url);
  }
}

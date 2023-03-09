import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {
  public news:any[] = [
    {
      id: 1,
      title: "Tips for having a good relationship at work.",
      content: "",
      created_At: "2 Days Ago",
      image: "assets/images/news-1-h.jpg",
      author: "Slammy"
    },
    {
      id: 2,
      title: "Data scientists are a booming profession.",
      content: "",
      created_At: "1 Day Ago",
      image: "assets/images/news-1-h.jpg",
      author: "Slammy"
    },
    {
      id: 3,
      title: "Successful creations using virtual reality.",
      content: "",
      created_At: "4 Day Ago",
      image: "assets/images/news-1-h.jpg",
      author: "Slammy"
    },
    {
      id: 4,
      title: "Is the trend these days working from home?",
      content: "",
      created_At: "4 Day Ago",
      image: "assets/images/news-1-h.jpg",
      author: "Slammy"
    },
    {
      id: 5,
      title: "How digital transformation has changed the world.",
      content: "",
      created_At: "4 Day Ago",
      image: "assets/images/news-1-h.jpg",
      author: "Slammy"
    },

  ]
  constructor() { }

  ngOnInit(): void {
  }

}

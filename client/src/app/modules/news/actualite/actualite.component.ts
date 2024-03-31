import { IdService } from '../../../services/idService/Id.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NewsService } from '../../../services/newsService/news.service';
import { News, NewsResponse } from '../../../interfaces/news.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrl: './actualite.component.scss'
})
export class ActualiteComponent implements OnInit {
  news: News[] = [];

  constructor(private newsService: NewsService, private router: Router, private idService: IdService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((data: NewsResponse) => {
      this.news = data.newsData.map((news: News) => ({
        ...news,
        image: news.image.length > 0 ? ['http://localhost:5000/' + news.image[0].replace(/\\/g, '/')] : []
      }));
    }, (error) => {
      console.error('Error:', error);
    });
  }
  navigateToDetail(newsId: string, title: string) {
  this.idService.setId(newsId);
    this.router.navigate(['/news', title]);
  }
  
}

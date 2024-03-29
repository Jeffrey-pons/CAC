import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NewsService } from '../../services/newsService/news.service';
import { News, NewsResponse } from '../../interfaces/news.interface';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrl: './actualite.component.scss'
})
export class ActualiteComponent implements OnInit {
  news: News[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((data: NewsResponse) => {
      this.news = data.newsData.map((news: News) => ({
        ...news,
        image: news.image.map(img => 'http://localhost:5000/' + img.replace(/\\/g, '/'))
      }));
    }, (error) => {
      console.error('Error:', error);
    });
  }
}

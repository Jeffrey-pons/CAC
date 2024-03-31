import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/newsService/news.service';
import { News, NewsResponse } from '../../../interfaces/news.interface';
import { IdService } from '../../../services/idService/Id.service';

@Component({
  selector: 'app-actualite-details',
  templateUrl: './actualite-details.component.html',
  styleUrls: ['./actualite-details.component.scss']
})
export class ActualiteDetailsComponent implements OnInit, OnDestroy {
  news: any = null;

  constructor(private newsService: NewsService, private route: ActivatedRoute, private idService: IdService) { }

  ngOnInit(): void {
    const id = this.idService.getId();
    if (id) {
      this.newsService.getNewsById(id).subscribe((data: any) => {
        this.news = {
          ...data.news,
          image: data.news.image.map((img: string) => 'http://localhost:5000/' + img.replace(/\\/g, '/'))
        }
      }, (error) => {
        console.error('Error:', error);
      });
    }
  }
  ngOnDestroy(): void {
    this.idService.setId('');
  }
}
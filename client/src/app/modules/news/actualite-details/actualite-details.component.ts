import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/newsService/news.service';
import { News, NewsResponse } from '../../../interfaces/news.interface';

@Component({
  selector: 'app-actualite-details',
  templateUrl: './actualite-details.component.html',
  styleUrls: ['./actualite-details.component.scss']
})
export class ActualiteDetailsComponent implements OnInit {
  news: any = null;

  constructor(private newsService: NewsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('News ID:', id); // Ajoutez cette ligne
      this.newsService.getNewsById(id).subscribe((data: any) => {
        this.news = data.news;
      }, (error) => {
        console.error('Error:', error);
      });
    }
  }
}
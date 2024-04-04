import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/newsService/news.service';
import { IdService } from '../../../services/idService/Id.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-actualite-details',
  templateUrl: './actualite-details.component.html',
  styleUrls: ['./actualite-details.component.scss']
})
export class ActualiteDetailsComponent implements OnInit, OnDestroy {
  news: any = null;
  @Input() new: any;

  constructor(private newsService: NewsService, private route: ActivatedRoute, private idService: IdService, private location: Location) { }

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
  goBack(): void {
    this.location.back();
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  splitDescription(description: string, linesPerBreak: number): { content: string, isImage: boolean }[] {
    const lines = description.split('\n');
    const result: { content: string, isImage: boolean }[] = [];
    let temp = '';

    for (let i = 0; i < lines.length; i++) {
      temp += lines[i] + '\n';

      if ((i + 1) % linesPerBreak === 0 || i === lines.length - 1) {
        result.push({ content: temp, isImage: false });
        temp = '';

        if ((i + 1) % (linesPerBreak * 3) === 0 || i === lines.length - 1) {
          result.push({ content: '', isImage: true });
        }
      }
    }

    return result;
  }


}


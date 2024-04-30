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

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private idService: IdService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.idService.getId();
    if (id) {
      this.newsService.getNewsById(id).subscribe((data: any) => {
        let images: string[] = [];
        if (data.news.image && Array.isArray(data.news.image)) {
          images = data.news.image.map((img: string) => 'http://localhost:5000/' + img.replace(/\\/g, '/'));
        }
        this.news = {
          ...data.news,
          image: images
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

  splitDescription(description: string, linesPerBreak: number): { content: string, isImage: boolean, index: number, isLastImage: boolean }[] {
    const lines = description.split('\n');
    const result: { content: string, isImage: boolean, index: number, isLastImage: boolean }[] = [];
    let imageIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      if (i % linesPerBreak === 0) {
        result.push({ content: lines[i], isImage: false, index: -1, isLastImage: false });
      } else {
        if (i % linesPerBreak === 1) {
          const isLastImage = this.isLastImage(i, linesPerBreak, lines.length);
          result.push({ content: lines[i], isImage: true, index: imageIndex, isLastImage: isLastImage });
          imageIndex++;
        } else {
          result.push({ content: lines[i], isImage: false, index: -1, isLastImage: false });
        }
      }
    }

    return result;
  }

  isLastImage(currentIndex: number, linesPerBreak: number, totalLines: number): boolean {
    const remainingLines = totalLines - currentIndex;
    return remainingLines <= linesPerBreak;
  }



}


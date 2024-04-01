import { Component, ViewEncapsulation, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements AfterViewInit {
  constructor(public loader: LoaderService, public router: Router, private renderer: Renderer2, private el: ElementRef) {

  }
  ngAfterViewInit() {
    let timeout: number;
    this.renderer.listen('window', 'mousemove', (e) => {
      const cursor = this.el.nativeElement.querySelector('#custom-cursor');
      if (cursor) {
        this.renderer.setStyle(cursor, 'left', e.pageX + 'px');
        this.renderer.setStyle(cursor, 'top', e.pageY + 'px');
        this.renderer.setStyle(cursor, 'display', 'block');
        clearTimeout(timeout);
      }
    });
  }
} 
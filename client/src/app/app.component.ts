import { Component, HostListener, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cac';

  @ViewChild('backToTop', { static: false }) backToTop!: ElementRef;

  constructor(private renderer: Renderer2) {}

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  @HostListener('window:scroll', [])
onWindowScroll() {
  if (window.pageYOffset > 700) {
    this.renderer.setStyle(this.backToTop.nativeElement, 'display', 'block');
  } else {
    this.renderer.setStyle(this.backToTop.nativeElement, 'display', 'none');
  }
}

  onTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.backToTop.nativeElement, 'display', 'none');
  }
}
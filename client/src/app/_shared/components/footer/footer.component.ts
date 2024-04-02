import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor() {}

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      this.scrollToTop();
    }
  }
}

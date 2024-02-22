import { Component } from '@angular/core';
import { ScrollService } from '../../../services/scrollservice/scroll.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(private scrollService: ScrollService) {}

  scrollToTop() {
    this.scrollService.scrollToTop();
  }
}

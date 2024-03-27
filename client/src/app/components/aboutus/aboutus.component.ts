import { Component } from '@angular/core';
import { OnClickService } from '../../utils/onClick.utils';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  showImage: boolean = false;
  selectedImageSrc: string = '';

  constructor( private onClickService: OnClickService) {}

  toggleImage(imageName: string) {
    this.selectedImageSrc = `../../../assets/img/centre-pictures/${imageName}.png`;
    this.showImage = !this.showImage;
  }

  handleFocus() {
    this.onClickService.handleFocus();
  }

  handleBlur() {
    this.onClickService.handleBlur();
  }

  handleClick() {
    this.onClickService.handleClick();
  }

  handleKeyUp(event: KeyboardEvent) {
    this.onClickService.handleKeyUp(event);
  }

  handleKeyDown(event: KeyboardEvent) {
    this.onClickService.handleKeyDown(event);
  }
}

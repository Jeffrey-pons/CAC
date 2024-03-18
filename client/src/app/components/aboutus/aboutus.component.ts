import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  showImage: boolean = false;
  selectedImageSrc: string = '';

  toggleImage(imageName: string) {
    this.selectedImageSrc = `../../../assets/img/centre-pictures/${imageName}.png`;
    this.showImage = !this.showImage;
  }

}

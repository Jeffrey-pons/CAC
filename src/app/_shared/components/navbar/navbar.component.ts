import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isFirstImageHovered: boolean = true;

  handleHover() {
    this.isFirstImageHovered = !this.isFirstImageHovered;
  }

  handleMouseOut() {
    //none
  }
}

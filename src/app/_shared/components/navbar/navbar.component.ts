import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isBackHovered: boolean = false;
  isFrontHovered: boolean = false;

  handleHover() {
    if (!this.isBackHovered) {
      this.isBackHovered = true;
    }
    if (!this.isFrontHovered && this.isBackHovered) {
      this.isFrontHovered = true;
    }
  }

  handleBackMouseOut() {
    if (!this.isFrontHovered) {
      this.isBackHovered = false;
    }
  }

  handleFrontMouseOut() {
    if (!this.isBackHovered) {
      this.isFrontHovered = false;
    }
  }
}

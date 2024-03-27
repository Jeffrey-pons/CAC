import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnClickService {
  constructor() { }

  handleFocus() {
    const element = document.getElementById('');
    if (element !== null) {
      element.classList.add('focused');
    }
  }

  handleBlur() {
    const element = document.getElementById('');
    if (element !== null) {
      element.classList.remove('focused');
    }
  }

  handleClick() {
    this.handleFocus();
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      // none
    }
  }
}

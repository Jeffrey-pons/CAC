import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const links: NodeListOf<Element> = this.el.nativeElement.querySelectorAll('a[id^="register"]');
    const modal: HTMLElement = this.el.nativeElement.querySelector('.modalMember');
    const closeButton: HTMLElement = this.el.nativeElement.querySelector('.close');
    const images: NodeListOf<Element> = this.el.nativeElement.querySelectorAll('.join_cards img');

    const displayModal = () => {
      modal.style.display = 'block';
    };

    const closeModal = () => {
      modal.style.display = 'none';
    };

    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        displayModal();
      });
    });

    closeButton.addEventListener('click', () => {
      closeModal();
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    images.forEach(image => {
      image.addEventListener('click', () => {
        displayModal();
      });
    });
  }
}

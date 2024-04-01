import { Component, ElementRef } from '@angular/core';
import { MemberServiceService } from '../../services/memberService/member-service.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit {
  firstname: string;
  lastname: string;
  adresse: string;
  postaladresse: string;
  city: string;
  country: string;
  email: string;
  type: string;

  constructor(private el: ElementRef, private MemberService: MemberServiceService) {
    this.firstname = '';
    this.lastname = '';
    this.adresse = '';
    this.postaladresse = '';
    this.city = '';
    this.country = '';
    this.email = '';
    this.type = '';
  }

  ngOnInit(): void {
    const links: NodeListOf<Element> = this.el.nativeElement.querySelectorAll('a[id^="register"]');
    const modal: HTMLElement = this.el.nativeElement.querySelector('.modalMember');
    const closeButton: HTMLElement = this.el.nativeElement.querySelector('.close');
    const images: NodeListOf<Element> = this.el.nativeElement.querySelectorAll('.join_cards img');

    const displayModal = () => {
      modal.style.display = 'block';
      modal.classList.add('open');
      document.body.classList.add('noscroll');
    };
    
    const closeModal = () => {
      modal.classList.remove('open');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('noscroll');
        this.resetFormValues();
      }, 100); // correspond à la durée de la transition CSS
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

    images.forEach(image => {
      image.addEventListener('click', () => {
        displayModal();
      });
    });
  }

  submitCreateMemberForm() {
    const formDataMember = {
      firstname: this.firstname,
      lastname: this.lastname,
      adresse: this.adresse,
      postaladresse: this.postaladresse,
      city: this.city,
      country: this.country,
      email: this.email,
      type: this.type
    }
    this.MemberService.createMember(formDataMember).subscribe(
      () => {
        const modalThanks = document.getElementById("ModalThanks");
        if (modalThanks) {
          modalThanks.style.display = "block";
        } else {
          console.error('Element "ModalThanks" not found.');
        }
        this.resetFormValues();
      },
      error => {
        console.error('Erreur lors de la création du membre :', error);
      }
    );
  }

  closeThanksModal() {
    const modalThanks = document.getElementById("ModalThanks");
    const modalMember = document.getElementById("ModalMember");

    if (modalThanks && modalMember) {
      modalThanks.classList.add('closing');
      modalMember.classList.add('closing');

      setTimeout(() => {
        modalThanks.style.display = "none";
        modalMember.style.display = "none";
        document.body.classList.remove('noscroll');
      }, 300);
      this.resetFormValues();
    }
  }

  resetFormValues() {
    this.firstname = '';
    this.lastname = '';
    this.adresse = '';
    this.postaladresse = '';
    this.city = '';
    this.country = '';
    this.email = '';
    this.type = '';
  }
}

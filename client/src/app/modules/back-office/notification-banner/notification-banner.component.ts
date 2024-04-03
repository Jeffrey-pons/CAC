import { Component, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0%)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('500ms ease-out')
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class NotificationBannerComponent implements OnInit {
  message: string = '';

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe(message => {
      this.message = message;
      setTimeout(() => {
        this.message = '';
      }, 4000);
    });
  }
}

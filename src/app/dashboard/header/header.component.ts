import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/services/auth.service';
import {StoreService} from '../../_shared/services/store.service';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';
import { WebSocketService } from 'src/app/_shared/services/web-socket.service';
import { NgZone } from '@angular/core';
import {environment} from '../../../environments/environment';

declare var $;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private storeService: StoreService,
              private webSocketService: WebSocketService,
              private zone: NgZone) { }

  newOrder: boolean;
  newReview: boolean;
  notifNum: number;
  orderNum: number;
  reviewNum: number;

  ngOnInit(): void {
    this.newOrder = false;
    this.notifNum = 0;
    this.orderNum = 0;
    this.reviewNum = 0;
    this.webSocketService.listen('new order').subscribe( (msg) => {
      this.zone.run(() => {
        this.newOrder = true;
        this.notifNum += 1;
        this.orderNum += 1;

        // d1.insertAdjacentHTML('beforeend', '<div id="two">two</div>');
        const element = document.getElementsByClassName('notification-list')[0];
        console.log(element);
        element.insertAdjacentHTML('afterbegin', '<li style="display: flex; justify-content: flex-end;   display: block; padding: 40px 0 5px 5px;'+
        'position: relative; text-decoration: none;'+
        ' color: var(--blue-color); transition: 0.3s all ease-in-out;">' +
        '<a routerLink="/dashboard/sales/orders"'+
        'style="text-decoration: none;transition: 0.3s all; color: var(--blue-color);">'+
        '<i class="fas fa-user-alt mx-2"></i>'+
         'You have new order from' +msg.client.firstname + ' ' + msg.client.lastname +' </a></li>');
      });
    });

    this.webSocketService.listen('new review').subscribe( (msg) => {
      this.zone.run(() => {
        this.newReview = true;
        this.notifNum += 1;
        this.reviewNum += 1;

        const element = document.getElementsByClassName('notification_list')[1];
        element.insertAdjacentHTML('afterbegin', '<li><a routerLink="/dashboard/sales/orders"' +
        'style="display: block; padding: 15px 35px 0px 35px; position: relative; text-decoration: none;transition: 0.3s all; color: var(--blue-color);">' +
        '<i class="fas fa-user-alt mx-2"></i>' +
        'You have new review on your product ' + msg.name + '</a></li>' +
        '<hr class="mt-0 mb-2" style="width: 80%">');
      });
    });
  }

  onEditClick(target: EventTarget): void {
    this.router.navigateByUrl('/' + ( target as HTMLInputElement).value + this.router.url).then(() => {
      window.location.reload();
    });
  }

  openDropDown(): void {
    document.getElementById('dropdown-profile').parentElement.classList.toggle('active');
  }

  openNotification(): void {
    document.getElementById('dropdown-notification').parentElement.classList.toggle('active');
  }

  open(event){
    event.stopPropagation();
    document.getElementById('orders-tab').parentElement.classList.toggle('active');
  }

  logOut(): void{
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  preview() {
    const storeId = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
    this.storeService.getById(storeId).subscribe(store => {
      const url = 'http://' + store.url + environment.urlToPreview;
      window.open(url, '_blank');
    });
  }
}

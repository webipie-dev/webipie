import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/services/auth.service';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';
import { WebSocketService } from 'src/app/_shared/services/web-socket.service';
import { NgZone } from '@angular/core';

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
  notifNum: number;

  ngOnInit(): void {
    this.newOrder = false;
    this.notifNum = 0;
    this.webSocketService.listen('new order').subscribe( (msg) => {
      console.log(msg);
      // this.orders.push(msg);
      this.zone.run(() => {
        this.newOrder = true;
        this.notifNum += 1;


        // d1.insertAdjacentHTML('beforeend', '<div id="two">two</div>');
        const element = document.getElementsByClassName('notification_ul')[0];
        element.insertAdjacentHTML('afterbegin', '<li><a routerLink="/dashboard/sales/orders"> You have new orders</a></li>');
      });
    });
  }

  openDropDown() {
    document.getElementById('dropdown-profile').parentElement.classList.toggle('active');
  }

  openNotification(): void {
    document.getElementById('dropdown-notification').parentElement.classList.toggle('active');
  }

  logOut(): void{
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  preview() {
    const storeId = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
    this.storeService.getById(storeId).subscribe(store => {
      const url = 'http://' + store.url + ':4200';
      window.open(url, '_blank');
    });
  }
}

import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-cart-second-template',
  templateUrl: './cart-second-template.component.html',
  styleUrls: ['./cart-second-template.component.css']
})
export class CartSecondTemplateComponent implements OnInit {
  displayNone = true;
  store: Store;

  constructor(private el: ElementRef,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.store = JSON.parse(sessionStorage.getItem('store'));
    this.storeService.changeTheme(this.el, this.store);
  }
}

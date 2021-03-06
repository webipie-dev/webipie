import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {Product} from '../../_shared/models/product.model';
import {encryptLocalStorage, encryptStorage} from '../../_shared/utils/encrypt-storage';


@Component({
  selector: 'app-header-second-template',
  templateUrl: './header-second-template.component.html',
  styleUrls: ['./header-second-template.component.css']
})
export class HeaderSecondTemplateComponent implements OnInit {
  store: Store;
  cart: {product: Product, quantity: number}[] = encryptLocalStorage.getItem('cart') || [];
  totalPrice = 0;

  constructor(private el: ElementRef,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
    window.addEventListener('message', event => {
      if (event.origin.startsWith('http://webipie.com:4200')) {
        this.storeService.changeColorTheme(this.el, event.data);
      } else { return; }
    });
    this.store = encryptStorage.getItem('store');
    this.storeService.changeTheme(this.el, this.store);
    this.cart.forEach(data => {
      this.totalPrice += +data.product.price;
    });
  }

  deleteProduct(event): void {
    this.cart = this.cart.filter(element => element.product.id !== event.id);
    encryptLocalStorage.setItem('cart', this.cart);

    this.totalPrice = 0;
    this.cart.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });
  }


}

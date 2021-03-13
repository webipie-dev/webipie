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
    this.storeService.cart.subscribe(cart => {
      this.cart = cart;
      cart.forEach(data => {
        this.totalPrice += +data.product.price * data.product.quantity;
      });
    });
    window.addEventListener('message', event => {
      if (event.origin.startsWith('http://webipie.com:4200')) {
        switch (event.data.type) {
          case 'color':
            this.storeService.changeColorTheme(this.el, event.data.subj);
            break;
          case 'font':
            this.storeService.changeFontTheme(this.el, event.data.subj);
            break;
        }
      }
    });
    this.store = encryptStorage.getItem('store');
    this.storeService.changeTheme(this.el, this.store);
    this.cart.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  deleteProduct(event): void {
    this.cart = this.cart.filter(element => element.product.id !== event.id);
    this.storeService.updateCart(this.cart);
    encryptLocalStorage.setItem('cart', this.cart);
    this.totalPrice = 0;
    this.cart.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });
  }
}

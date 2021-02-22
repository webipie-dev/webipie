import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {Product} from '../../_shared/models/product.model';
import {ProductService} from '../../_shared/services/product.service';

@Component({
  selector: 'app-cart-second-template',
  templateUrl: './cart-second-template.component.html',
  styleUrls: ['./cart-second-template.component.css']
})
export class CartSecondTemplateComponent implements OnInit {
  displayNone = true;
  store: Store;
  cart: {product: Product, quantity}[] = JSON.parse(localStorage.getItem('cart')) || [];
  totalPrice = 0;

  products: Product[] = [];


  constructor(private el: ElementRef,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.store = JSON.parse(sessionStorage.getItem('store'));
    this.storeService.changeTheme(this.el, this.store);
    this.cart.forEach(data => {
      this.totalPrice += +data.product.price;
    });
  }

  counter(i: number): Array<number> {
    const count =  [];
    for(let j = 1; count.push(j++) < i;);
    return count;
  }

  deleteProduct(event): void {
    this.cart = this.cart.filter(element => element.product.id !== event.id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

}

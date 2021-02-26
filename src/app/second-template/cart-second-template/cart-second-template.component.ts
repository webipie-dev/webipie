import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {Product} from '../../_shared/models/product.model';
import {Router} from '@angular/router';
import {encryptLocalStorage, encryptStorage} from '../../_shared/utils/encrypt-storage';


@Component({
  selector: 'app-cart-second-template',
  templateUrl: './cart-second-template.component.html',
  styleUrls: ['./cart-second-template.component.css']
})
export class CartSecondTemplateComponent implements OnInit {
  displayNone = true;
  store: Store;
  cart: { product: Product, quantity: number }[] = encryptLocalStorage.getItem('cart') || [];
  totalPrice = 0;

  products: Product[] = [];

  quantity = 1;
  productsQuantity: { product: Product, quantity: number }[] = [];


  constructor(private el: ElementRef,
              private storeService: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store = encryptStorage.getItem('store');
    this.storeService.changeTheme(this.el, this.store);
    this.cart.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });
  }

  counter(i: number): Array<number> {
    const count = [];
    for (let j = 1; count.push(j++) < i;);
    return count;
  }

  deleteProduct(event): void {
    this.cart = this.cart.filter(element => element.product.id !== event.id);
    encryptLocalStorage.setItem('cart', this.cart);

    this.totalPrice = 0;
    this.cart.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });
  }

  check(product: Product, quantity: number) {
    this.cart.forEach(element => {
      if (element.product.id === product.id){
        return {product, quantity};
      }
    });
  }

  saveQuantity(product: Product, event): void {
    let i = 0;
    this.cart.forEach(element => {
      if (element.product.id === product.id){
        this.cart[i] = {product, quantity: event.target.value};
      }
      i++;
    });

    this.productsQuantity.push({product, quantity: event.target.value});
    this.totalPrice = 0;
    this.cart.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });
  }

  save(): void {
    encryptLocalStorage.setItem('cart', this.cart);
    this.router.navigate(['checkout']);
  }

}

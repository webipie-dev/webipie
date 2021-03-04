import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {Product} from '../../_shared/models/product.model';
import {encryptLocalStorage, encryptStorage} from '../../_shared/utils/encrypt-storage';
import { ProductService } from '../../_shared/services/product.service';
import { ConsoleLogger } from '@angular/compiler-cli/src/ngtsc/logging';


@Component({
  selector: 'app-header-second-template',
  templateUrl: './header-second-template.component.html',
  styleUrls: ['./header-second-template.component.css']
})
export class HeaderSecondTemplateComponent implements OnInit {
  store: Store;
  cart: {product: Product, quantity: number}[] = encryptLocalStorage.getItem('cart') || [];
  totalPrice = 0;
  searchTerm: string;

  constructor(private el: ElementRef,
              private storeService: StoreService,
              private productService: ProductService) {
  }

  ngOnInit(): void {

    this.store = encryptStorage.getItem('store');
    this.storeService.changeTheme(this.el, this.store);
    this.cart.forEach(data => {
      this.totalPrice += +data.product.price;
    });
  }

  search(): void{
    this.productService.search({store: this.store.id}, this.searchTerm).subscribe(data => console.log(data));
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

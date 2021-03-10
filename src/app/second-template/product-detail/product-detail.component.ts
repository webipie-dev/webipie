import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from 'src/app/_shared/services/product.service';
import { Review } from '../../_shared/models/review.model';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {Product} from '../../_shared/models/product.model';
import {encryptLocalStorage, encryptStorage} from '../../_shared/utils/encrypt-storage';
import {ExternalFilesService} from '../../_shared/services/external-files.service';
import {log} from "util";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  store: Store;
  product: Product;
  review: Review;


  disabled = false;
  quantity = 1;
  productId = this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private el: ElementRef,
              private externalFilesService: ExternalFilesService) { }

  ngOnInit(): void {
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
      } else { return; }
    });
    const cartData: [{product, quantity}] = encryptLocalStorage.getItem('cart') || [];

    cartData.forEach(data => {
      if (this.productId === data.product.id){
        this.disabled = true;
      }
    });

    this.store = encryptStorage.getItem('store');

    this.review = new Review();
    this.productService.getById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe( data => {
      this.product = data;
      console.log(this.product.description);
      this.externalFilesService.loadScripts();
    });
    this.storeService.changeTheme(this.el, this.store);
  }

  counter(i: number): Array<number> {
    const count =  [];
    for(let j = 1; count.push(j++) < i;);
    return count;
}

  sendReview(): void{
    this.productService.addReview(this.product.id, this.review);
  }

  addToCart(product: Product): void {
    this.disabled = true;
    const cart: [{product: Product, quantity: number}] = encryptLocalStorage.getItem('cart') || [];
    cart.push({product, quantity: this.quantity});
    this.storeService.updateCart(cart);
    encryptLocalStorage.setItem('cart', cart);
  }
}

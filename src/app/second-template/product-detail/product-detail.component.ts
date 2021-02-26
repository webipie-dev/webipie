import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from 'src/app/_shared/services/product.service';
import { Review } from '../../_shared/models/review.model';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {Product} from '../../_shared/models/product.model';

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
              private el: ElementRef) { }

  ngOnInit(): void {
    const cartData: [{product, quantity}] = JSON.parse(localStorage.getItem('cart')) || [];

    cartData.forEach(data => {
      if (this.productId === data.product.id){
        this.disabled = true;
      }
    });

    this.store = JSON.parse(sessionStorage.getItem('store'));

    this.review = new Review();
    this.productService.getById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe( data => {
      this.product = data;
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
    const cart: [{product: Product, quantity: number}] = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({product, quantity: this.quantity});
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem('cart')));
  }


  public loadScript(): void {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }


    if (!isFound) {
      const dynamicScripts = [
        'assets/second-template/js/modernizr.js',
        'assets/second-template/js/jquery-1.11.3.min.js',
        'assets/second-template/js/bootstrap.min.js',
        'assets/second-template/js/own-menu.js',
        'assets/second-template/js/jquery.lighter.js',
        'assets/second-template/js/owl.carousel.min.js',
        'assets/second-template/rs-plugin/js/jquery.tp.t.min.js',
        'assets/second-template/rs-plugin/js/jquery.tp.min.js',
        'assets/second-template/js/main.js',
      ];

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);
      }
    }
  }
}

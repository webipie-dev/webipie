import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from 'src/app/_shared/services/product.service';
import { Review } from '../../_shared/models/review.model';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {Product} from '../../_shared/models/product.model';
import {encryptLocalStorage, encryptStorage} from '../../_shared/utils/encrypt-storage';
import {ExternalFilesService} from '../../_shared/services/external-files.service';


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
  addDisabled = false;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private el: ElementRef,
              private externalFilesService: ExternalFilesService) { }

  ngOnInit(): void {

    this.store = encryptStorage.getItem('store');
    const cartData: [{product, quantity}] = encryptLocalStorage.getItem('cart') || [];

    cartData.forEach(data => {
      if (this.productId === data.product.id){
        this.addDisabled = true;
      }
    });

    this.review = new Review();
    this.productService.getById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe( data => {
      this.product = data;
      this.product.reviews = this.product.reviews.reverse();
      console.log(this.product.reviews);
    });
    this.externalFilesService.loadScripts();
    this.storeService.changeTheme(this.el, this.store);
  }

  counter(i: number): Array<number> {
    const count =  [];
    for(let j = 1; count.push(j++) < i;);
    return count;
}

  sendReview(): void{
    this.productService.addReview(this.product.id, this.review).subscribe(data => {
      const rev: Review = {
        name: this.review.name,
        rating: this.review.rating,
        review: this.review.review,
        email: this.review.email,
        date: new Date(),
      };
      this.product.reviews.push(rev);
      this.disabled = true;

      // clearing form
      // this.review = {
      //   name: '',
      //   rating: 0,
      //   review: '',
      //   email: '',
      //   date: new Date()
      // };
    });
  }

  addToCart(product: Product): void {
    const cart: [{product: Product, quantity: number}] = encryptLocalStorage.getItem('cart') || [];
    cart.push({product, quantity: this.quantity});
    encryptLocalStorage.setItem('cart', cart);
  }
}

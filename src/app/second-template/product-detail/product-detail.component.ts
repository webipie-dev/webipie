import {Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_shared/services/product.service';
import { Review } from '../../_shared/models/review.model';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import {ExternalFilesService} from '../../_shared/services/external-files.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  store: Store;
  product: any;
  review: Review;

  loadAPI: Promise<any>;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService,
              private el: ElementRef,
              private externalFilesService: ExternalFilesService) { }

  ngOnInit(): void {
    this.store = encryptStorage.getItem('store');

    this.review = new Review();
    this.productService.getById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe( data => {
      this.product = data;
      this.externalFilesService.loadScripts();
    });
    this.storeService.changeTheme(this.el, this.store);
  }

  counter(i: number): Array<number> {
    return new Array(i);
}

  sendReview(): void{
    this.productService.addReview(this.product.id, this.review).subscribe(data => {
      console.log(data);
    });
  }
}

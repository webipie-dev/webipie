import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_shared/services/product.service';
import {StoreService} from '../../_shared/services/store.service';
import { Review } from '../../_shared/models/review.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  store;
  product: any;
  review: Review;
  name: string;
  location: string;

  constructor(private storeService: StoreService,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.location = this.activatedRoute.snapshot.paramMap.get('location');
    this.store = JSON.parse(this.storeService.getStore(this.name, this.location));

    this.review = new Review();
    this.productService.getById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe( data => {
      this.product = data;
      // this.productID = this.product._id;
      console.log(data);
      console.log(this.counter(this.product.quantity));

    });

    this.changeTheme();

  }

  hexToRGB(hex, alpha?): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }

  counter(i: number): Array<number> {
    return new Array(i);
}

  changeTheme(): void{
    document.documentElement.style.setProperty('--overlay-color', this.hexToRGB(this.store.template.colorChart[4], 0.75));
    document.documentElement.style.setProperty('--font-choice', this.store.template.font.name);
    console.log(this.hexToRGB(this.store.template.colorChart[4], 0.75));
    console.log(this.store.template.font.name);
  }


  sendReview(): void{
    this.productService.addReview(this.product.id, this.review);
  }
}

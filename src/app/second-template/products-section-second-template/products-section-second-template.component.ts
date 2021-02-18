import {Component, OnInit, ElementRef} from '@angular/core';
import { Product } from '../../_shared/models/product.model';
import { ProductService } from '../../_shared/services/product.service';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-products-section-second-template',
  templateUrl: './products-section-second-template.component.html',
  styleUrls: ['./products-section-second-template.component.css']
})

export class ProductsSectionSecondTemplateComponent implements OnInit{

  constructor(private productService: ProductService,
              private storeService: StoreService,
              private activatedRoute: ActivatedRoute,
              private el: ElementRef) { }
  store;
  popularProducts: Product[];


  ngOnInit(): void {
    this.store = JSON.parse(sessionStorage.getItem('store'));
    this.popularProducts = [];

    this.productService.getAll({store: this.store._id, popular: true}, 'client').subscribe(data => {
      this.popularProducts.push.apply(this.popularProducts, data);
    });

    this.storeService.changeTheme(this.el, this.store);
  }
}

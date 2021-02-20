import {Component, ElementRef, OnInit} from '@angular/core';
import { ProductService } from 'src/app/_shared/services/product.service';
import {Store} from '../../_shared/models/store.model';
import {Product} from '../../_shared/models/product.model';
import {StoreService} from '../../_shared/services/store.service';


@Component({
  selector: 'app-products-all-second-template',
  templateUrl: './products-all-second-template.component.html',
  styleUrls: ['./products-all-second-template.component.css'],

})
export class ProductsAllSecondTemplateComponent implements OnInit {

  store: Store;
  products: Product[];

  constructor(private productService: ProductService,
              private storeService: StoreService,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.store = JSON.parse(sessionStorage.getItem('store'));
    this.products = [];
    this.productService.getAll({store: this.store.id}, 'client').subscribe(data => {
      this.products.push.apply(this.products, data);
    }, error => console.log(error));
    this.storeService.changeTheme(this.el, this.store);
  }
}

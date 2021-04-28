import {Component, ElementRef, OnInit} from '@angular/core';
import { ProductService } from 'src/app/_shared/services/product.service';
import {Store} from '../../_shared/models/store.model';
import {Product} from '../../_shared/models/product.model';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import {websiteDomainName, port, httpProtocol} from 'src/app/configuration';


@Component({
  selector: 'app-products-all-second-template',
  templateUrl: './products-all-second-template.component.html',
  styleUrls: ['./products-all-second-template.component.css'],

})
export class ProductsAllSecondTemplateComponent implements OnInit {

  store: Store;
  products: Product[];
  loading = true;

  constructor(private productService: ProductService,
              private storeService: StoreService,
              private el: ElementRef) { }

  ngOnInit(): void {
    window.addEventListener('message', event => {
      if (event.origin.startsWith(`${httpProtocol}://${websiteDomainName}:${port}`)) {
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
    this.store = encryptStorage.getItem('store');
    this.products = [];
    this.getAllProducts();
    this.storeService.changeTheme(this.el, this.store);
  }

  getAllProducts() {
    this.productService.getAll({store: this.store.id}, 'client').subscribe(data => {
      this.products.push.apply(this.products, data);
      this.loading = false;
    }, error => console.log(error));
  }
}

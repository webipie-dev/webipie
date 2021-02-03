import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ProductService } from 'src/app/_shared/services/product.service';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-products-all-second-template',
  templateUrl: './products-all-second-template.component.html',
  styleUrls: ['./products-all-second-template.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProductsAllSecondTemplateComponent implements OnInit {
  store;
  products: [];
  storeId = '600053ca1181b69010315090';

  constructor(private storeService: StoreService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));

    this.products = [];
    this.productService.getAll(this.storeId, 'client').subscribe(data => {
      this.products.push.apply(this.products, data) ;
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

  changeTheme(): void{
    document.documentElement.style.setProperty('--overlay-color', this.hexToRGB(this.store.template.colorChart[4], 0.75));
    document.documentElement.style.setProperty('--font-choice', this.store.template.font.name);
    console.log(this.hexToRGB(this.store.template.colorChart[4], 0.75));
    console.log(this.store.template.font.name);
  }

}

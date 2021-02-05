import { Component, OnInit, OnChanges, HostListener } from '@angular/core';
import { Product } from '../../_shared/models/product.model';
import { ProductService } from '../../_shared/services/product.service';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';

@Component({
  selector: 'app-products-section-second-template',
  templateUrl: './products-section-second-template.component.html',
  styleUrls: ['./products-section-second-template.component.css']
})
export class ProductsSectionSecondTemplateComponent implements OnInit, OnChanges {

  constructor(private productService: ProductService,
              private storeService: StoreService) { }
  store: Store;
  popularProducts: [];
  storeId = '600053ca1181b69010315090';

  ngOnChanges(): void{
    // this.changeFont();
  }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
    this.popularProducts = [];

    this.productService.getAll({store: this.storeId, popular: true}, 'client').subscribe(data => {
      this.popularProducts.push.apply(this.popularProducts, data) ;
    });

    console.log(this.popularProducts);

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
    this.store.template.font = 'cursive';
    // console.log(this.store.template.font.size + 'px');
    document.documentElement.style.setProperty('--overlay-color', this.hexToRGB(this.store.template.colorChart[4], 0.75));
    document.documentElement.style.setProperty('--font-choice', this.store.template.font);
    console.log(this.hexToRGB(this.store.template.colorChart[4], 0.75));
    console.log(this.store.template.font);
    // document.documentElement.style.setProperty('--secondary-color', secondary);
  }

}

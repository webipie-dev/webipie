import {Component, OnInit, ElementRef} from '@angular/core';
import { Product } from '../../_shared/models/product.model';
import { ProductService } from '../../_shared/services/product.service';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {ActivatedRoute} from '@angular/router';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import {ExternalFilesService} from '../../_shared/services/external-files.service';


@Component({
  selector: 'app-products-section-second-template',
  templateUrl: './products-section-second-template.component.html',
  styleUrls: ['./products-section-second-template.component.css']
})

export class ProductsSectionSecondTemplateComponent implements OnInit{

  constructor(private productService: ProductService,
              private storeService: StoreService,
              private activatedRoute: ActivatedRoute,
              private el: ElementRef,
              private externalFilesService: ExternalFilesService) { }
  
  store: Store;
  popularProducts: Product[];


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
    this.store = encryptStorage.getItem('store');
    this.popularProducts = [];

    this.productService.getAll({store: this.store.id, popular: true}, 'client').subscribe(data => {
      this.popularProducts.push.apply(this.popularProducts, data);
      this.externalFilesService.loadScripts();
    });

    this.storeService.changeTheme(this.el, this.store);
  }
}

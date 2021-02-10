import { Component, OnInit, OnChanges, HostListener } from '@angular/core';
import { Product } from '../../_shared/models/product.model';
import { ProductService } from '../../_shared/services/product.service';
import {StoreService} from '../../_shared/services/store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-section-second-template',
  templateUrl: './products-section-second-template.component.html',
  styleUrls: ['./products-section-second-template.component.css']
})
export class ProductsSectionSecondTemplateComponent implements OnInit{

  constructor(private productService: ProductService,
              private storeService: StoreService,
              private activatedRoute: ActivatedRoute) { }
  store;
  popularProducts: [];
  name: string;
  location: string;


  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.location = this.activatedRoute.snapshot.paramMap.get('location');
    this.store = JSON.parse(this.storeService.getStore(this.name, this.location));

    this.popularProducts = [];

    this.productService.getAll({store: this.store._id, popular: true}, 'client').subscribe(data => {
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
    document.documentElement.style.setProperty('--overlay-color', this.hexToRGB(this.store.template.colorChart[4], 0.75));
    document.documentElement.style.setProperty('--font-choice', this.store.template.font.name);
    console.log(this.hexToRGB(this.store.template.colorChart[4], 0.75));
    console.log(this.store.template.font.name);
    // document.documentElement.style.setProperty('--secondary-color', secondary);
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../../_shared/models/product.model';
import { ProductService } from '../../_shared/services/product.service';

@Component({
  selector: 'app-products-section-second-template',
  templateUrl: './products-section-second-template.component.html',
  styleUrls: ['./products-section-second-template.component.css']
})
export class ProductsSectionSecondTemplateComponent implements OnInit {

  constructor(private productService: ProductService) { }

  description: string;
  popularProducts: [];
  storeId = '600053ca1181b69010315090';

  ngOnInit(): void {
    this.description = 'description here';
    this.popularProducts = [];

    this.productService.getAll(this.storeId, 'client').subscribe(data => {
      this.popularProducts.push.apply(this.popularProducts, data) ;
    });

    console.log(this.popularProducts);
  }

}

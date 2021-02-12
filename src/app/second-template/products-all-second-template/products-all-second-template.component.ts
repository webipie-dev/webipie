import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import { ProductService } from 'src/app/_shared/services/product.service';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import {Product} from '../../_shared/models/product.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products-all-second-template',
  templateUrl: './products-all-second-template.component.html',
  styleUrls: ['./products-all-second-template.component.css'],

})
export class ProductsAllSecondTemplateComponent implements OnInit {

  store: Store;
  products: Product[];
  name: string;
  location: string;

  constructor(private storeService: StoreService,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.parent.params.name;
    this.location = this.activatedRoute.snapshot.parent.params.location;
    this.store = JSON.parse(this.storeService.getStore(this.name, this.location));
    this.products = [];
    this.productService.getAll(this.store.id, 'client').subscribe(data => {
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
    (this.el.nativeElement as HTMLElement).style.setProperty('--bg-color-rgba', this.hexToRGB(this.store.template.colorChart['secondary color'], 0.75));
    (this.el.nativeElement as HTMLElement).style.setProperty('--bg-color', this.store.template.colorChart['bg-color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-color', this.store.template.colorChart['font color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--secondary-color', this.store.template.colorChart['secondary color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-choice', this.store.template.font);
  }

}

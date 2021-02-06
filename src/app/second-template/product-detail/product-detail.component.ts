import {Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_shared/services/product.service';
import {StoreService} from '../../_shared/services/store.service';
import { Review } from '../../_shared/models/review.model';
import {Store} from '../../_shared/models/store.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  store: Store;
  product: any;
  review: Review;
  loadAPI: Promise<any>;
  // productID: any;

  constructor(private storeService: StoreService,
              private productService: ProductService,
              private activatedroute: ActivatedRoute,
              private el: ElementRef) { }

  ngOnInit(): void {
    // this.loadAPI = new Promise((resolve) => {
    //   this.loadScript();
    //   resolve(true);
    // });
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
    this.review = new Review();
    this.productService.getById(this.activatedroute.snapshot.paramMap.get('id')).subscribe( data => {
      this.product = data;
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
    (this.el.nativeElement as HTMLElement).style.setProperty('--bg-color', this.store.template.colorChart['bg-color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-color', this.store.template.colorChart['font color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--secondary-color', this.store.template.colorChart['secondary color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-choice', this.store.template.font);
  }

  sendReview(): void{
    this.productService.addReview(this.product.id, this.review);
  }

  public loadScript() {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const dynamicScripts = [
        'assets/second-template/js/modernizr.js',
        'assets/second-template/js/jquery-1.11.3.min.js',
        'assets/second-template/js/bootstrap.min.js',
        'assets/second-template/js/own-menu.js',
        'assets/second-template/js/jquery.lighter.js',
        'assets/second-template/js/owl.carousel.min.js',
        'assets/second-template/rs-plugin/js/jquery.tp.t.min.js',
        'assets/second-template/rs-plugin/js/jquery.tp.min.js',
        'assets/second-template/js/main.js',
      ];

      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);
      }
    }
  }
}

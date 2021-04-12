import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_shared/models/product.model';
import { ProductService } from 'src/app/_shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { encryptStorage } from 'src/app/_shared/utils/encrypt-storage';
import { Store } from 'src/app/_shared/models/store.model';

@Component({
  selector: 'app-search-second-template',
  templateUrl: './search-second-template.component.html',
  styleUrls: ['./search-second-template.component.css']
})
export class SearchSecondTemplateComponent implements OnInit {

  store: Store;
  products: Product[];
  searchTerm: string;
  listView: boolean;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.listView = true;
    this.store = encryptStorage.getItem('store');
    this.productService.search({store: this.store.id}, this.activatedRoute.snapshot.paramMap.get('term'))
    .subscribe(prods => {
      this.products = prods;
      console.log(prods);
    });
  }

  search(): void{
    this.productService.search({store: this.store.id}, this.activatedRoute.snapshot.paramMap.get('term'))
    .subscribe(data => console.log(data));
  }

  toggleView(type): void{
    console.log(type);
    if (type === 'list'){
      this.listView = true;
    }
    else if (type === 'grid'){
      this.listView = false;
    }
  }
}

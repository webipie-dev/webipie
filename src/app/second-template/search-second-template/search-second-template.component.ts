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
  allproducts: Product[];
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
    this.searchTerm = this.activatedRoute.snapshot.paramMap.get('term');
    this.productService.getAll({store: this.store.id}, 'client').subscribe( prods => {
      this.allproducts = prods;
      this.products = prods.filter(it => {
        return it.name.toLowerCase().includes(this.searchTerm)
            || it.description.toLowerCase().includes(this.searchTerm);
      });
      console.log(this.products);
    });
  }

  search(): void{
    this.products = this.allproducts.filter(it => {
      return it.name.toLowerCase().includes(this.searchTerm)
          || it.description.toLowerCase().includes(this.searchTerm);
    });
    console.log(this.products);

    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigateByUrl('serach/' + this.searchTerm);
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

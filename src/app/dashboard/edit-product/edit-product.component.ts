import {Component, OnInit} from '@angular/core';
import {Product} from '../../_shared/models/product-model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EditProductService} from '../../_shared/services/edit-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private productSub: Subscription;
  productModif: Product;
  singleProduct: Product = new Product();


  constructor(private http: HttpClient,
              private editProductService: EditProductService) {
  }

  ngOnInit(): void {
    this.getProduct();
  }


  getProduct(){
    this.editProductService.getById('5f875b3ab940975b7087477c').subscribe(data => {
      this.singleProduct = data;
      // this.emailString = data.email;
      console.log(data);
    });
  }


  // getProduct() {
  //   this.editProductService.getProductModif('5f875b3ab940975b7087477c');
  //   this.productSub = this.editProductService.getProductUpdateListener()
  //     .subscribe((product: Product) => {
  //       this.productModif = product;
  //     });
  //
  // }

}

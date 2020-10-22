import { Injectable } from '@angular/core';
import {Product} from '../models/product-model';
import {observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GenericService} from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EditProductService extends GenericService<any>{
  productModif: Product;
  private productUpdated = new Subject<Product>();

  constructor(protected http: HttpClient) {
    super(http);

  }



  // getProductModif(id) {
  //   this.http
  //     .get<{ message: string; product: any }>(
  //       `http://localhost:3000/product/${id}`
  //     )
  //     .pipe(map((productData) => {
  //       return productData.product(product => {
  //         return {
  //           _id: product._id,
  //           name: product.name,
  //           description: product.description,
  //           price: product.price,
  //           imgs: product.imgs,
  //           quantity: product.quantity,
  //           store: product.store
  //         };
  //       });
  //     }))
  //     .subscribe(transformedProductModif => {
  //       this.productModif = transformedProductModif;
  //       // this.productUpdated = this.productModif;
  //     });
  // }
  //
  // getProductUpdateListener() {
  //   return this.productUpdated.asObservable();
  // }

}

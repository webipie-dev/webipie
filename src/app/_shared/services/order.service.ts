import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/order';
  }

  public deleteProduct(ids: string, product: string) {
    // ids of the orders
    // product is the product id to be deleted
    const body = {
      ids,
      product
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body
    };
    return this.http.delete(this.getUrl() + this.suffix + '/delete/product', options) as Observable<any>;
  }

  public refundProduct(products) {
    const options = {
      headers: {
        Authorization: localStorage.getItem('token') || ''
      },
    };
    return this.http.patch(this.getUrl() + this.suffix + '/refund/products', {products}, options) as Observable<any>;
  }

}

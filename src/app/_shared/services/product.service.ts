import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/product';
  }
}

import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';
import {Observable, observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GenericService} from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class EditProductService extends GenericService<any> {

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/product';
  }


}


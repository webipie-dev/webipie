import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/store';
  }

  getStore(id: string) {
    if (localStorage.getItem('store') === null || JSON.parse(localStorage.getItem('store'))._id !== id) {
      this.getById(id).subscribe(store => {
        localStorage.setItem('store', JSON.stringify(store));
      });
    }
    return localStorage.getItem('store');
  }
}

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

  // tslint:disable-next-line: typedef
  getStore(name: string, location: string) {


    if (!sessionStorage.getItem('store') ||
     JSON.parse(sessionStorage.getItem('store')).name !== name ||
     JSON.parse(sessionStorage.getItem('store')).contact.location !== location
     ) {
      const httpOptions = {
        headers: { 'Content-Type': 'application/json' },
      };
      this.http.get(this.getUrl() + this.suffix + '/' + name + '/' + location , httpOptions).subscribe(store => {
        sessionStorage.setItem('store', JSON.stringify(store));
      });
    }

    return sessionStorage.getItem('store');
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GenericService} from './generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/product';
  }

  public search(store, searchTerm): Observable<any>{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json'},
      params: store
    };
    return this.http.get(this.getUrl() + this.suffix + '/search/' + searchTerm, httpOptions);
  }

  public addReview(id: string, body): Observable<any> {
    let httpOptions: any;
    if ( localStorage.getItem('token') ){
      httpOptions = {
        headers: { Authorization: localStorage.getItem('token') },
      };
    }
    return this.http.patch(this.getUrl() + this.suffix + '/' + id + '/review', body, httpOptions) as unknown as Observable<any>;
  }

}

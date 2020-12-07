import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {Utils} from './utils';
import {Observable} from 'rxjs';
import {GenericModel} from '../models/generic.model';
import {Utils} from '../utils';

export class GenericService<T extends GenericModel> {

  constructor(protected http: HttpClient) {
  }

  protected suffix = '';

  protected getUrl() {
    return Utils.url;
  }

  public getById(id: string) {
    return this.http.get(this.getUrl() + this.suffix + '/' + id) as Observable<T>;
  }

  public getAll() {
    return this.http.get(this.getUrl() + this.suffix) as Observable<T>;
  }

  public getMany(orderProducts: string[]) {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: { ids: orderProducts}
    };
    return this.http.get(this.getUrl() + this.suffix + '/many', httpOptions) as Observable<T>;
  }

  public addOne(body: T) {
    return this.http.post(this.getUrl() + this.suffix, body) as Observable<T>;
  }

  public edit(body: T) {
    return this.http.patch(this.getUrl() + this.suffix + '/update', body) as Observable<T>;
  }

  public deleteMany(body: T) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body
    };
    return this.http.delete(this.getUrl() + this.suffix, options) as Observable<T>;
  }

  public deleteAll() {
    return this.http.delete(this.getUrl() + this.suffix) as Observable<T>;
  }

}

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
    let params = new HttpParams()
      .set('ids', '5f99a321eaa76827b859f31a');

    return this.http.get(this.getUrl() + this.suffix + '/many' + {params}) as Observable<T>;
  }

  public addOne(body: T) {
    return this.http.post(this.getUrl() + this.suffix, body) as Observable<T>;
  }

  public edit(body: T) {
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // });
    return this.http.patch(this.getUrl() + this.suffix, body) as Observable<T>;
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


  // protected getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders().append('Authorization', 'Bearer ' + token);
  // }

  // protected getUrl() {
  //   return Utils.url + 'municipalities/' + this.getMunicipalityId() + this.suffix;
  // }
  //
  // public getMunicipalityId(): string {
  //   return localStorage.getItem('municipality_id');
  // }
  //
  // public post(body: T) {
  //   return this.http.post(this.getUrl(), body, {headers: this.getHeaders()}) as Observable<T>;
  // }
  //
  // public put(id: string, body: T) {
  //   return this.http.put(this.getUrl() + '/' + id, body, {headers: this.getHeaders()}) as Observable<T>;
  // }
}

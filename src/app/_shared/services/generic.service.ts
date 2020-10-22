import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {Utils} from './utils';
import {Observable} from 'rxjs';
import {GenericModel} from '../models/generic.model';

export class GenericService<T extends GenericModel> {

  constructor(protected http: HttpClient) {
  }

  // protected suffix: string = '';
  //
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
  // public get(): Observable<T[]> {
  //   return this.http.get(this.getUrl(), {headers: this.getHeaders()}) as Observable<T[]>;
  // }

  public getById(id: string) {
    return this.http.get('http://localhost:3000/product/' + id) as Observable<T>;
  }

  // public post(body: T) {
  //   return this.http.post(this.getUrl(), body, {headers: this.getHeaders()}) as Observable<T>;
  // }
  //
  // public put(id: string, body: T) {
  //   return this.http.put(this.getUrl() + '/' + id, body, {headers: this.getHeaders()}) as Observable<T>;
  // }
}

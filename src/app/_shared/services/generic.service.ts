import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
// import {Utils} from './utils';
import {Observable} from 'rxjs';
import {GenericModel} from '../models/generic.model';
import {Utils} from '../utils';

export class GenericService<T extends GenericModel> {

  constructor(protected http: HttpClient) {
  }

  protected suffix = '';

  protected getUrl(): string {
    return Utils.url;
  }

  public getById(id: string): Observable<T> {
    let httpOptions: any;
    if ( localStorage.getItem('token') ){
      httpOptions = {
        headers: { Authorization: localStorage.getItem('token') },
      };
    }
    return this.http.get(this.getUrl() + this.suffix + '/' + id, httpOptions) as unknown as Observable<T>;
  }

  public getAll(query): Observable<T> {
    // query is an object of elements you want to filter the documents with
    const httpOptions = {
      headers: { 'Content-Type': 'application/json', authorization: localStorage.getItem('token')},
      params: query
    };
    return this.http.get(this.getUrl() + this.suffix, httpOptions) as Observable<T>;
  }

  public getMany(arrayIds: string[]): Observable<T> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      query: { ids: arrayIds}
    };
    return this.http.get(this.getUrl() + this.suffix , httpOptions) as Observable<T>;
  }

  public addOne(body: T): Observable<T> {
    let httpOptions: any;
    if ( localStorage.getItem('token') ){
      httpOptions = {
        headers: { Authorization: localStorage.getItem('token') },
      };
    }
    return this.http.post(this.getUrl() + this.suffix, body, httpOptions) as unknown as Observable<T>;
  }

  public edit(id: string, body: T): Observable<T> {
    let httpOptions: any;
    if ( localStorage.getItem('token') ){
      httpOptions = {
        headers: { Authorization: localStorage.getItem('token') },
      };
    }
    return this.http.patch(this.getUrl() + this.suffix + '/' + id, body, httpOptions) as unknown as Observable<T>;
  }

  public deleteMany(body: {ids: string[]}): Observable<T> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body
    };
    return this.http.delete(this.getUrl() + this.suffix, options) as Observable<T>;
  }

  public deleteAll(): Observable<T> {
    return this.http.delete(this.getUrl() + this.suffix + '/delete') as Observable<T>;
  }

}

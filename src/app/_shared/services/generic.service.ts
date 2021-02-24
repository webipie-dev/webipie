import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericModel} from '../models/generic.model';
import {Utils} from '../utils';
import Swal from 'sweetalert2';

export class GenericService<T extends GenericModel> {

  deleteModal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  constructor(protected http: HttpClient) {
  }

  protected suffix = '';

  protected getUrl(): string {
    return Utils.url;
  }

  public getById(id: string): Observable<T> {
    let httpOptions: any;
    httpOptions = {
      headers: {
        Authorization: localStorage.getItem('token') || ''
      },
    };
    return this.http.get(this.getUrl() + this.suffix + '/' + id, httpOptions) as unknown as Observable<T>;
  }

  public getAll(query?, role?): Observable<T> {
    // query is an object of elements you want to filter the documents with
    if (!role){
      role = '';
    }
    let httpOptions;
    if (localStorage.getItem('token')){
      httpOptions = {
        headers: { 'Content-Type': 'application/json', authorization: localStorage.getItem('token')},
        params: query
      };
    }
    else{
      httpOptions = {
        headers: { 'Content-Type': 'application/json', role},
        params: query
      };
    }

    return this.http.get(this.getUrl() + this.suffix, httpOptions) as unknown as Observable<T>;
  }

  public getMany(arrayIds: string[]): Observable<T> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: { ids: arrayIds}
    };
    return this.http.get(this.getUrl() + this.suffix + '/many', options) as Observable<T>;
  }

  public addOne(body: T): Observable<T> {
    let httpOptions: any;
    httpOptions = {
      headers: {
        Authorization: localStorage.getItem('token') || ''
      },
    };
    return this.http.post(this.getUrl() + this.suffix, body, httpOptions) as unknown as Observable<T>;
  }

  public edit(id: string, body: T): Observable<T> {
    let httpOptions: any;
    httpOptions = {
      headers: {
        Authorization: localStorage.getItem('token') || ''
      },
    };
    return this.http.patch(this.getUrl() + this.suffix + '/' + id, body, httpOptions) as unknown as Observable<T>;
  }

  public deleteMany(body: {ids: string[]}): Observable<T> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') || ''
      }),
      body
    };
    return this.http.delete(this.getUrl() + this.suffix, options) as Observable<T>;
  }

  public deleteAll(): Observable<T> {
    let httpOptions: any;
    httpOptions = {
        headers: {
          Authorization: localStorage.getItem('token') || ''
        },
      };
    return this.http.delete(this.getUrl() + this.suffix + '/delete', httpOptions) as unknown as Observable<T>;
  }

}

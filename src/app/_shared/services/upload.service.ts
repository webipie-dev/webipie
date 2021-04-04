import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends GenericService<any> {

  constructor(protected http: HttpClient) {
    super(http);
  }

  public signedUrl(store): Promise<any>{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json', authorization: localStorage.getItem('token')},
      params: {store: store.name}
    };
    return this.http.get(this.getUrl() + '/upload', httpOptions).toPromise();

  }

  public upload(url, file): Promise<any>{
    const httpOptions = {
      headers: {
        'Content-Type': file.type
      },
    };
    return this.http.put(url, file, httpOptions).toPromise();

  }

}


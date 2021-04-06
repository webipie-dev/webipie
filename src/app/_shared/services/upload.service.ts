import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class UploadService extends GenericService<any> {

  constructor(protected http: HttpClient) {
    super(http);
  }

  public signedUrl(store, fileType): Promise<any>{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json', authorization: localStorage.getItem('token')},
      params: {store: store.name, fileType}
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

  public imageCheckType(fileType): boolean{
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/tiff', 'image/tif', 'image/bmp'].includes(fileType)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong image type, We only support .jpg .jpeg .png .tiff .bmp',
      });
      return false;
    }
    return true;
  }

}


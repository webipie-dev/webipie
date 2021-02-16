import {ElementRef, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Observable} from 'rxjs';
import {Store} from '../models/store.model';

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
        console.log(store);
        sessionStorage.setItem('store', JSON.stringify(store));
      });
    }

    return sessionStorage.getItem('store');
  }

  getStoreByUrl() {
    return new Promise(resolve => {
      this.http.get<Store>(this.getUrl() + this.suffix + '/url/' + window.location.hostname).subscribe( store => {
        if (store){
          sessionStorage.setItem('store', JSON.stringify(store));
        }
        resolve(true);
      });
    });
  }

  changeTheme(el: ElementRef, store: Store) {
    (el.nativeElement as HTMLElement).style.setProperty('--bg-color-rgba', this.hexToRGB(store.template.colorChart['bg-color'], 0.75));
    (el.nativeElement as HTMLElement).style.setProperty('--bg-color', store.template.colorChart['bg-color']);
    (el.nativeElement as HTMLElement).style.setProperty('--font-color', store.template.colorChart['font color']);
    (el.nativeElement as HTMLElement).style.setProperty('--secondary-color', store.template.colorChart['secondary color']);
    (el.nativeElement as HTMLElement).style.setProperty('--font-choice', store.template.font);
  }

  hexToRGB(hex, alpha?): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }
}

import {ElementRef, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Store} from '../models/store.model';
import { encryptStorage } from '../utils/encrypt-storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/store';
  }

  getStoreNames(): Observable<any>{
    return this.http.get(this.getUrl() + this.suffix + '/all/names') as unknown as Observable<any>;
  }

  getStoreByUrl() {
    return new Promise(resolve => {
      if (encryptStorage.getItem('store')?.url === window.location.hostname || window.location.hostname === 'webipie.com') {
        resolve(true);
      }
      this.http.get<Store>(this.getUrl() + this.suffix + '/url/' + window.location.hostname).subscribe( store => {
        if (store){
          encryptStorage.setItem('store', store);
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

  changeColorTheme(el: ElementRef,  colors: any) {
    (el.nativeElement as HTMLElement).style.setProperty('--bg-color-rgba', this.hexToRGB(colors['bg-color'], 0.75));
    (el.nativeElement as HTMLElement).style.setProperty('--bg-color', colors['bg-color']);
    (el.nativeElement as HTMLElement).style.setProperty('--font-color', colors['font color']);
    (el.nativeElement as HTMLElement).style.setProperty('--secondary-color', colors['secondary color']);
    console.log(colors);
    // (el.nativeElement as HTMLElement).style.setProperty('--bg-color-rgba', this.hexToRGB(store.template.colorChart['bg-color'], 0.75));
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

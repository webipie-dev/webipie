import {ElementRef, EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from './generic.service';
import {Store} from '../models/store.model';
import { encryptStorage } from '../utils/encrypt-storage';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {websiteDomainName, port, httpProtocol} from 'src/app/configuration';
import { Format } from '../utils/format';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class StoreService extends GenericService<any>{
  cart: EventEmitter<any> = new EventEmitter();
  constructor(protected http: HttpClient,
              private router: Router) {
    super(http);
    this.suffix = '/store';
  }

  getStoreNames(): Observable<any>{
    return this.http.get(this.getUrl() + this.suffix + '/all/names') as unknown as Observable<any>;
  }

  getStoreUrls(): Observable<any> {
    return this.http.get(this.getUrl() + this.suffix + '/all/urls') as unknown as Observable<any>;
  }

  getStoreByUrl(): Promise<boolean> {
    return new Promise(resolve => {
      if (
        window.location.hostname === 'webipie.com' ||
        window.location.hostname === 'www.webipie.com' ||
        window.location.hostname === encryptStorage.getItem('store')?.url
      ) {
        resolve(true);
      } else {
        this.http.get<Store>(this.getUrl() + this.suffix + '/url/' + window.location.hostname).subscribe( store => {
          if (store){
            encryptStorage.setItem('store', store);
          }
          resolve(true);
        });
      }
    });
  }

  changeTheme(el: ElementRef, store: Store): void {
    (el.nativeElement as HTMLElement).style.setProperty('--bg-color-rgba', this.hexToRGB(store.template.colorChart['bg-color'], 0.75));
    (el.nativeElement as HTMLElement).style.setProperty('--bg-color', store.template.colorChart['bg-color']);
    (el.nativeElement as HTMLElement).style.setProperty('--font-color', store.template.colorChart['font color']);
    (el.nativeElement as HTMLElement).style.setProperty('--secondary-color', store.template.colorChart['secondary color']);
    (el.nativeElement as HTMLElement).style.setProperty('--font-choice', store.template.font);
  }

  // real time color change
  changeColorTheme(el: ElementRef,  colors: any): void {
    (el.nativeElement as HTMLElement).style.setProperty('--bg-color-rgba', this.hexToRGB(colors['bg-color'], 0.75));
    (el.nativeElement as HTMLElement).style.setProperty('--bg-color', colors['bg-color']);
    (el.nativeElement as HTMLElement).style.setProperty('--font-color', colors['font color']);
    (el.nativeElement as HTMLElement).style.setProperty('--secondary-color', colors['secondary color']);
  }

  // real time font change
  changeFontTheme(el: ElementRef,  font: string): void {
    (el.nativeElement as HTMLElement).style.setProperty('--font-choice', font);
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

  updateCart(event): void {
    this.cart.emit(event);
  }

  // submit store edit changes
  onSubmit(storeId: string, postData): void {
    this.edit(storeId, postData).subscribe(store => {

      // send event to store to update sessionStorage
      const subjectToChange = {
        subj: store,
        type: 'store',
      };
      $('#iframe')[0].contentWindow.postMessage(subjectToChange, `${httpProtocol}://store.${websiteDomainName}${Format.fmtPort(port)}/`);

      // update own session storage
      encryptStorage.setItem('store', store);
      this.router.navigateByUrl('/store');

      // notify user successful update
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Saved successfully'
      });
    });
  }
}

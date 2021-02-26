import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalFilesService {

  dynamicScripts = [
    'https://code.jquery.com/jquery-3.2.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
    'assets/second-template/js/modernizr.js',
    'assets/second-template/js/jquery-1.11.3.min.js',
    'assets/second-template/js/bootstrap.min.js',
    'assets/second-template/js/own-menu.js',
    'assets/second-template/js/jquery.lighter.js',
    'assets/second-template/js/owl.carousel.min.js',
    'assets/second-template/rs-plugin/js/jquery.tp.t.min.js',
    'assets/second-template/rs-plugin/js/jquery.tp.min.js',
    'assets/second-template/js/main.js',
  ];

  constructor() {
  }
  public loadScripts() {
    for (const script of this.dynamicScripts) {
      this.loadScript(script);
    }
  }
  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}

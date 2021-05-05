import {Component, HostListener, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NavigationExtras, Router} from '@angular/router';
import {StoreService} from '../_shared/services/store.service';
import {Store} from '../_shared/models/store.model';
import {encryptLocalStorage, encryptStorage} from '../_shared/utils/encrypt-storage';
const { httpProtocol, hostname, port } = require('../configuration');

declare var $: any;
@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})

export class StoreEditComponent implements OnInit {
  urlToPreview: string;
  urlSafe: SafeResourceUrl;
  windowHeight = 0;
  newWidth;
  storeId = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
  store: Store;
  public opened = true;
  public minimized = false;
  public mobileOpen = false;
  public mode = 'push';
  public windwosWidth = window.innerWidth;
  loading = true;

  constructor(public sanitizer: DomSanitizer,
              private router: Router,
              private storeService: StoreService) { }


  ngOnInit(): void {
    if (window.screen.width < 576) {
      this.mode = 'over';
      this.mobileOpen = true;
      this.opened = false;
      this.minimized = false;
    } else {
      this.mode = 'push';
      this.mobileOpen = false;
      this.opened = true;
      this.minimized = false;
    }

    this.storeService.getById(this.storeId).subscribe( store => {
      this.store = store;
      console.log("url")
      console.log(this.store)
      this.urlToPreview = `${httpProtocol}://${store.url}:${port}`
      console.log("urlToPreview" + this.urlToPreview)
      this.urlSafe = this.urlToPreview; //this.sanitizer.bypassSecurityTrustResourceUrl(this.urlToPreview);
      console.log("urlSafe" + this.urlSafe)
      encryptStorage.setItem('store', this.store);
    });
  }

  public uploadDone() {
    this.windowHeight = window.innerHeight;
    this.loading = false;
  }

  public _toggleSidebar(): void {
    this.opened = !this.opened;
    this.minimized = !this.minimized;
  }

  public _toggleBigSidebar(): void {
    this.opened = !this.opened;
  }

  public _closeBigSidebar(): void {
    this.opened = false;
  }

  @HostListener('window:resize') windwosResize() {
    this.windwosWidth = window.innerWidth;
    if (this.windwosWidth < 576) {
      this.mode = 'over';
      this.mobileOpen = true;
      if (this.opened && document.getElementById('toggleMobile')) {
        document.getElementById('toggleMobile').click();
      }

    } else if (this.windwosWidth >= 576) {
      this.mode = 'push';
      this.opened = true;
      this.minimized = false;
      this.mobileOpen = false;

    }
  }


  switchAndToggleS(path): void {
    this.router.navigate([path]);
    this._toggleSidebar();
  }

  toggleS = (): void =>  {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebar-non-active').classList.toggle('active');
    document.getElementById('sidebar-non-active2').classList.toggle('hidden-sidenav');
    document.getElementById('iframe').classList.toggle('margin-iframe');
    document.getElementById('iframe').style.width = this.newWidth.toString();
    if (document.getElementById('sidebar').classList.contains('active')) {
      this.newWidth = window.screen.width - document.getElementById('sidebar-non-active').offsetWidth + 'px';
    } else {
      this.newWidth = window.screen.width - document.getElementById('sidebar').offsetWidth + 'px';
    }
    document.getElementById('iframe').style.width = this.newWidth.toString();
    const event = new CustomEvent('resize');
    document.dispatchEvent(event);
  }
}

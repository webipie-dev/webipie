import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NavigationExtras, Router} from '@angular/router';
import {StoreService} from '../_shared/services/store.service';
import {Store} from '../_shared/models/store.model';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})

export class StoreEditComponent implements OnInit {
  urlToPreview = 'http://localhost:4200/second-template/default-store/ariana';
  urlSafe: SafeResourceUrl;
  windowHeight = window.innerHeight;
  newWidth;
  storeId = '600053ca1181b69010315090';
  store: Store;

  constructor(public sanitizer: DomSanitizer,
              private router: Router,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getById(this.storeId).subscribe( store => {
      this.store = store;
    });
    // this.store = JSON.parse(this.storeService.getById(this.storeId));

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlToPreview);
    if (document.getElementById('sidebar').classList.contains('active')) {
     this.newWidth = window.screen.width - document.getElementById('sidebar-non-active').offsetWidth + 'px';
    } else {
      this.newWidth = window.screen.width - document.getElementById('sidebar').offsetWidth + 'px';
    }
    document.getElementById('iframe').style.width = this.newWidth.toString();
    window.addEventListener('resize', () => {
      if (document.getElementById('sidebar').classList.contains('active')) {
        this.newWidth = window.screen.width - document.getElementById('sidebar-non-active').offsetWidth + 'px';
      } else {
        this.newWidth = window.screen.width - document.getElementById('sidebar').offsetWidth + 'px';
      }
      document.getElementById('iframe').style.width = this.newWidth.toString();
    });
  }

  switchAndToggleS(path): void {
    this.router.navigate([path]);
    this.toggleS();
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

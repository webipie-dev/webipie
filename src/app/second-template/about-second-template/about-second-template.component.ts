import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import {ExternalFilesService} from '../../_shared/services/external-files.service';

@Component({
  selector: 'app-about-second-template',
  templateUrl: './about-second-template.component.html',
  styleUrls: ['./about-second-template.component.css']
})
export class AboutSecondTemplateComponent implements OnInit {
  store: Store;

  constructor(private el: ElementRef,
              private storeService: StoreService) { }

  ngOnInit(): void {
    window.addEventListener('message', event => {
      if (event.origin.startsWith('http://webipie.com:4200')) {
        this.storeService.changeColorTheme(this.el, event.data);
      } else { return; }
    });
    this.store = encryptStorage.getItem('store');
    this.storeService.changeTheme(this.el, this.store);
  }
}

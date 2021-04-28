import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import {websiteDomainName, port, httpProtocol} from 'src/app/configuration';

@Component({
  selector: 'app-about-second-template',
  templateUrl: './about-second-template.component.html',
  styleUrls: ['./about-second-template.component.css']
})
export class AboutSecondTemplateComponent implements OnInit {
  store: Store;
  about: string;

  constructor(private el: ElementRef,
              private storeService: StoreService) { }

  ngOnInit(): void {
    window.addEventListener('message', event => {
      if (event.origin.startsWith(`${httpProtocol}://${websiteDomainName}:${port}`)) {
        switch (event.data.type) {
          case 'color':
            this.storeService.changeColorTheme(this.el, event.data.subj);
            break;
          case 'font':
            this.storeService.changeFontTheme(this.el, event.data.subj);
            break;
          case 'about':
            this.about = event.data.subj;
            break;
        }
      } else { return; }
    });
    this.store = encryptStorage.getItem('store');
    this.about = this.store.about;
    this.storeService.changeTheme(this.el, this.store);
  }
}

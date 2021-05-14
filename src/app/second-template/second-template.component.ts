import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {encryptStorage} from '../_shared/utils/encrypt-storage';
import {Store} from '../_shared/models/store.model';
import {Title} from '@angular/platform-browser';
import {websiteDomainName, port, httpProtocol} from 'src/app/configuration';
import { Format } from '../_shared/utils/format';


@Component({
  selector: 'app-second-template',
  templateUrl: './second-template.component.html',
  styleUrls: ['./second-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecondTemplateComponent implements OnInit {
  store: Store;
  favIcon: HTMLLinkElement = document.querySelector('#appFavicon');
  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.store = encryptStorage.getItem('store');
    this.titleService.setTitle(this.store.name);
    if (this.store.logo) {
      this.favIcon.href = this.store.logo;
    }
    window.addEventListener('message', event => {
      // IMPORTANT: check the origin of the data!
      if (event.origin.startsWith(`${httpProtocol}://${websiteDomainName}${Format.fmtPort(port)}`)) {
        switch (event.data.type) {
          case 'store':
            console.log('i got here');
            encryptStorage.setItem('store', event.data.subj);
            break;
        }
      }
    });
  }
}

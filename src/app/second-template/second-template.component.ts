import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {StoreService} from '../_shared/services/store.service';
import {EncryptStorage} from 'encrypt-storage';
import {encryptStorage} from '../_shared/utils/encrypt-storage';

declare var $: any;
@Component({
  selector: 'app-second-template',
  templateUrl: './second-template.component.html',
  styleUrls: ['./second-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecondTemplateComponent implements OnInit {
  constructor(private el: ElementRef,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
    window.addEventListener('message', event => {
      // IMPORTANT: check the origin of the data!
      if (event.origin.startsWith('http://webipie.com:4200')) {
        switch (event.data.type) {
          case 'store':
            encryptStorage.setItem('store', event.data.subj);
            break;
        }
      }
    });
  }
}

import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';

@Component({
  selector: 'app-footer-second-template',
  templateUrl: './footer-second-template.component.html',
  styleUrls: ['./footer-second-template.component.css']
})
export class FooterSecondTemplateComponent implements OnInit {
  store: Store;
  name: string;
  location: string;

  constructor(private el: ElementRef,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.store = encryptStorage.getItem('store');
    this.storeService.changeTheme(this.el, this.store);
  }
}

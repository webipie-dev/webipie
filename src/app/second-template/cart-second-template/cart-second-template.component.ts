import {Component, ElementRef, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';

@Component({
  selector: 'app-cart-second-template',
  templateUrl: './cart-second-template.component.html',
  styleUrls: ['./cart-second-template.component.css']
})
export class CartSecondTemplateComponent implements OnInit {
  displayNone = true;
  store: Store;
  rgbaColor: string;

  constructor(private storeService: StoreService,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
    // this.changeTheme();
  }

  changeTheme() {
    (this.el.nativeElement as HTMLElement).style.setProperty('--primary-color', this.store.template.colorChart[4]);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-choice', this.store.template.font.name);
  }
}

import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-cart-second-template',
  templateUrl: './cart-second-template.component.html',
  styleUrls: ['../second-template.component.css']
})
export class CartSecondTemplateComponent implements OnInit {

  displayNone = true;
  store;
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
  }
}

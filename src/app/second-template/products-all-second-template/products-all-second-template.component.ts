import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-products-all-second-template',
  templateUrl: './products-all-second-template.component.html',
  styleUrls: ['./products-all-second-template.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProductsAllSecondTemplateComponent implements OnInit {
  store;
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
  }

}

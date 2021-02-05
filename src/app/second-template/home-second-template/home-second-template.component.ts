import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';

@Component({
  selector: 'app-home-second-template',
  templateUrl: './home-second-template.component.html',
  styleUrls: ['./home-second-template.component.css']
})
export class HomeSecondTemplateComponent implements OnInit {
  store: Store;
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
  }

}

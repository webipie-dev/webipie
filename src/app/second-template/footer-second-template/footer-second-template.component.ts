import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-footer-second-template',
  templateUrl: './footer-second-template.component.html',
  styleUrls: ['./footer-second-template.component.css']
})
export class FooterSecondTemplateComponent implements OnInit {
  store;
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
  }
}

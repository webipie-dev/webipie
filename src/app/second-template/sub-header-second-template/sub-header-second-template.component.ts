import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-sub-header-second-template',
  templateUrl: './sub-header-second-template.component.html',
  styleUrls: ['./sub-header-second-template.component.css']
})
export class SubHeaderSecondTemplateComponent implements OnInit {

  @Input() fromWhere: string;
  store;
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
  }

}

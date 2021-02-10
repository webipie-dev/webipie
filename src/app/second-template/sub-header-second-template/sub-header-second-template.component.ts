import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-header-second-template',
  templateUrl: './sub-header-second-template.component.html',
  styleUrls: ['./sub-header-second-template.component.css']
})
export class SubHeaderSecondTemplateComponent implements OnInit {

  @Input() fromWhere: string;
  store;
  name: string;
  location: string;

  constructor(private storeService: StoreService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.location = this.activatedRoute.snapshot.paramMap.get('location');
    this.store = JSON.parse(this.storeService.getStore(this.name, this.location));
  }

}

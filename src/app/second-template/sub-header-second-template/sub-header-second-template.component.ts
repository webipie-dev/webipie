import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sub-header-second-template',
  templateUrl: './sub-header-second-template.component.html',
  styleUrls: ['./sub-header-second-template.component.css']
})
export class SubHeaderSecondTemplateComponent implements OnInit {

  @Input() fromWhere: string;
  store: Store;
  name: string;
  location: string;

  constructor(private storeService: StoreService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.parent.params.name;
    this.location = this.activatedRoute.snapshot.parent.params.location;
    this.store = JSON.parse(this.storeService.getStore(this.name, this.location));
  }

}

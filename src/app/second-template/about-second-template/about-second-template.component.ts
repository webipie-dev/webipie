import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-second-template',
  templateUrl: './about-second-template.component.html',
  styleUrls: ['./about-second-template.component.css']
})
export class AboutSecondTemplateComponent implements OnInit {
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

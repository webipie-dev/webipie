import { Component, OnInit, HostBinding } from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.css']
})
export class BannerImageComponent implements OnInit {

  constructor(private storeService: StoreService) {
  }
  /* These attributes should be brought from the backend */
  title;
  description;
  bannerSrc;
  mainButton;
  storeId = '600053ca1181b69010315090';
  ngOnInit(): void {
  }

}


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
  title = 'l\'elegance a deux clics';
  description = 'Decouvrez notre derniere collection';
  bannerSrc = '../../../assets/images/fashion-WPWVGRY.jpg';
  mainButton = 'Visitez';
  ngOnInit(): void {
    this.storeService.getById('5fd09d461bcaf731b40f95fb').subscribe(store => {
      console.log(store);
      this.title = store.template.header.title;
      this.description = store.template.header.description;
      this.mainButton = store.template.header.mainButton;
      this.bannerSrc = store.template.header.img;
    });
  }

}


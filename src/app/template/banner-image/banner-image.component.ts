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
  storeId = '5fe9aa02155d77328c78ae70';
  ngOnInit(): void {
    this.storeService.getById(this.storeId).subscribe(store => {
      this.title = store.template.header.title;
      this.description = store.template.header.description;
      this.mainButton = store.template.header.mainButton;
      this.bannerSrc = store.template.header.img;
      localStorage.setItem('currentStore', JSON.stringify(store));
    });
  }

}


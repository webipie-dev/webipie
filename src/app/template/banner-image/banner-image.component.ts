import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.css']
})
export class BannerImageComponent implements OnInit {

  constructor() {
  }
  /* These attributes should be brought from the backend */
  title = 'l\'elegance a deux clics';
  description = 'Decouvrez notre derniere collection';
  bannerSrc = '../../../assets/images/fashion-WPWVGRY.jpg';
  mainButton = 'Visitez';
  ngOnInit(): void {
  }

}


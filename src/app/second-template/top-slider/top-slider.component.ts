import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.css']
})
export class TopSliderComponent implements OnInit {
  store: Store;

  constructor(private el: ElementRef,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.store = JSON.parse(sessionStorage.getItem('store'));
    this.storeService.changeTheme(this.el, this.store);
  }
}

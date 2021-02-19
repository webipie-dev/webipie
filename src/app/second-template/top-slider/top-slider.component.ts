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
  title: string[];
  partOne: string;
  partTwo: string;

  constructor(private el: ElementRef,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.store = JSON.parse(sessionStorage.getItem('store'));
    this.storeService.changeTheme(this.el, this.store);
    this.title = this.store.template.header.title.split(' ');
    if (this.title.length > 1) {
      this.partOne = this.title.splice(0, this.title.length / 2).join(' ');
      this.partTwo = this.title.join(' ');
    }
  }
}

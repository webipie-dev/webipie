import {Component, ElementRef, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';

@Component({
  selector: 'app-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.css']
})
export class TopSliderComponent implements OnInit {
  store: Store;
  constructor(private storeService: StoreService,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
    this.changeTheme();
  }

  changeTheme() {
    (this.el.nativeElement as HTMLElement).style.setProperty('--primary-color', this.store.template.colorChart[4]);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-choice', this.store.template.font);
  }
}

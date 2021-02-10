import {Component, ElementRef, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.css']
})
export class TopSliderComponent implements OnInit {
  store: Store;
  name: string;
  location: string;

  constructor(private storeService: StoreService,
              private el: ElementRef,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this.location = this.activatedRoute.snapshot.paramMap.get('location');
    this.store = JSON.parse(this.storeService.getStore(this.name, this.location));

    this.changeTheme();
  }

  changeTheme(): void {
    (this.el.nativeElement as HTMLElement).style.setProperty('--primary-color', this.store.template.colorChart[4]);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-choice', this.store.template.font.name);
  }
}

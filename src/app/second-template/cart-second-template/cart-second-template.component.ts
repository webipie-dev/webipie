import {Component, ElementRef, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-second-template',
  templateUrl: './cart-second-template.component.html',
  styleUrls: ['./cart-second-template.component.css']
})
export class CartSecondTemplateComponent implements OnInit {
  displayNone = true;
  store: Store;

  name: string;
  location: string;

  constructor(private storeService: StoreService,
              private el: ElementRef,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.parent.params.name;
    this.location = this.activatedRoute.snapshot.parent.params.location;
    this.store = JSON.parse(this.storeService.getStore(this.name, this.location));
    this.changeTheme();
  }

  changeTheme() {
    (this.el.nativeElement as HTMLElement).style.setProperty('--bg-color', this.store.template.colorChart['bg-color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-color', this.store.template.colorChart['font color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--secondary-color', this.store.template.colorChart['secondary color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-choice', this.store.template.font);
  }
}

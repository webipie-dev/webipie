import {Component, ElementRef, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import {log} from 'util';

@Component({
  selector: 'app-footer-second-template',
  templateUrl: './footer-second-template.component.html',
  styleUrls: ['./footer-second-template.component.css']
})
export class FooterSecondTemplateComponent implements OnInit {
  store: Store;
  constructor(private storeService: StoreService,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
    this.changeTheme();
  }

  changeTheme() {
    (this.el.nativeElement as HTMLElement).style.setProperty('--bg-color', this.store.template.colorChart['bg-color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-color', this.store.template.colorChart['font color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--secondary-color', this.store.template.colorChart['secondary color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-choice', this.store.template.font);
  }
}

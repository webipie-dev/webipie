import {Component, ElementRef, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';

@Component({
  selector: 'app-checkout-second-template',
  templateUrl: './checkout-second-template.component.html',
  styleUrls: ['./checkout-second-template.component.css']
})
export class CheckoutSecondTemplateComponent implements OnInit {
  store: Store;
  rgbaColor: string;

  constructor(private storeService: StoreService,
              private el: ElementRef) {
  }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
    this.changeTheme();
  }

  changeTheme() {
    this.rgbaColor = 'rgba('
      + this.hexToRgb(this.store.template.colorChart['bg-color']).r
      + ', ' + this.hexToRgb(this.store.template.colorChart['bg-color']).g
      + ', ' + this.hexToRgb(this.store.template.colorChart['bg-color']).b
      + ', 0.95)';
    (this.el.nativeElement as HTMLElement).style.setProperty('--bg-color-rgba', this.rgbaColor);
    (this.el.nativeElement as HTMLElement).style.setProperty('--bg-color', this.store.template.colorChart['bg-color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-color', this.store.template.colorChart['font color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--secondary-color', this.store.template.colorChart['secondary color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-choice', this.store.template.font);
  }

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}

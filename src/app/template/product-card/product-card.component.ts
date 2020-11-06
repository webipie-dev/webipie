import {Component, Input, OnInit, HostBinding} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [
    trigger('onHover', [
      state('hover', style({
          transform: 'scale(1.5)'
        })
      ),
      transition('fixed => hover', [
        animate('0.8s')
      ])
    ])
  ]
})
export class ProductCardComponent implements OnInit {

  hover = false;
  fixed = true;
  @Input()src: string;
  constructor() { }

  ngOnInit(): void {
  }

  onImgHover() {
    this.hover = !this.hover;
    this.fixed = !this.fixed;
    if (this.hover) {
      this.src = '../../../assets/images/fashion-WPWVGRY.jpg';
    } else {
      this.src = '../../../assets/images/dress.jpg';
    }
  }

}

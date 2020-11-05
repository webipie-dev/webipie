import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()src: string;
  constructor() { }

  ngOnInit(): void {
  }

  changeImg(state) {
    if (state === 'enter') {
      this.src = '../../../assets/images/fashion-WPWVGRY.jpg'
    }
  }

}

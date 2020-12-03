import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById('cart').addEventListener('click', () => {
      document.querySelector('.shopping-cart').classList.toggle( 'cart-display');
      console.log("hh");
    });

  }

}

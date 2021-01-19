import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-second-template',
  templateUrl: './cart-second-template.component.html',
  styleUrls: ['../second-template.component.css']
})
export class CartSecondTemplateComponent implements OnInit {

  displayNone = true;
  constructor() { }

  ngOnInit(): void {
  }
}

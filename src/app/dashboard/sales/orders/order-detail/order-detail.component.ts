import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  // it contains row elements
  public value;
  editMode = false;
  displayMode = !this.editMode;
  windowWidth = window.screen.width;
  constructor() { }

  ngOnInit(): void {
  }

  onSwitch() {
    this.editMode = !this.editMode;
    this.displayMode = !this.editMode;
  }

  openModal() {
    document.getElementById('order-detail-modal').style.setProperty('display' , 'block' , 'important');
    console.log(document.getElementById('order-detail-modal'));
    console.log(window.screen.width);
  }
}

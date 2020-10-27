import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  // it contains row elements
  public value;
  editMode = false;
  displayMode= !this.editMode;
  constructor() { }

  ngOnInit(): void {
    // console.log("console log " + JSON.stringify(this.value));
  }

  onSwitch() {
    this.editMode = !this.editMode;
    this.displayMode = !this.editMode;
  }

  row() {
    // console.log(this.value);
  }
}

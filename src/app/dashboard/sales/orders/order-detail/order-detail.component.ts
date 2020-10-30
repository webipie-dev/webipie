import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  // it contains row elements
  @Input() value;
  public rowData: any;
  editMode = false;
  displayMode = !this.editMode;
  windowWidth = window.screen.width;
  newVal = {
    _id: ''
  };

  constructor() { }

  ngOnInit(): void {
    // console.log(this.value._id);
  }

  onSwitch() {
    this.editMode = !this.editMode;
    this.displayMode = !this.editMode;
  }

  openModal() {
    document.getElementById('order-detail-modal').style.setProperty('display' , 'block' , 'important');
    console.log(this.rowData._id);
  }
}

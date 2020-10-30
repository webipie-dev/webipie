import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  elements;
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
  }

  onSwitch() {
    this.editMode = !this.editMode;
    this.displayMode = !this.editMode;
  }

  openModal() {
    this.elements = this.rowData;
    console.log(this.elements);
    console.log(this.rowData);
    document.getElementById('order-detail-modal-'+this.rowData._id).style.setProperty('display' , 'block' , 'important');
    console.log(document.getElementById('order-detail-modal-'+this.rowData._id));
  }
}

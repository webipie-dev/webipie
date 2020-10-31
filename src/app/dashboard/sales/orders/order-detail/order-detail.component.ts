import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../../../../_shared/services/order.service';
import {ProductService} from '../../../../_shared/services/product.service';
import {Product} from '../../../../_shared/models/product.model';

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
  orderProducts = ['5f99a32eeaa76827b859f31b', '5f99a321eaa76827b859f31a'];
  newVal = {
    _id: ''
  };

  constructor(private http: HttpClient,
              private orderService: OrderService,
              private prodcutService: ProductService) { }

  ngOnInit(): void {
  }

  onSwitch() {
    this.editMode = !this.editMode;
    this.displayMode = !this.editMode;
  }

  openModal() {
    document.getElementById('order-detail-modal').style.setProperty('display' , 'block' , 'important');
    console.log(this.rowData._id);
    this.prodcutService.getMany(this.orderProducts).subscribe((data) => {
      console.log(data);
    });
    // this.orderService.getById(this.rowData._id).subscribe((data) => {
    //   console.log(data);
    //   this.newVal._id = data._id;
    // });
  }
}

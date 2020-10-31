import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../../../../_shared/services/order.service';
import {ProductService} from '../../../../_shared/services/product.service';
import {Product} from '../../../../_shared/models/product.model';
import {Component, Input, Output,  OnChanges, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  orderProducts = ['5f99a32eeaa76827b859f31b', '5f99a321eaa76827b859f31a'];
  newVal = {
    _id: ''
  };
  closeResult;

  constructor(private http: HttpClient,
              private orderService: OrderService,
              private prodcutService: ProductService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
    document.getElementById('order-detail-modal-'+this.rowData._id).style.setProperty('display' , 'block' , 'important');
    console.log(document.getElementById('order-detail-modal-'+this.rowData._id));
  }
}

import {Component, Input, Output, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../../../../_shared/services/order.service';
import {ProductService} from '../../../../_shared/services/product.service';
import {Product} from '../../../../_shared/models/product.model';
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
  orderProductsIds = [];
  orderProducts: Product[] = [];
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
    this.orderProductsIds = this.rowData.products.map(s => s._id);
    this.prodcutService.getMany(this.orderProductsIds).subscribe((data) => {
      this.orderProducts = data.product;
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
    // this.prodcutService.getMany(this.orderProductsIds).subscribe((data) => {
    //   this.orderProducts = data.product;
    // });
    // this.orderService.getById(this.rowData._id).subscribe((data) => {
    //   console.log(data);
    //   this.newVal._id = data._id;
    // });
    // document.getElementById('order-detail-modal-' + this.rowData._id).style.setProperty('display' , 'block' , 'important');
    // console.log(document.getElementById('order-detail-modal-' + this.rowData._id));
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../_shared/models/product.model';
import {ProductService} from '../../../../_shared/services/product.service';
import {OrderService} from '../../../../_shared/services/order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  elements;
  // it contains row elements
  @Input() value;
  public rowData: any;
  windowWidth = window.screen.width;
  orderProductsIds = [];
  orderProducts: Product[] = [];
  orderProductsQuantity = [];
  newVal = {
    _id: ''
  };
  closeResult;


  constructor(private modalService: NgbModal,
              private prodcutService: ProductService,
              private orderService: OrderService
              ) { }

  ngOnInit(): void {
    console.log("tout");
  }

  open(content) {
    console.log(this.orderProducts);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(this.rowData);
    this.orderProductsIds = this.rowData.products.map(s => s._id);
    this.orderProductsQuantity = this.rowData.products.map(s => s.quantity);
    this.prodcutService.getMany(this.orderProductsIds).subscribe((data) => {
      this.orderProducts = data.product;
    });
  }

  onDeleteProduct(event, prod) {
    if (window.confirm('Are you sure you want to delete?')) {
      const index = this.orderProducts.indexOf(prod);
      const index2 = this.orderProductsIds.indexOf(prod._id);
      this.orderService.deleteProduct(event._id, prod._id).subscribe((data) => {
        if (index > -1 && index2 > -1) {
          this.orderProducts.splice(index, 1);
          this.orderProductsIds.splice(index2, 1);

          this.orderService.getById(event._id).subscribe((datas) => {
            const date = datas.orderDate.split('T');
            this.rowData = {
              _id: datas._id,
              orderDate: date[0] ,
              orderStatus: datas.orderStatus,
              totalPrice: datas.totalPrice,
              paymentMethod: datas.paymentMethod,
              products: datas.products,
              clientId: datas.client._id,
              clientName: datas.client.name,
              store: datas.store,
            };
          });
        }
      });

    }
  }

  private getDismissReason(reason: any): string {
    this.orderProducts = [];
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

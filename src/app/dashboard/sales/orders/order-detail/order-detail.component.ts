import {Component, Input, Output, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../../../../_shared/services/order.service';
import {ProductService} from '../../../../_shared/services/product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Output() someEvent = new EventEmitter();
  @Input() value; // value passed by valuePrepareFunction (in settings orders.component.ts)
  public rowData: any;
  editMode = false;
  displayMode = !this.editMode;
  windowWidth = window.screen.width;
  orderProducts = [];
  orderProductsQuantity = [];
  newVal = {
    _id: ''
  };
  closeResult;

  constructor(private http: HttpClient,
              private orderService: OrderService,
              private prodcutService: ProductService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.editMode = this.value;
    this.displayMode = !this.editMode;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.orderService.getById(this.rowData._id).subscribe((datas) => {
      if (datas) {
        const date = datas.orderDate.split('T');
        let totalprice = 0;
        datas.products.forEach(product => {
          totalprice += product.quantity * product.price;
        });
        this.rowData = {
          _id: datas._id,
          orderDate: date[0],
          orderStatus: datas.orderStatus,
          totalPrice: totalprice,
          paymentMethod: datas.paymentMethod,
          products: datas.products,
          clientId: datas.client._id,
          clientName: datas.client.name,
          store: datas.store,
        };
        this.orderProducts = this.rowData.products;
      }
    });

  }

  onDeleteProduct(event, prod) {
    if (window.confirm('Are you sure you want to delete?')) {
      const index = this.orderProducts.indexOf(prod);
      this.orderService.deleteProduct(event._id, prod._id).subscribe((data) => {
        if (index > -1) {
          // delete the product from displayed products
          this.orderProducts.splice(index, 1);
          // refresh the row data orders
          this.orderService.getById(event._id).subscribe((datas) => {
            const date = datas.orderDate.split('T');
            let totalprice = 0;
            datas.products.forEach(product => {
              totalprice += product.quantity * product.price;
            });
            this.rowData = {
              _id: datas._id,
              orderDate: date[0] ,
              orderStatus: datas.orderStatus,
              totalPrice: totalprice,
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

  onDeleteOrder(orderId: string){
    this.orderService.deleteMany([orderId]).subscribe(data => {
    });
    this.modalService.dismissAll();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard/sales/orders']);
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

  // switch modal mode
  onSwitch() {
    this.editMode = !this.editMode;
    this.displayMode = !this.editMode;
  }
}

import {Component, Input, Output, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../../../../_shared/services/order.service';
import {ProductService} from '../../../../_shared/services/product.service';
import {Product} from '../../../../_shared/models/product.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  elements;
  @Output() someEvent = new EventEmitter();
  @Input() value;
  public rowData: any;
  editMode = false;
  displayMode = !this.editMode;
  windowWidth = window.screen.width;
  orderProductsIds = [];
  orderProducts: Product[] = [];
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
        this.rowData = {
          _id: datas._id,
          orderDate: date[0],
          orderStatus: datas.orderStatus,
          totalPrice: datas.totalPrice,
          paymentMethod: datas.paymentMethod,
          products: datas.products,
          clientId: datas.client._id,
          clientName: datas.client.name,
          store: datas.store,
        };
        console.log(this.rowData);
        this.orderProductsIds = this.rowData.products.map(s => s._id);
        this.orderProductsQuantity = this.rowData.products.map(s => s.quantity);
        this.prodcutService.getMany(this.orderProductsIds).subscribe((data) => {
          this.orderProducts = data.product;
          console.log(this.orderProducts);
        });
      }
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

  onDeleteOrder(orderId: string){
    console.log("khra");
    this.orderService.deleteMany({ids: orderId}).subscribe(data => {
      console.log(data);
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

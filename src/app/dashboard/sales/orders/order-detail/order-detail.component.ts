import {Component, Input, Output, OnChanges, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../../../../_shared/services/order.service';
import {ProductService} from '../../../../_shared/services/product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {EventEmitter} from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Output() updateResult = new EventEmitter();
  @Input() value; // value passed by valuePrepareFunction (in settings orders.component.ts)
  public rowData: any;
  editMode = false;
  displayMode = !this.editMode;
  windowWidth = window.screen.width;
  orderProducts = [];
  orderProductsQuantity = [];
  closeResult;
  orderStatus;
  currentStatus;

  constructor(private http: HttpClient,
              private orderService: OrderService,
              private prodcutService: ProductService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.editMode = this.value;
    this.displayMode = !this.editMode;
    this.currentStatus = this.rowData.orderStatus;
    this.orderStatus = this.rowData.orderStatus;
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.orderService.getById(this.rowData.id).subscribe((datas) => {
      if (datas) {
        const date = datas.orderDate.split('T');
        let totalprice = 0;
        datas.products.forEach(product => {
          totalprice += product.quantity * product.price;
        });
        this.rowData = {
          id: datas.id,
          orderDate: date[0],
          orderStatus: datas.orderStatus,
          totalPrice: totalprice,
          paymentMethod: datas.paymentMethod,
          products: datas.products,
          clientId: datas.client.id,
          clientName: datas.client.firstname,
          store: datas.store,
        };
        this.orderProducts = this.rowData.products;
      }
    });

  }


  onDeleteOrder(orderId: string): void{

    this.orderService.deleteModal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.orderService.deleteMany({ids: [orderId]}).subscribe(data => {
        });
        this.modalService.dismissAll();
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['dashboard/sales/orders']);
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.orderService.deleteModal.fire(
          'Cancelled',
          'Deletion Canceled :)',
          'error'
        );
      }
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
  onSwitch(): void {
    this.rowData.orderStatus = this.orderStatus;
    this.updateResult.emit(this.rowData);
    this.editMode = !this.editMode;
    this.displayMode = !this.editMode;

    this.orderService.edit(this.rowData.id, {orderStatus: this.orderStatus}).subscribe(data => {
      console.log(data);
      // const currentUrl = this.router.url;
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.router.onSameUrlNavigation = 'reload';
      // this.router.navigate([currentUrl]);

      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['dashboard/sales/orders']);
      });
    },
    error => {
      console.log(error);
    });
  }
}


// onDeleteProduct(event, prod): void {
//   if (window.confirm('Are you sure you want to delete?')) {
//     const index = this.orderProducts.indexOf(prod);
//     this.orderService.deleteProduct(event.id, prod.id).subscribe((data) => {
//       if (index > -1) {
//         // delete the product from displayed products
//         this.orderProducts.splice(index, 1);
//         // refresh the row data orders
//         this.orderService.getById(event.id).subscribe((datas) => {
//           const date = datas.orderDate.split('T');
//           let totalprice = 0;
//           datas.products.forEach(product => {
//             totalprice += product.quantity * product.price;
//           });
//           this.rowData = {
//             id: datas.id,
//             orderDate: date[0] ,
//             orderStatus: datas.orderStatus,
//             totalPrice: totalprice,
//             paymentMethod: datas.paymentMethod,
//             products: datas.products,
//             clientId: datas.client.id,
//             clientName: datas.client.name,
//             store: datas.store,
//           };
//         });
//       }
//     });
//
//   }
// }

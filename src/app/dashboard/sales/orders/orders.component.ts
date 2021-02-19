import {Component, OnInit} from '@angular/core';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../../../_shared/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  windowWidth = window.screen.width;
  // settings for the web version of the table
  settings = {
    selectMode: 'multi',
    columns: {
      clientName: {
        title: 'Client',
        width: '20%'
      },
      totalPrice: {
        title: 'Price',
        width: '20%'
      },
      orderDate: {
        title: 'Date',
        width: '20%',
        format: 'short'
      },
      orderStatus: {
        title: 'Status',
        width: '10%'
      },
      details: {
        title: '',
        width: '10%',
        type: 'custom',
        valuePrepareFunction: (cell, row) => {
          this.edit = false;
          return this.edit;
        },
        renderComponent: OrderDetailComponent,
      },
      // edit: {
      //   title: '',
      //   width: '10%',
      //   type: 'custom',
      //   valuePrepareFunction: (cell, row) => {
      //     this.edit = true;
      //     return this.edit;
      //   },
      //   renderComponent: OrderDetailComponent,
      // },

    },
    actions: {
      position: 'right',
      columnTitle: '',
      edit: false,
      add: false,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-alt icon-trash-alt fa-lg cursor-pointer"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Oups, no Data yet !'
  };
  // settings for the mobile & tablet version of the table
  settingsMobile = {
    selectMode: 'multi',
    columns: {
      clientName: {
        title: 'Client',
        width: '50%'
      },
      orderStatus: {
        title: 'Status',
        width: '25%'
      },
      details: {
        title: '',
        width: '25%',
        type: 'custom',
        valuePrepareFunction: (cell, row) => {
          this.edit = false;
          return this.edit;
        },
        renderComponent: OrderDetailComponent,
      },
    },
    actions: false,
    noDataMessage: 'Oups, no Data yet !'
  };
  // boolean value for the modal: edit or display mode
  edit = false;
  orders = [];
  selectedRows = [];
  showDeleteManyButton = false;


  constructor(private http: HttpClient,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.windowWidth = window.screen.width;
    });
    this.getAllOrders();
  }


  getAllOrders(): void {
    this.orderService.getAll({store: localStorage.getItem('storeID')}).subscribe((data) => {
      data.forEach((element) => {
        if (element.store) {
          const date = element.orderDate.split('T');
          let totalPrice = 0;
          element.products.forEach(product => {
            totalPrice += product.quantity * product.price;
          });
          const aux = {
            id: element.id,
            orderDate: date[0],
            orderStatus: element.orderStatus,
            totalPrice,
            paymentMethod: element.paymentMethod,
            products: element.products,
            clientId: element.client.id,
            clientName: element.client.firstname,
            store: element.store,
          };
          this.orders.push(aux);
        }
      });
      this.orders = this.orders.reverse();
    });
  }

  // when selecting multiple rows deleteMany becomes un-disabled
  changeShowDeleteManyButton(): void {
    this.showDeleteManyButton = this.selectedRows.length > 0;
  }

  onDeleteOne(event): void {

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

        this.orderService.deleteMany({ids: event.data.id}).subscribe((data) => {
          // delete the order from orders displayed
          this.orders = this.orders.filter(prod => prod.id !== event.data.id);
          event.confirm.resolve();


        });
        // const index = this.selectedRows.indexOf(event.data);
        // if (index > -1) {
        //   this.selectedRows.splice(index, 1);
        // }
        // this.changeShowDeleteManyButton();

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

  onRowSelect(event): void {
    this.selectedRows = event.selected;
    this.changeShowDeleteManyButton();
  }

  onDeleteMany(): void {

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

        const ids = [];
        this.selectedRows.forEach(elt => {
          ids.push(elt.id);
        });
        ids.forEach(elt => {
          this.orders = this.orders.filter(prod => prod.id !== elt);
        });
        this.orderService.deleteMany({ids}).subscribe(data => {
          this.selectedRows = [];
          this.changeShowDeleteManyButton();
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
}

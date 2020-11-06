import {Component, OnInit} from '@angular/core';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {Order} from '../../../_shared/models/order.model';
import {HttpClient} from '@angular/common/http';
import {ClientService} from '../../../_shared/services/client.service';
import {OrderService} from '../../../_shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  windowWidth = window.screen.width;
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
      edit: {
        title: '',
        width: '10%',
        type: 'custom',
        valuePrepareFunction: (cell, row) => {
          this.edit = true;
          return this.edit;
        },
        renderComponent: OrderDetailComponent,
      },

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

  edit = false;
  orders = [];

  constructor(private http: HttpClient,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    window.addEventListener("resize", () => {
      this.windowWidth = window.screen.width;
    });
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getAll().subscribe((data) => {
      data.orders.forEach((element) => {
        if (element.store) {
          const date = element.orderDate.split('T');
          let aux = {
            _id: element._id,
            orderDate: date[0] ,
            orderStatus: element.orderStatus,
            totalPrice: element.totalPrice,
            paymentMethod: element.paymentMethod,
            products: element.products,
            clientId: element.client._id,
            clientName: element.client.name,
            store: element.store,
          };
          this.orders.push(aux);

        }
      });
    });
  }

  onDetailSelect(event) {
    // console.log('clicked');
    // console.log(event);
  }


  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.orderService.deleteMany({ids: event.data._id}).subscribe((data) => {
        console.log(data);
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}

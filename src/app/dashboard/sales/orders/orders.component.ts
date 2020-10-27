import { Component, OnInit } from '@angular/core';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderEditComponent} from './order-edit/order-edit.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  settings = {
    selectMode: 'multi',
    columns: {
      id: {
        title: 'ID',
        width: '15%'
      },
      orderer: {
        title: 'Orderer',
        width: '20%'
      },
      price: {
        title: 'Price',
        width: '10%'
      },
      date: {
        title: 'Date',
        width: '20%'
      },
      status: {
        title: 'Status',
        width: '10%'
      },
      details: {
        title: '',
        width: '10%',
        type: 'custom',
        valuePrepareFunction: (cell, row) => {
          return row;
        },
        renderComponent: OrderDetailComponent,
      },
      edit: {
        title: '',
        width: '10%',
        type: 'custom',
        valuePrepareFunction: (cell, row) => {
          return row.columnName;
        },
        renderComponent: OrderEditComponent,
      },

    },
    actions: {
      position: 'right',
      columnTitle: '',
      edit: false,
      add: false,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-alt icon-trash-alt mt-3 fa-lg"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Oups, no Data yet !'
  };
  settingsMobile = {
    selectMode: 'multi',
    columns: {
      orderer: {
        title: 'Orderer',
        width: '50%'
      },
      status: {
        title: 'Status',
        width: '25%'
      },
      details: {
        title: '',
        width: '25%',
        type: 'custom',
        valuePrepareFunction: (cell, row) => {
          return row.columnName;
        },
        renderComponent: OrderDetailComponent,
      }
    },
    actions: false,
    noDataMessage: 'Oups, no Data yet !'
  };

  data = [
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    }, {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
    }
];

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  settings = {
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
        title: 'Details',
        type: 'html',
        width: '10%',
        filter: false
      }
    },
    actions: {
      position: 'right',
      columnTitle: ''
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit fa-lg"></i>',
      saveButtonContent: '<i class="fa fa-check fa-lg ml-2"></i>',
      cancelButtonContent:'<i class="fa fa-window-close fa-lg ml-2"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-alt mt-2 fa-lg d-flex float-right"></i>'
    },
    add: {
      addButtonContent: '<i class="fa fa-plus fa-2x ml-2"></i>'
    }
  };
  settingsMobile = {
    columns: {
      id: {
        title: 'ID',
        width: '25%'
      },
      status: {
        title: 'Status',
        width: '20%'
      },
      details: {
        title: 'Details',
        type: 'html',
        width: '20%',
        filter: false
      }
    },
    actions: {
      position: 'right',
      columnTitle: ''
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit fa-lg"></i>',
      saveButtonContent: '<i class="fa fa-check fa-lg ml-2"></i>',
      cancelButtonContent:'<i class="fa fa-window-close fa-lg ml-2"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash-alt mt-2 fa-lg d-flex float-right"></i>'
    },
    add: {
      addButtonContent: '<i class="fa fa-plus fa-2x ml-2"></i>'
    }
  };

  data = [
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    }, {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      orderer: "Leanne Graham",
      price: "20.52",
      date: "20/19/2020",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

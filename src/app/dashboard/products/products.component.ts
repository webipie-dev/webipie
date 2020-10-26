import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductDetailComponent} from './product-detail/product-detail.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  settings = {
    selectMode: 'multi',
    columns: {
      id: {
        title: 'ID',
        width: '10%'
      },
      name: {
        title: 'Name',
        type: 'html',
        width: '30%'
      },
      price: {
        title: 'Price',
        width: '15%'
      },
      stock: {
        title: 'Stock',
        width: '20%'
      },
      status: {
        title: 'Status',
        width: '10%'
      },
    },
    actions: {
      position: 'right',
      columnTitle: '',
      edit: false,
      add: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="fa icon-edit fa-edit ml-2 fa-lg"></i>',
        }
      ]
    },
    delete: {
      deleteButtonContent: '<i class="fa icon-trash-alt fa-trash-alt mt-3 ml-2 fa-lg"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Oups, no Data yet !'
  };
  settingsMobile = {
    selectMode: 'multi',
    columns: {
      select: {
        title: '',
        type: 'html',
        width: '15%',
        filter: false
      },
      name: {
        title: 'Name',
        type: 'html',
        width: '60%'
      },
      details: {
        title: '',
        width: '25%',
        type: 'custom',
        valuePrepareFunction: (cell, row) => {
          return row.columnName;
        },
        renderComponent: ProductDetailComponent,
      },
    },
    actions: false,
    noDataMessage: 'Oups, no Data yet !'
  };

  data = [
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='img-fluid product-image-table mr-3' src='../../../assets/images/dress.jpg'>" +
        "<p class='small-titles my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='img-fluid product-image-table mr-3' src='../../../assets/images/dress.jpg'>" +
        "<p class='small-titles my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
    },
    {
      select: "<input type='checkbox'>",
      id: 1,
      name: "<div class='row'>" +
        "<img class='img-fluid product-image-table mr-3' src='../../../assets/images/dress.jpg'>" +
        "<p class='small-titles my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='img-fluid product-image-table mr-3' src='../../../assets/images/dress.jpg'>" +
        "<p class='small-titles my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
    },
  ];

  selectedRows = [];
  constructor() { }

  onRowSelect(event) {
    this.selectedRows = event.selected;
  }

  ngOnInit(): void {
  }

  onDeleteConfirm(event) {
    console.log(event);
    event.confirm.resolve();
    /*if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }*/
  }

  onEditSelect(event) {
    console.log('clicked');
    console.log(event);
  }

}

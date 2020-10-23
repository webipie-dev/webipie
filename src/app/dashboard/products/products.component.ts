import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {logger} from 'codelyzer/util/logger';
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
    actions: false
  };

  data = [
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      select: "<input type='checkbox'>",
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      id: 1,
      name: "<div class='row'>" +
        "<img class='col-md-4 col-12 img-fluid product-image-table upload-images middle-text' src='../../../assets/images/Untitled%20design.png'>" +
        "<p class='col-md-8 col-6 small-titles mx-auto my-auto'>Leanne Graham</p>" +
        "</div>",
      price: "20.52",
      stock: "250",
      status: 'avail',
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    }
  ];
  selectedRows = [];
  constructor() { }

  onRowSelect(event) {
    this.selectedRows = event.selected;
  }

  onUserRowSelect(event): void {
    console.log('hellloo');
    console.log(event);
  }

  ngOnInit(): void {
  }

}

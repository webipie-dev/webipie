import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HttpClient} from '@angular/common/http';
import {OrderService} from '../../_shared/services/order.service';
import {ProductService} from '../../_shared/services/product.service';
import {Product} from '../../_shared/models/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // settings of the web version table
  settings = {
    selectMode: 'multi',
    columns: {
      name: {
        title: 'Name',
        type: 'html',
        width: '30%'
      },
      price: {
        title: 'Price',
        width: '15%'
      },
      quantity: {
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
          title: '<i class="fa icon-edit fa-edit ml-3 fa-lg"></i>',
        }
      ]
    },
    delete: {
      deleteButtonContent: '<i class="fa icon-trash-alt fa-trash-alt mt-3 ml-3 fa-lg"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Oups, no Data yet !'
  };
  // settings of the mobile & tablet version table
  settingsMobile = {
    selectMode: 'multi',
    columns: {
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
  selectedRows = [];
  showDeleteManyButton = false;
  products = [];
  storeId = '600053ca1181b69010315090';

  constructor(private http: HttpClient,
              private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllProducts(this.storeId);
  }

  getAllProducts(store: string): void {
    this.productService.getAll({store}).subscribe((data) => {
      console.log('this is the data');
      let quant;
      let aux;
      data.forEach((element) => {
        console.log(element);
        if (element.quantity > 0) {
          quant = element.quantity;
        } else {
          quant = 0;
        }
        aux = element;
        aux.productName = element.name;
        aux.name = '<div class=\'row\'>' +
          '<img class=\'img-fluid product-image-table mr-3\' src=\'' + element.imgs[0] + '\'>' +
          '<p class=\'small-titles my-auto\'> ' + element.name + '</p>' +
          '</div>';
        aux.quantity = quant;
        this.products.push(aux);
      });
    });
  }

  onRowSelect(event): void {
    this.selectedRows = event.selected;
    this.changeShowDeleteManyButton();
  }

  onDeleteOne(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.productService.deleteMany({ids: [event.data._id]}).subscribe((data) => {
      });
      event.confirm.resolve();
      // delete the product from the displayed products
      const index = this.selectedRows.indexOf(event.data);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      }
      this.changeShowDeleteManyButton();
    } else {
      event.confirm.reject();
    }
  }

  onEditSelect(event): void {
    this.router.navigate(['dashboard', 'product-edit'], {queryParams: {id: event.data._id}});
  }

  onDeleteMany(): void {
    const ids = [];
    this.selectedRows.forEach(elt => {
      ids.push(elt._id);
    });
    ids.forEach(elt => {
      this.products = this.products.filter(prod => prod._id !== elt);
    });
    this.productService.deleteMany({ids}).subscribe(data => {
      this.selectedRows = [];
      this.changeShowDeleteManyButton();
    });
  }

  changeShowDeleteManyButton(): void {
    this.showDeleteManyButton = this.selectedRows.length > 0;
  }
}

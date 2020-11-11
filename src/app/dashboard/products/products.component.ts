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
  selectedRows = [];
  showDeleteManyButton = false;

  products: Product[] = [];

  constructor(private http: HttpClient,
              private productService: ProductService,
              private router: Router) {
  }

  onRowSelect(event) {
    this.selectedRows = event.selected;
    this.showDeleteManyButton = this.selectedRows.length > 0;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAll().subscribe((data) => {
      // console.log(data.products);
      let quant;
      data.products.forEach((element) => {
        if (element.quantity > 0){
          quant = element.quantity;
        } else {
          quant = 0;
        }
        const aux = {
          _id: element._id,
          name: '<div class=\'row\'>' +
        '<img class=\'img-fluid product-image-table mr-3\' src=\'' + element.imgs[0] + '\'>' +
        '<p class=\'small-titles my-auto\'> ' + element.name + '</p>' +
        '</div>',
          description: element.description,
          imgs: element.imgs,
          price: element.price,
          quantity: quant,
          store: element.store,

        };
        this.products.push(aux);
      });
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.productService.deleteMany({ids: event.data._id}).subscribe((data) => {
        console.log(data);
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditSelect(event) {
    this.router.navigate(['dashboard', 'product-edit'], { queryParams: {id: event.data._id} });
  }

  deleteMany() {
    // use the table selectedRows and take the ids from there
  }

}

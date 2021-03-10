import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../_shared/services/product.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';

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
  loading = true;

  constructor(private http: HttpClient,
              private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }


  getAllProducts(): void {
    this.productService.getAll({store: encryptLocalStorage.decryptString(localStorage.getItem('storeID'))}).subscribe((data) => {
      console.log(data);
      let quant;
      let aux;
      data.forEach((element) => {
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
      this.loading = false;
    });
  }

  onRowSelect(event): void {
    this.selectedRows = event.selected;
    this.changeShowDeleteManyButton();
  }

  onDeleteOne(event): void {
    const deleteModal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    deleteModal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteMany({ids: [event.data.id]}).subscribe((data) => {
          event.confirm.resolve();
          // delete the product from the displayed products
          this.products = this.products.filter(prod => prod.id !== event.data.id);
        });
        // const index = this.selectedRows.indexOf(event.data);
        // if (index > -1) {
        //   this.selectedRows.splice(index, 1);
        // }


        deleteModal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        deleteModal.fire(
          'Cancelled',
          'Deletion Canceled :)',
          'error'
        );
      }
    });
  }

  onEditSelect(event): void {
    this.router.navigate(['dashboard', 'product-edit'], {queryParams: {id: event.data.id}});
  }

  onDeleteMany(): void {

    this.productService.deleteModal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        // deleting data
        const ids = [];
        this.selectedRows.forEach(elt => {
          ids.push(elt.id);
        });
        this.productService.deleteMany({ids}).subscribe(data => {
          this.selectedRows = [];
          this.changeShowDeleteManyButton();
        });

        ids.forEach(elt => {
          this.products = this.products.filter(prod => prod.id !== elt);
        });
        // swol popup
        this.productService.deleteModal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (
        /* If canceled */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.productService.deleteModal.fire(
          'Cancelled',
          'Deletion Canceled :)',
          'error'
        );
      }
    });

  }

  changeShowDeleteManyButton(): void {
    this.showDeleteManyButton = this.selectedRows.length > 0;
  }
}

import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../_shared/services/order.service';
import {ClientService} from '../../_shared/services/client.service';
import {ProductService} from '../../_shared/services/product.service';
import {Product} from '../../_shared/models/product.model';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import { encryptLocalStorage } from 'src/app/_shared/utils/encrypt-storage';

declare var $: any;

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor(private orderService: OrderService,
              private clientService: ClientService,
              private productService: ProductService,
              private storeService: StoreService)
  { }

  productLength = 0;
  ordersLength = 0;
  clientsLength = 0;
  popularProduct: Product = new Product();
  popularProdFreq = 0;
  store: Store = new Store();
  isLoading = false;

  ngOnInit(): void {
    this.getClientsLength();
    this.getStore();
  }

  getStore(): void {
    this.storeService.getById(encryptLocalStorage.decryptString(localStorage.getItem('storeID'))).subscribe(data => {
      this.store = data;
    });
  }

  getOrderLength(): void {
    const store = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
    this.orderService.getAll({store}).subscribe((data) => {
      console.log(data);
      const prodArray = [];
      data.forEach(item => {
        item.products.forEach(prod => {
          prodArray.push(prod);
        });
      });
      console.log(prodArray);

      let counter = 0;
      for (let i = 0; i < prodArray.length; i++) {
        // loop through next elements in array to compare calculate frequency of current element
        for (let j = i; j < prodArray.length; j++) {
          if (prodArray[i]._id === prodArray[j]._id) {
            counter++;   // increment counter if it does
          }    // see if element occurs again in the array
          // compare current items frequency with maximum frequency
          if (this.popularProdFreq < counter) {
            this.popularProdFreq = counter;      // if m>mf store m in mf for upcoming elements
            this.popularProduct = prodArray[i];   // store the current element.
          }
        }
        counter = 0;   // make counter 0 for next element.
      }
      console.log(this.popularProdFreq);
      console.log(this.popularProduct);
      this.ordersLength = data.length;
      this.getProductsLength();
    });
  }
  getClientsLength(): void {
    this.isLoading = true;
    const store = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
    this.clientService.getAll({store}).subscribe((data) => {
      console.log(data);
      this.clientsLength = data.length;
      this.getOrderLength();
    });
  }
  getProductsLength(): void {
    const store = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
    console.log(store);
    this.productService.getAll({store}).subscribe((data) => {
      console.log(data);
      this.productLength = data.length;
      $.fn.jQuerySimpleCounter = function( options ) {
        const settings = $.extend({
          start:  0,
          end:    100,
          easing: 'swing',
          duration: 400,
          complete: ''
        }, options );

        const thisElement = $(this);

        $({count: settings.start}).animate({count: settings.end}, {
          duration: settings.duration,
          easing: settings.easing,
          step: function() {
            const mathCount = Math.ceil(this.count);
            thisElement.text(mathCount);
          },
          complete: settings.complete
        });
      };

      $('#clients-number').jQuerySimpleCounter({end: this.clientsLength, duration: 1500});
      $('#orders-number').jQuerySimpleCounter({end: this.ordersLength, duration: 1500});
      $('#products-number').jQuerySimpleCounter({end: this.productLength  , duration: 1500});
      this.isLoading = false;
    });
  }
}

import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import {StoreService} from '../../_shared/services/store.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../_shared/services/client.service';
import {Product} from '../../_shared/models/product.model';
import {OrderService} from '../../_shared/services/order.service';


@Component({
  selector: 'app-checkout-second-template',
  templateUrl: './checkout-second-template.component.html',
  styleUrls: ['./checkout-second-template.component.css']
})
export class CheckoutSecondTemplateComponent implements OnInit {
  store: Store;
  clientForm: FormGroup;

  cart: [{product: Product, quantity}] = JSON.parse(localStorage.getItem('cart')) || [];
  totalPrice = 0;
  constructor(private storeService: StoreService,
              private el: ElementRef,
              private clientService: ClientService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.store = encryptStorage.getItem('store');

    this.clientForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, Validators.required),
    });


    this.storeService.changeTheme(this.el, this.store);

    this.cart.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });
  }

  onSubmit(): void {
    const checkout: [{product: Product, quantity}] = JSON.parse(localStorage.getItem('cart')) || [];
    this.totalPrice = 0;
    checkout.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });

    const postData = new FormData();
    let fullAddress = '';

    // tslint:disable-next-line:forin
    for (const field in this.clientForm.controls) {
      let control = this.clientForm.get(field).value;
      if (typeof control === 'string') {
        control = control.trim();
      }
      const exclude = new Set(['street', 'city', 'state', 'zipcode']);
      if (!exclude.has(field)) {
        if (control) {
          postData.append(field, control);
        }
      }
      else {
        if (control) {
          if (field === 'street') {
            fullAddress += control;
          }
          else { fullAddress += ' ,' + control; }
        }
      }
    }

    postData.append('fullAddress', fullAddress.trim());
    postData.append('storeId', this.store.id);

    this.clientService.addOne(postData).subscribe((data) => {

      const products = checkout.map(element => ({
        id: element.product.id,
        quantity: element.quantity,
        imgs: element.product.imgs,
        name: element.product.name,
        price: element.product.price
      }));

      const ids = checkout.map(element => element.product.id);

      const order = {
        productsOrder: {
          ids,
          products
        },
        clientId: data.id,
        storeId: this.store.id

      };
      console.log('client: ', data);

      this.orderService.addOne(order).subscribe((orderCreated) => {
        console.log('order: ', orderCreated);
      });

    });


    // this.editProductService.edit(id, postData).subscribe(() => {
    //   this.router.navigate(['dashboard/products']);
    // });
  }
}

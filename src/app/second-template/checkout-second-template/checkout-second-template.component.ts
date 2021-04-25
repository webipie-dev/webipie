import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {encryptLocalStorage, encryptStorage} from '../../_shared/utils/encrypt-storage';
import {StoreService} from '../../_shared/services/store.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../_shared/services/client.service';
import {Product} from '../../_shared/models/product.model';
import {OrderService} from '../../_shared/services/order.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-checkout-second-template',
  templateUrl: './checkout-second-template.component.html',
  styleUrls: ['./checkout-second-template.component.css']
})
export class CheckoutSecondTemplateComponent implements OnInit {
  store: Store;
  clientForm: FormGroup;

  cart: [{ product: Product, quantity }] = encryptLocalStorage.getItem('cart') || [];
  totalPrice = 0;
  disabled = false;

  constructor(private storeService: StoreService,
              private el: ElementRef,
              private clientService: ClientService,
              private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit(): void {
    window.addEventListener('message', event => {
      if (event.origin.startsWith('http://webipie.com:4200')) {
        switch (event.data.type) {
          case 'color':
            this.storeService.changeColorTheme(this.el, event.data.subj);
            break;
          case 'font':
            this.storeService.changeFontTheme(this.el, event.data.subj);
            break;
        }
      } else {
        return;
      }
    });
    this.store = encryptStorage.getItem('store');

    this.clientForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      street: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    });


    this.storeService.changeTheme(this.el, this.store);

    this.cart.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });
  }

  get clientFormControl() {
    return this.clientForm.controls;
  }

  onSubmit(): void {
    const checkout: [{ product: Product, quantity }] = encryptLocalStorage.getItem('cart') || [];
    this.totalPrice = 0;
    checkout.forEach(data => {
      this.totalPrice += +data.product.price * data.quantity;
    });

    const postData = {};
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
          postData[field] = control;
        }
      } else {
        if (control) {
          if (field === 'street') {
            fullAddress += control;
          } else {
            fullAddress += ' ,' + control;
          }
        }
      }
    }

    postData['fullAddress'] = fullAddress.trim();
    postData['storeId'] = this.store.id;
    console.log(postData);

    this.clientService.addOne(postData).subscribe((data) => {

      const products = checkout.map(element => ({
        _id: element.product.id,
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

      this.orderService.addOne(order).subscribe((orderCreated) => {
        encryptLocalStorage.setItem('cart', []);
        this.router.navigate(['']);
      });

    });


    // this.editProductService.edit(id, postData).subscribe(() => {
    //   this.router.navigate(['dashboard/products']);
    // });
  }
}

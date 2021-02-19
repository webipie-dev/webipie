import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';

import {StoreService} from '../../_shared/services/store.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../_shared/services/client.service';


@Component({
  selector: 'app-checkout-second-template',
  templateUrl: './checkout-second-template.component.html',
  styleUrls: ['./checkout-second-template.component.css']
})
export class CheckoutSecondTemplateComponent implements OnInit {
  store;
  clientForm: FormGroup;


  constructor(private storeService: StoreService,
              private el: ElementRef,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.store = JSON.parse(sessionStorage.getItem('store'));
    console.log(this.store);

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
  }

  onSubmit(): void {
    const postData = new FormData();
    let fullAddress = '';

    for (const field in this.clientForm.controls) {
      let control = this.clientForm.get(field).value;
      if (typeof control === 'string') {
        control = control.trim();
      }

      if (!['street', 'city', 'state', 'zipcode'].includes(field)) {
        if (control) {
          postData.append(field, control);
          console.log(postData.get(field));
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
      console.log(data);
    });


    // this.editProductService.edit(id, postData).subscribe(() => {
    //   this.router.navigate(['dashboard/products']);
    // });
  }
}

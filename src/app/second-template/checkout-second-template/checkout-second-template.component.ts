import {Component, ElementRef, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import { ActivatedRoute } from '@angular/router';
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

  name: string;
  location: string;

  constructor(private storeService: StoreService,
              private el: ElementRef,
              private activatedRoute: ActivatedRoute,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.parent.params.name;
    this.location = this.activatedRoute.snapshot.parent.params.location;
    this.store = JSON.parse(this.storeService.getStore(this.name, this.location));
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

    this.changeTheme();
  }

  hexToRGB(hex, alpha?): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }

  changeTheme(): void{
    (this.el.nativeElement as HTMLElement).style.setProperty('--bg-color-rgba', this.hexToRGB(this.store.template.colorChart['secondary color'], 0.75));
    (this.el.nativeElement as HTMLElement).style.setProperty('--bg-color', this.store.template.colorChart['bg-color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-color', this.store.template.colorChart['font color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--secondary-color', this.store.template.colorChart['secondary color']);
    (this.el.nativeElement as HTMLElement).style.setProperty('--font-choice', this.store.template.font);
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
    postData.append('storeId', this.store._id);

    this.clientService.addOne(postData).subscribe((data) => {
      console.log(data);
    });


    // this.editProductService.edit(id, postData).subscribe(() => {
    //   this.router.navigate(['dashboard/products']);
    // });
  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';


@Component({
  selector: 'app-change-contact',
  templateUrl: './change-contact.component.html',
  styleUrls: ['./change-contact.component.css']
})
export class ChangeContactComponent implements OnInit {

  defaultEmail = encryptStorage.getItem('store').contact.email;
  initialEmail = encryptStorage.getItem('store').contact.email;
  defaultNumber = encryptStorage.getItem('store').contact.phoneNumber;
  initialNumber = encryptStorage.getItem('store').contact.phoneNumber;
  defaultLocation = encryptStorage.getItem('store').contact.location;
  initialLocation = encryptStorage.getItem('store').contact.location;
  storeId = encryptStorage.getItem('store').id;

  constructor(private http: HttpClient,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
  }

  testChange(): boolean {
    return (this.initialNumber === this.defaultNumber &&
      this.initialLocation === this.defaultLocation &&
      this.initialEmail === this.defaultEmail);
  }
  submit(): void {

    const postData = {
      'contact.location': this.defaultLocation,
      'contact.email': this.defaultEmail,
      'contact.phoneNumber': this.defaultNumber
    };
    this.storeService.edit(this.storeId, postData).subscribe(store => {
      encryptStorage.setItem('store', store);
      this.initialEmail = this.defaultEmail;
      this.initialNumber = this.defaultNumber;
      this.initialLocation = this.defaultLocation;
    });
  }
}

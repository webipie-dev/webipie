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
  defaultNumber = encryptStorage.getItem('store').contact.phoneNumber;
  defaultLocation = encryptStorage.getItem('store').contact.location;
  storeId = encryptStorage.getItem('store').id;



  constructor(private http: HttpClient,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
  }

  submit(): void {

    const postData = {
      'contact.location': this.defaultLocation,
      'contact.email': this.defaultEmail,
      'contact.phoneNumber': this.defaultNumber
    };
    this.storeService.edit(this.storeId, postData).subscribe(store => {
      encryptStorage.setItem('store', store);
    });
  }
}

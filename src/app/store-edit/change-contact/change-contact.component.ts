import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-change-contact',
  templateUrl: './change-contact.component.html',
  styleUrls: ['./change-contact.component.css']
})
export class ChangeContactComponent implements OnInit {

  defaultEmail = JSON.parse(sessionStorage.getItem('store')).contact.email;
  defaultNumber = JSON.parse(sessionStorage.getItem('store')).contact.phoneNumber;
  defaultLocation = JSON.parse(sessionStorage.getItem('store')).contact.location;
  storeId = JSON.parse(sessionStorage.getItem('store'))._id;



  constructor(private http: HttpClient,
              private storeService: StoreService,
              private router: Router) {
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
      sessionStorage.setItem('store', JSON.stringify(store));
    });
  }
}

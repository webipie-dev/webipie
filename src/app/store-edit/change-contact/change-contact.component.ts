import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-change-contact',
  templateUrl: './change-contact.component.html',
  styleUrls: ['./change-contact.component.css']
})
export class ChangeContactComponent implements OnInit {
  defaultEmail = '';
  defaultNumber = '';
  defaultLocation = '';
  storeId = '5fd09d461bcaf731b40f95fb';


  constructor(private http: HttpClient,
              private storeService: StoreService) { }

  ngOnInit(): void {
  }

  submit(): void {
    const postData = {
      ids: this.storeId,
      'contact.location': this.defaultLocation,
      'contact.email': this.defaultEmail,
      'contact.phoneNumber': this.defaultNumber
    };
    this.storeService.edit(postData).subscribe(data => {
      console.log(data);
    });
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {
  defaultFacebook = JSON.parse(localStorage.getItem('currentStore')).contact.facebookPage;
  defaultInstagram = JSON.parse(localStorage.getItem('currentStore')).contact.instagramPage;
  storeId = JSON.parse(localStorage.getItem('currentStore'))._id;

  constructor(private http: HttpClient,
              private storeService: StoreService) {
  }

  @Input() toggleS: () => void;

  ngOnInit(): void {
  }

  submit(): void {
    const postData = {
      'contact.facebookPage': this.defaultFacebook,
      'contact.instagramPage': this.defaultInstagram
    };
    this.storeService.edit(this.storeId, postData).subscribe(store => {
      localStorage.setItem('currentStore', JSON.stringify(store));
    });
  }

}

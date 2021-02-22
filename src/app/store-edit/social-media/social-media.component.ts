import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {
  defaultFacebook = JSON.parse(sessionStorage.getItem('store')).contact.facebookPage;
  initialFacebook = JSON.parse(sessionStorage.getItem('store')).contact.facebookPage;
  defaultInstagram = JSON.parse(sessionStorage.getItem('store')).contact.instagramPage;
  initialInstagram = JSON.parse(sessionStorage.getItem('store')).contact.instagramPage;
  storeId = JSON.parse(sessionStorage.getItem('store'))._id;

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
      sessionStorage.setItem('store', JSON.stringify(store));
      this.initialFacebook = this.defaultFacebook;
      this.initialInstagram = this.defaultInstagram;
    });
  }

}

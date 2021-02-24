import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  defaultFacebook = encryptStorage.getItem('store').contact.facebookPage;
  initialFacebook = encryptStorage.getItem('store').contact.facebookPage;
  defaultInstagram = encryptStorage.getItem('store').contact.instagramPage;
  initialInstagram = encryptStorage.getItem('store').contact.instagramPage;
  storeId = encryptStorage.getItem('store').id;

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
      encryptStorage.setItem('store', store);
      this.initialFacebook = this.defaultFacebook;
      this.initialInstagram = this.defaultInstagram;
    });
  }

}

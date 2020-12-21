import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {
  defaultFacebook = '';
  defaultInstagram = '';
  storeId = '5fd09d461bcaf731b40f95fb';

  constructor(private http: HttpClient,
              private storeService: StoreService) {
  }

  @Input() toggleS: () => void;

  ngOnInit(): void {
  }

  submit(): void {
    const postData = {
      ids: this.storeId,
      'contact.facebookPage': this.defaultFacebook,
      'contact.instagramPage': this.defaultInstagram
    };
    this.storeService.edit(postData).subscribe(data => {
      console.log(data);
    });
  }

}

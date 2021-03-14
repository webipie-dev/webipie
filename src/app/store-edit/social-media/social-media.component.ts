import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  // set initial and default values to test whether the user has made any changes
  // whether we should send modifications to back
  defaultFacebook = encryptStorage.getItem('store').contact.facebookPage;
  initialFacebook = encryptStorage.getItem('store').contact.facebookPage;
  defaultInstagram = encryptStorage.getItem('store').contact.instagramPage;
  initialInstagram = encryptStorage.getItem('store').contact.instagramPage;

  storeId = encryptStorage.getItem('store').id;

  constructor(private http: HttpClient,
              private storeService: StoreService,
              private router: Router) {}

  ngOnInit(): void {}

  submit(): void {
    const postData = {
      'contact.facebookPage': this.defaultFacebook,
      'contact.instagramPage': this.defaultInstagram
    };
    this.initialFacebook = this.defaultFacebook;
    this.initialInstagram = this.defaultInstagram;
    this.storeService.onSubmit(this.storeId, postData);
  }

  testChanges(): boolean {
    return this.initialInstagram === this.defaultInstagram && this.initialFacebook === this.defaultFacebook;
  }

  resetMedia(): void {
    this.defaultFacebook = this.initialFacebook;
    this.defaultInstagram = this.initialInstagram;
  }

  returnToEditStore(): void {
    if (!this.testChanges()) {
      Swal.fire({
        title: 'Be Careful!',
        text: 'You have unsaved changes, Would you continue to discard these changes or save them before proceeding ?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Save Changes',
        denyButtonText: 'Discard Changes'
      }).then(result => {
        if (result.value) {
          this.submit();
        } else {
          Swal.close();
        }
        this.router.navigateByUrl('/store');
      });
    } else {
      this.router.navigateByUrl('/store');
    }
  }
}

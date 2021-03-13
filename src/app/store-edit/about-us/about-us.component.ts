import { Component, OnInit } from '@angular/core';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

declare var $: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  defaultAbout = encryptStorage.getItem('store').about;
  initialAbout = encryptStorage.getItem('store').about;
  storeId = encryptStorage.getItem('store').id;

  constructor(private http: HttpClient,
              private storeService: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  changeAbout(): void {
    const subjectToChange = {
      subj: this.defaultAbout,
      type: 'about',
    };
    console.log(subjectToChange);
    $('#iframe')[0].contentWindow.postMessage(subjectToChange, 'http://store.webipie.com:4200/');
  }

  testChange(): boolean {
    return (this.initialAbout === this.defaultAbout);
  }

  submit(): void {

    const postData = {
      about: this.defaultAbout
    };
    this.storeService.edit(this.storeId, postData).subscribe(store => {
      encryptStorage.setItem('store', store);
      this.initialAbout = this.defaultAbout;
      this.router.navigateByUrl('/store');
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Saved successfully'
      });
    });
  }

  returnToEditStore(): void {
    if (!this.testChange()) {
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

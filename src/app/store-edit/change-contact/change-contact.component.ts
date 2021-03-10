import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import Swal from "sweetalert2";


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
  defaultAbout = encryptStorage.getItem('store').about;
  initialAbout = encryptStorage.getItem('store').about;
  storeId = encryptStorage.getItem('store').id;

  constructor(private http: HttpClient,
              private storeService: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.initialAbout);
    console.log(this.defaultAbout);
  }

  testChange(): boolean {
    return (this.initialNumber === this.defaultNumber &&
      this.initialLocation === this.defaultLocation &&
      this.initialEmail === this.defaultEmail && this.initialAbout === this.defaultAbout);
  }
  submit(): void {

    const postData = {
      'contact.location': this.defaultLocation,
      'contact.email': this.defaultEmail,
      'contact.phoneNumber': this.defaultNumber,
      about: this.defaultAbout
    };
    this.storeService.edit(this.storeId, postData).subscribe(store => {
      encryptStorage.setItem('store', store);
      this.initialEmail = this.defaultEmail;
      this.initialNumber = this.defaultNumber;
      this.initialLocation = this.defaultLocation;
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

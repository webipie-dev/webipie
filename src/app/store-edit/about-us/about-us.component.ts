import { Component, OnInit } from '@angular/core';
import {encryptStorage, encryptLocalStorage} from '../../_shared/utils/encrypt-storage';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {websiteDomainName, port, httpProtocol} from 'src/app/configuration';
import { Format } from 'src/app/_shared/utils/format';
import { Store } from 'src/app/_shared/models/store.model';

declare var $: any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  // set initial and default values to test whether the user has made any changes
  // whether we should send modifications to back
  defaultAbout = encryptStorage.getItem('store').about;
  initialAbout = encryptStorage.getItem('store').about;

  storeId = encryptStorage.getItem('store').id;
  store: Store;


  constructor(private http: HttpClient,
              private storeService: StoreService,
              private router: Router) {}

  ngOnInit(): void {
    this.getStore();
  }

  getStore(): void {
    this.storeService.getById(encryptLocalStorage.decryptString(localStorage.getItem('storeID'))).subscribe(data => {
      this.store = data;
    });
  }

  // real time about change
  changeAbout(data?: string): void {
    const subjectToChange = {
      subj: data || this.defaultAbout,
      type: 'about',
    };
    $('#iframe')[0].contentWindow.postMessage(subjectToChange, `${httpProtocol}://${this.store.url}${Format.fmtPort(port)}/`);
  }

  testChange(): boolean {
    return (this.initialAbout === this.defaultAbout);
  }

  resetAbout(): void {
    this.defaultAbout = this.initialAbout;
    this.changeAbout(this.initialAbout);
  }

  submit(): void {
    const postData = {
      about: this.defaultAbout
    };
    this.initialAbout = this.defaultAbout;
    this.storeService.onSubmit(this.storeId, postData);
  }

  // in case the user changed values and didn't click on save
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
          this.changeAbout(this.initialAbout);
          Swal.close();
        }
        this.router.navigateByUrl('/store');
      });
    } else {
      this.router.navigateByUrl('/store');
    }
  }
}

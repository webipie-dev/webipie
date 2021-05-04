import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../_shared/services/store.service';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';
import { AuthService } from '../../_shared/services/auth.service';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-after-signin',
  templateUrl: './after-signin.component.html',
  styleUrls: ['./after-signin.component.css']
})
export class AfterSigninComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storeService: StoreService,
              private authService: AuthService) { }

  loading = true;
  storeName: string;
  storeType = 'clothes';
  urls: Array<string>;
  invalidName = false;
  nameError: string;

  ngOnInit(): void {
    const templateId = this.route.snapshot.queryParamMap.get('templateId');
    if (!templateId){
      this.router.navigate(['templates']);
    }
    $( document ).ready(() => {
      this.loading = false;
    });
    this.storeService.getStoreUrls().subscribe( data => {
      this.urls = data.map(obj => {
        return obj.url;
      });
      console.log(this.urls);
    });
  }

  onInputFocus(event): void{
    const url = event.target.value.toLowerCase().replace(/\s/g, '').replace(/'/, '') + '.webipie.com';
    if (this.urls.indexOf(url) > -1){
      this.invalidName = true;
      this.nameError = 'Name should be unique';
    }else{
      this.invalidName = false;
      this.nameError = '';
    }
  }

  submit(): void {
    this.route.queryParams.subscribe((params) => {
      const templateId = params.templateId;
      if (localStorage.getItem('token') && !localStorage.getItem('storeID')) {
        this.storeService.addOne({ templateId, name: this.storeName, storeType: this.storeType }).subscribe( store => {
          localStorage.setItem('storeID', encryptLocalStorage.encryptString(store.id));
          console.log('here');
          this.router.navigate(['dashboard']);
        },
        error => {
          let errorMessage = 'An unknown error occurred';

          if (error.error?.errors) {
            errorMessage = error.error.errors[0].message;
          } else if (typeof error.error.errors === 'string') {
            errorMessage = error.error.errors;
          }
          if (errorMessage === 'email must be verified!'){
            localStorage.setItem('storeName', this.storeName);
            localStorage.setItem('storeType', this.storeType);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: errorMessage,
              confirmButtonText: `verify email`,
            }).then((result => {
              this.router.navigate(['confirmation']);
            }));
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: errorMessage,
            });
          }

          return throwError(error);
          // this.router.navigate(['confirmation'], { queryParams: { templateId, storeName: this.storeName, storeType: this.storeType }});
        });
      } else {
        localStorage.setItem('storeName', this.storeName);
        localStorage.setItem('storeType', this.storeType);
        this.router.navigate(['signup'], { queryParams: { templateId, storeName: this.storeName, storeType: this.storeType }});
      }
    });
  }
}

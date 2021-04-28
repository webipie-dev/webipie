import { Component, OnInit, EventEmitter } from '@angular/core';
import {AuthService} from '../../_shared/services/auth.service';
import {StoreOwner} from '../../_shared/models/store_owner.model';

import {SocialAuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import { StoreService } from '../../_shared/services/store.service';
import Swal from 'sweetalert2';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';

declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {

  invalidEmail = false;
  emailError = '';
  invalidPassword = false;
  passwordError = '';
  invalidName = false;
  nameError = '';
  loading = false;
  loadingPage = true;

  constructor(private auth: AuthService,
              private authService: SocialAuthService,
              private router: Router,
              private route: ActivatedRoute,
              private storeService: StoreService) {
  }

  storeOwner: StoreOwner = new StoreOwner();

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }

    const head = document.getElementById('header');
    if (head){
      head.className += ' color-blue-header';
    }

    $( document ).ready(() => {
      this.loadingPage = false;
    });
  }

  signUp(): void{
    this.loading = true;
    this.auth.login(this.storeOwner)
      .subscribe(result => {
          // set token in localStorage
          localStorage.setItem('token', result['token']);

          // params in route
          const templateId = this.route.snapshot.queryParamMap.get('templateId');
          const storeName = this.route.snapshot.queryParamMap.get('storeName');
          const storeType = this.route.snapshot.queryParamMap.get('storeType');
          if (templateId && storeType && storeName){
            this.storeService.addOne({ templateId, name: storeName, storeType }).subscribe(store => {
              localStorage.setItem('storeID', encryptLocalStorage.encryptString(store.id));
            });
            return;
          }

          this.router.navigate(['confirmation']);

          this.loading = false;
      }, err => {
        Swal.fire({
          title: 'Error!',
          text: err.error.errors[0].message,
          icon: 'error',
          confirmButtonText: 'Cool'
        });

        if (err.status === 400) {
          if (err.error.errors[0].message.toLowerCase().indexOf('email') > -1 )
          {
            this.invalidEmail =  true;
            this.emailError = err.error.errors[0].message;
          }
          if (err.error.errors[0].message.toLowerCase().indexOf('password') > -1)
          {
            this.invalidPassword =  true;
            this.passwordError = err.error.errors[0].message;
          }
        }
        if (err.status === 403) {
          this.invalidEmail = true;
          this.emailError = err.error.errors[0].message;
        }
        this.loading = false;
      });
  }

  onInputFocus(event): void{
    if (event.target.id === 'email'){
      const re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/;
      if (re.test(event.target.value) || event.target.value === ''){
        this.invalidEmail = false;
        this.emailError = '';
      }
      else{
        this.invalidEmail = true;
        this.emailError = 'invalid email: should be in form of example@domain.prefix';
      }
    }

    if (event.target.id === 'password'){
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (re.test(event.target.value) || event.target.value === ''){
        this.invalidPassword = false;
        this.passwordError = '';
      }
      else{
        this.invalidPassword = true;
        this.passwordError = 'Password must contain at least 8 characters, with one digit and at least one uppercase and lower case letter';
      }
    }

    if (event.target.id === 'name'){
      const re = /^.{5,}$/;
      if (re.test(event.target.value) || event.target.value === ''){
        this.invalidName = false;
        this.nameError = '';
      }
      else{
        this.invalidName = true;
        this.nameError = 'Name should be minimum 5 caracters';
      }
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(x => {
        this.auth.loginWithFb(x['authToken'])
          .subscribe(result => {
          // set token in localStorage
          localStorage.setItem('token', result['token']);

          // params in route
          const templateId = this.route.snapshot.queryParamMap.get('templateId');
          const storeName = this.route.snapshot.queryParamMap.get('storeName');
          const storeType = this.route.snapshot.queryParamMap.get('storeType');
          if (templateId && storeType && storeName){
            this.storeService.addOne({ templateId, name: storeName, storeType }).subscribe(store => {
              localStorage.setItem('storeID', encryptLocalStorage.encryptString(store.id));
              this.router.navigate(['dashboard']);
            });
            return;
          }
          else{
            this.router.navigate(['templates']);
          }

          this.loading = false;
          });
      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(x => {
        this.auth.loginWithGoogle(x['authToken'])
          .subscribe(result => {
            // set token in localStorage
            localStorage.setItem('token', result['token']);

            // params in route
            const templateId = this.route.snapshot.queryParamMap.get('templateId');
            const storeName = this.route.snapshot.queryParamMap.get('storeName');
            const storeType = this.route.snapshot.queryParamMap.get('storeType');
            if (templateId && storeType && storeName){
              this.storeService.addOne({ templateId, name: storeName, storeType }).subscribe(store => {
                localStorage.setItem('storeID', encryptLocalStorage.encryptString(store.id));
                this.router.navigate(['dashboard']);
              });
              return;
            }
            else{
              this.router.navigate(['templates']);
            }

            this.loading = false;
          });
      });
  }

  navigateToSignIn(): void{
    const templateId = this.route.snapshot.queryParamMap.get('templateId');
    const storeName = this.route.snapshot.queryParamMap.get('storeName');
    const storeType = this.route.snapshot.queryParamMap.get('storeType');
    this.router.navigate(['signin'], { queryParams: { templateId, storeName, storeType }});
  }

}

import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../_shared/services/store.service';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';

declare var $: any;

@Component({
  selector: 'app-after-signin',
  templateUrl: './after-signin.component.html',
  styleUrls: ['./after-signin.component.css']
})
export class AfterSigninComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storeService: StoreService) { }

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
        console.log('here to create store!');
        this.storeService.addOne({ templateId, name: this.storeName, storeType: this.storeType }).subscribe( store => {
          localStorage.setItem('storeID', encryptLocalStorage.encryptString(store.id));
        });
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['signup'], { queryParams: { templateId, storeName: this.storeName, storeType: this.storeType }});
      }
    });
  }
}

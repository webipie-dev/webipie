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
  storeType: string;

  ngOnInit(): void {
    const templateId = this.route.snapshot.queryParamMap.get('templateId');
    if (!templateId){
      this.router.navigate(['templates']);
    }

    $( document ).ready(() => {
      this.loading = false;
    });

    // setTimeout(() => {
    //   this.loading = false;
    // }, 2000);
  }

  submit(): void {
    this.route.queryParams.subscribe((params) => {
      const templateId = params.templateId;

      if ( localStorage.getItem('token') && !encryptLocalStorage.getItem('storeID') ) {
        console.log('here to create store!');
        this.storeService.addOne({ templateId, name: this.storeName, storeType: this.storeType }).subscribe( store => {
          encryptLocalStorage.setItem('storeId', store.id);
        });
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['signup'], { queryParams: { templateId, storeName: this.storeName, storeType: this.storeType }});
      }
    });
  }


}

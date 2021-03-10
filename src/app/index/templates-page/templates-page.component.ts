import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StoreOwner} from '../../_shared/models/store_owner.model';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';

declare var $: any;

@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.css']
})
export class TemplatesPageComponent implements OnInit {
  storeOwnerId = 'storeOwnerId';
  isConnected = true;
  loading = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    $( document ).ready(() => {
      this.loading = false;
    });
  }

  onTemplatePick(templateId): void {
    if ((localStorage.getItem('token') && !localStorage.getItem('storeID')) || !localStorage.getItem('token')) {
      this.router.navigate(['after-signin'], { queryParams: { templateId }});
    } else if (localStorage.getItem('token') && localStorage.getItem('storeID')){
      this.router.navigate(['dashboard'], { queryParams: { templateId }});
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StoreOwner} from '../../_shared/models/store_owner.model';

@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.css']
})
export class TemplatesPageComponent implements OnInit {
  storeOwnerId = 'storeOwnerId';
  isConnected = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onTemplatePick(templateId) {
    if (this.isConnected) {
      this.router.navigate(['dashboard'], { queryParams: { templateId: 'templateId', storeOwner: this.storeOwnerId }});
    } else {
      this.router.navigate(['signup'], { queryParams: {templateId: 'templateId'}});
    }
  }
}

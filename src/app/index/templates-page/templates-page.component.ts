import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StoreOwner} from '../../_shared/models/store_owner.model';
import {DecodeJwtService} from '../../_shared/services/decode-jwt.service';

@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.css']
})
export class TemplatesPageComponent implements OnInit {
  storeOwnerId = 'storeOwnerId';
  isConnected = true;
  constructor(private router: Router,
              private decodeJwtService: DecodeJwtService) { }

  ngOnInit(): void {
  }

  onTemplatePick(templateId) {
    if (this.decodeJwtService.token) {
      this.router.navigate(['after-signin'], { queryParams: { templateId }});
    } else {
      this.router.navigate(['signup'], { queryParams: { templateId }});
    }
  }
}

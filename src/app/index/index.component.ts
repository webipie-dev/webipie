import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {DecodeJwtService} from '../_shared/services/decode-jwt.service';
import {log} from 'util';
import {defaultLogger} from '@angular/cdk/schematics/update-tool/logger';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {

  private fragment: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private vps: ViewportScroller,
              private decodeJwtService: DecodeJwtService) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.route.fragment.subscribe(fragment => {
          this.fragment = fragment;
        });
        this.vps.scrollToAnchor(this.fragment);
      }
    });
  }


  ngOnInit(): void {
  }

  changeRoute() {
    if (!this.decodeJwtService.token || !this.decodeJwtService.decodedToken.storeID) {
      this.router.navigate(['/templates'], {relativeTo: this.route}).then(r => console.log(r));
    }
    else if (this.decodeJwtService.decodedToken.storeID) {
      this.router.navigate(['/dashboard'], {relativeTo: this.route}).then(r => console.log(r));
    }
  }
}

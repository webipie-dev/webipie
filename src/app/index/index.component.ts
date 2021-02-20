import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {log} from 'util';
import {defaultLogger} from '@angular/cdk/schematics/update-tool/logger';
import {encryptLocalStorage} from '../_shared/utils/encrypt-storage';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {

  private fragment: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private vps: ViewportScroller) {
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

  changeRoute(): void {
    if (!localStorage.getItem('token') || !encryptLocalStorage.getItem('storeID')) {
      this.router.navigate(['/templates'], {relativeTo: this.route}).then(r => console.log(r));
    }
    else if (localStorage.getItem('token') && encryptLocalStorage.getItem('storeID')) {
      this.router.navigate(['/dashboard'], {relativeTo: this.route}).then(r => console.log(r));
    }
  }
}

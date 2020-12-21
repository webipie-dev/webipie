import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';

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
          console.log(this.fragment);
        });

        this.vps.scrollToAnchor(this.fragment);
      }
    });
  }


  ngOnInit(): void {
  }


}

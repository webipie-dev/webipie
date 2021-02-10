import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor() {
  }

  public opened = true;
  public minimized = false;
  public mobileOpen = false;
  public mode = 'push';
  public windwosWidth = window.innerWidth;

  public _toggleSidebar(): void {
    this.opened = !this.opened;
    this.minimized = !this.minimized;
  }

  public _toggleBigSidebar(): void {
    this.opened = !this.opened;
  }

  public _closeBigSidebar(): void {
    this.opened = false;
  }



  @HostListener('window:resize') windwosResize() {
    this.windwosWidth = window.innerWidth;
    if (this.windwosWidth < 576) {
      this.mode = 'over';
      this.mobileOpen = true;
      if (this.opened && document.getElementById('toggleMobile')) {
        document.getElementById('toggleMobile').click();
      }

    } else if (this.windwosWidth >= 576) {
      this.mode = 'push';
      this.opened = true;
      this.minimized = false;
      this.mobileOpen = false;

    }
  }

  ngOnInit(): void {
    if (window.screen.width < 576) {
      this.mode = 'over';
      this.mobileOpen = true;
      this.opened = false;
      this.minimized = false;
    } else {
      this.mode = 'push';
      this.mobileOpen = false;
      this.opened = true;
      this.minimized = false;
    }
  }
}

import {Component, Input, OnInit} from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor() { }

  public opened = true;
  public minimized = false;

  public _toggleSidebar(): void {
    this.opened = !this.opened;
    this.minimized = !this.minimized;
  }


  toggleS = (): void =>  {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebar-non-active').classList.toggle('active');
    document.getElementById('sidebar-non-active2').classList.toggle('hidden-sidenav');
    document.getElementById('sidebar-next').classList.toggle('sidenav-next');
  }
  ngOnInit(): void {
  }
}

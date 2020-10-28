import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav-store',
  templateUrl: './sidenav-store.component.html',
  styleUrls: ['./sidenav-store.component.css']
})
export class SidenavStoreComponent implements OnInit {

  constructor() { }
  @Input() toggleS: () => void;

  ngOnInit(): void {
  }

}

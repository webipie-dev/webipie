import {Component, Input, OnInit} from '@angular/core';
import {Utils} from "../../_shared/utils";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor() { }
  @Input() toggleSidenav: () => void;

  ngOnInit(): void {
  }





}

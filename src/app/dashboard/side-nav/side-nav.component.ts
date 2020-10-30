import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Utils} from "../../_shared/utils";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor() {
  }
  windwosWidth;

  @Input() toggleS: () => void;

  @HostListener('window:resize') windwosResize() {
    this.windwosWidth = window.innerWidth;
    console.log(this.windwosWidth);
    if (this.windwosWidth < 576) {
      document.getElementById("sidebar").classList.add("active");
      document.getElementById("sidebar-non-active2").classList.remove("hidden-sidenav");
    } else if (this.windwosWidth >= 576) {
      document.getElementById("sidebar").classList.remove("active");
      document.getElementById("sidebar-non-active2").classList.add("hidden-sidenav");
    }
  }

  ngOnInit(): void {
    if (window.screen.width < 576) {
      document.getElementById("sidebar").classList.toggle("active");
      document.getElementById("sidebar-non-active2").classList.toggle("hidden-sidenav");
    }
  }


}

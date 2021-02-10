
import {Component, HostListener, OnInit} from '@angular/core';
import {Utils} from "../../_shared/utils";


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  public windwosWidth = window.innerWidth;
  constructor() {
  }

  ngOnInit(): void {
  }


  @HostListener('window:resize') windwosResize() {
    this.windwosWidth = window.innerWidth;
  }

}

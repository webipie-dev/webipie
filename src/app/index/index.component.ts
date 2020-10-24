import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  // ngAfterViewInit(): void {
  //   var st = document.getElementsByTagName('style');
  //   st[0].parentNode.removeChild(st[0]);
  //
  //   console.log(st[0]);
  // }
  ngOnInit(): void {
  }


}

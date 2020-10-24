import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-after-signin',
  templateUrl: './after-signin.component.html',
  styleUrls: ['./after-signin.component.css']
})
export class AfterSigninComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var head = document.getElementById('headerr');
    head.className += ' color-blue-header';
    console.log(head);
  }


}

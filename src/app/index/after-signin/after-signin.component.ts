import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-after-signin',
  templateUrl: './after-signin.component.html',
  styleUrls: ['./after-signin.component.css']
})
export class AfterSigninComponent implements OnInit, AfterViewInit {

  constructor() { }

  loading = false;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    var head = document.getElementById('headerr');
    console.log(head);

    head.classList.remove('start-style');
    // header.classList.add('bg-light');
    head.classList.add('scroll-on');
    // console.log(head);
  }


}

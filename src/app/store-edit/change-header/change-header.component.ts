import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-header',
  templateUrl: './change-header.component.html',
  styleUrls: ['./change-header.component.css']
})
export class ChangeHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title : String = 'A title here';
  description : String = 'A description here';
  main_button : String = 'main button here';

}

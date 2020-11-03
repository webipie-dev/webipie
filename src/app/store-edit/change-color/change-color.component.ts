import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public show = false;
  public defaultColors = [
    {'name': 'chartI', 'colors': [ '#ffffff', '#000105', '#3e6158', '#3f7a89', '#96c582', ]},
    {'name': 'chartII', 'colors': [ '#000105', '#ffffff', '#3e6158', '#3f7a89', '#96c582', ]},
    {'name': 'chartIII', 'colors': [ '#ffffff', '#000105', '#3e6158', '#3f7a89', '#96c582', ]},
  ];

  public toggleColors(): void {
    this.show = !this.show;
    console.log('here')
  }
}

import {Component, Input, OnInit} from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-change-font',
  templateUrl: './change-font.component.html',
  styleUrls: ['./change-font.component.css']
})
export class ChangeFontComponent implements OnInit {
  @Input() toggleS: () => void;
  selectItem = false;

  /*
    general settings to any template
  */
  fontTypes = [
    'Serif',
    'Sans-serif',
    'Monospace',
    'Cursive'
  ];
  fontSizeMin = 5;
  fontSizeMax = 50;
  fontWeights = [
    'normal',
    'bold',
    'bolder',
    'lighter'
  ];

  /*
    specific settings to user's template
  */
  fontType = 'Serif';
  fontSize = 10 ;
  fontWeight = 'normal';
  textShadow = false;
  textShadowColor = 'blue';

  constructor() { }

  ngOnInit(): void {
  }

  sizeChange(value){
    console.log('the size value is' + value);
    this.fontSize = value;
  }

  shadowChange(value){
    this.textShadow = (value === '1');
  }

  onSelect() {
    console.log('sdfgdfdsd');
    this.selectItem = !this.selectItem;
    console.log('this happened ' + this.selectItem);
  }

}

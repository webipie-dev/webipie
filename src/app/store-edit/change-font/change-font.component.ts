import {Component, Input, OnInit} from '@angular/core';
import { Validators } from '@angular/forms';
import { AlignmentTypes } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-change-font',
  templateUrl: './change-font.component.html',
  styleUrls: ['./change-font.component.css']
})
export class ChangeFontComponent implements OnInit {
  @Input() toggleS: () => void;

  /*
    general settings to any template
  */ 
  fontTypes: Array<string>;
  fontSizeMin: number;
  fontSizeMax: number;
  fontWeights: Array<string>;
  // const alignments = ["center", "right", "left"];

  /*
    specific settings to user's template
  */
  fontType: string;
  fontSize: number;
  fontWeight: string;
  textShadow: boolean;
  textShadowColor: string;
  textAlign: string;
  textBold: boolean;
  textItalic: boolean;

  constructor() { }

  ngOnInit(): void {
    this.fontTypes = [
      'Serif',
      'Sans-serif',
      'Monospace',
      'Cursive'
    ];
    this.fontSizeMin = 5;
    this.fontSizeMax = 50;
    this.fontWeights = [
      'normal',
      'bold',
      'bolder',
      'lighter'
    ];
    // const alignments = ["center", "right", "left"];

    this.fontType = 'Serif';
    this.fontSize = 10 ;
    this.fontWeight = 'normal';
    this.textShadow = false;
    this.textShadowColor = "blue";
    this.textAlign = "center";
    this.textBold = false;
    this.textItalic = false;
  }

  sizeChange(value){
    console.log('the size value is' + value);
    this.fontSize = value;
  }

  shadowChange(value){
    this.textShadow = (value=='1') ? true : false ; 
  }

  alignChange(event,value){

    let target = event.target; 
    if(event.target.tagName == "path") {
      target = event.target.parentNode; 
    }

    console.log(target);
    // add the css effects
    target.classList.add('alignment');

    var icons = document.querySelectorAll('.alignment');

    for (var i = 0; i < icons.length; i++) {

      // If the icon is the one clicked, skip it
      if (icons[i] === event.target) continue;
  
      // Remove the .alignment class
      icons[i].classList.remove('alignment');
  
    }

    this.textAlign = value;
  }

  onSelect(event,value) {
    let target = event.target; 
    if(event.target.tagName == "path") {
      target = event.target.parentNode; 
    }

    target.classList.toggle('font-item-selected');

    if(value=='italic'){ this.textItalic = !this.textItalic }
  }

}

import {ElementRef, OnInit, Renderer2} from '@angular/core';
import {Directive} from '@angular/core';
@Directive({
  selector: '[appChangeImg]'
})
export class ChangeImgDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }


  ngOnInit(): void {
  }
}

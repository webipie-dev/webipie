import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $.fn.jQuerySimpleCounter = function( options ) {
      const settings = $.extend({
        start:  0,
        end:    100,
        easing: 'swing',
        duration: 400,
        complete: ''
      }, options );

      const thisElement = $(this);

      $({count: settings.start}).animate({count: settings.end}, {
        duration: settings.duration,
        easing: settings.easing,
        step: function() {
          const mathCount = Math.ceil(this.count);
          thisElement.text(mathCount);
        },
        complete: settings.complete
      });
    };

    $('#clients-number').jQuerySimpleCounter({end: 12, duration: 3000});
    $('#orders-number').jQuerySimpleCounter({end: 55, duration: 3000});
    $('#products-number').jQuerySimpleCounter({end: 359, duration: 2000});
  }

}

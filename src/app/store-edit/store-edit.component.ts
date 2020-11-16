import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})

export class StoreEditComponent implements OnInit {
  urlToPreview: string = "http://localhost:4200/";
  urlSafe: SafeResourceUrl;
  windowHeight = window.innerHeight;
  newWidth;
  constructor(public sanitizer: DomSanitizer) { }
  toggleS = (): void =>  {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("sidebar-non-active").classList.toggle("active");
    document.getElementById('sidebar-non-active2').classList.toggle('hidden-sidenav');

    document.getElementById('iframe').classList.toggle('margin-iframe');
    document.getElementById('iframe').style.width = this.newWidth.toString();
    if (document.getElementById('sidebar').classList.contains('active')) {
      this.newWidth = window.screen.width - document.getElementById('sidebar-non-active').offsetWidth + 'px';
    } else {
      this.newWidth = window.screen.width - document.getElementById('sidebar').offsetWidth + 'px';
    }
    document.getElementById('iframe').style.width = this.newWidth.toString();
    var event = new CustomEvent("resize");
    console.log(event);
    document.dispatchEvent(event);
  }
  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlToPreview);
    if (document.getElementById('sidebar').classList.contains('active')) {
     this.newWidth = window.screen.width - document.getElementById('sidebar-non-active').offsetWidth + 'px';
    } else {
      this.newWidth = window.screen.width - document.getElementById('sidebar').offsetWidth + 'px';
    }
    document.getElementById('iframe').style.width = this.newWidth.toString();
    window.addEventListener('resize', () => {
      if (document.getElementById('sidebar').classList.contains('active')) {
        this.newWidth = window.screen.width - document.getElementById('sidebar-non-active').offsetWidth + 'px';
      } else {
        this.newWidth = window.screen.width - document.getElementById('sidebar').offsetWidth + 'px';
      }
      document.getElementById('iframe').style.width = this.newWidth.toString();
    });

  }
}

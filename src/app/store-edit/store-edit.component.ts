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
  constructor(public sanitizer: DomSanitizer) { }
  toggleS = (): void =>  {
    console.log(document.getElementById("sidebar"));
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("sidebar-non-active").classList.toggle("active");
    document.getElementById("sidebar-next").classList.toggle("sidenav-next");
    var event = new CustomEvent("resize");
    document.dispatchEvent(event);
  }
  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlToPreview);
    var newWidth = window.screen.width - document.getElementById('sidebar').offsetWidth + "px";
    document.getElementById("iframe").style.width = newWidth.toString();
    window.addEventListener("resize", () => {
      var newWidth = window.screen.width - document.getElementById('sidebar').offsetWidth + "px";
      document.getElementById("iframe").style.width = newWidth.toString();
    });

  }
}

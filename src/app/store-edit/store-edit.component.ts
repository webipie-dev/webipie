import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})

export class StoreEditComponent implements OnInit {
  urlToPreview = 'http://localhost:4200/template/home';
  urlSafe: SafeResourceUrl;
  windowHeight = window.innerHeight;
  newWidth;
  constructor(public sanitizer: DomSanitizer, private router: Router) { }

  toggleS = (): void =>  {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebar-non-active').classList.toggle('active');
    document.getElementById('sidebar-non-active2').classList.toggle('hidden-sidenav');

    document.getElementById('iframe').classList.toggle('margin-iframe');
    document.getElementById('iframe').style.width = this.newWidth.toString();
    if (document.getElementById('sidebar').classList.contains('active')) {
      this.newWidth = window.screen.width - document.getElementById('sidebar-non-active').offsetWidth + 'px';
    } else {
      this.newWidth = window.screen.width - document.getElementById('sidebar').offsetWidth + 'px';
    }
    document.getElementById('iframe').style.width = this.newWidth.toString();
    const event = new CustomEvent('resize');
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
  switchAndToggleS(path) {
    this.router.navigate([path]);
    this.toggleS();
  }
}

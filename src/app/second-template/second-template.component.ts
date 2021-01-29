import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StoreService} from '../_shared/services/store.service';

@Component({
  selector: 'app-second-template',
  templateUrl: './second-template.component.html',
  styleUrls: ['./second-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecondTemplateComponent implements OnInit {
  store;
  loadAPI: Promise<any>;

  constructor(private storeService: StoreService) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit(): void {
    this.store = JSON.parse(this.storeService.getStore('600053ca1181b69010315090'));
  }

  public  loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = [
        'assets/second-template/js/modernizr.js',
        'assets/second-template/js/jquery-1.11.3.min.js',
        'assets/second-template/js/bootstrap.min.js',
        'assets/second-template/js/own-menu.js',
        'assets/second-template/js/jquery.lighter.js',
        'assets/second-template/js/owl.carousel.min.js',
        'assets/second-template/rs-plugin/js/jquery.tp.t.min.js',
        'assets/second-template/rs-plugin/js/jquery.tp.min.js',
        'assets/second-template/js/main.js',
      ];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        console.log(dynamicScripts);
        document.getElementsByTagName('body')[0].appendChild(node);
      }
    }
  }
}

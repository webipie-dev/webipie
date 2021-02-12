import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StoreService} from '../_shared/services/store.service';
import {Store} from '../_shared/models/store.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-second-template',
  templateUrl: './second-template.component.html',
  styleUrls: ['./second-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecondTemplateComponent implements OnInit {
  store: Store;
  loadAPI: Promise<any>;
  name: string;
  location: string;

  constructor(private storeService: StoreService,
              private  activatedRoute: ActivatedRoute) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.parent.params.name;
    this.location = this.activatedRoute.snapshot.parent.params.location;
    this.store = JSON.parse(this.storeService.getStore(this.name, this.location));
  }

  public loadScript() {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const dynamicScripts = [
        'https://code.jquery.com/jquery-3.2.1.slim.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
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

      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);
      }
    }
  }
}

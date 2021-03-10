import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExternalFilesService} from "../../_shared/services/external-files.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TestComponent implements OnInit {

  constructor(private externalFilesService: ExternalFilesService) {
  }

  ngOnInit(): void {
    this.externalFilesService.loadScripts();
  }

}

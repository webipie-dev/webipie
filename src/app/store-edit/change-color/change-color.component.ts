import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {

  constructor(private http: HttpClient,
              private storeService: StoreService) {
  }

  defaultColor;
  store = encryptStorage.getItem('store');
  public show = false;
  public defaultColors = [];

  ngOnInit(): void {
    this.defaultColors = this.store.template.colorChartOptions;
  }

  public toggleColors(): void {
    this.show = !this.show;
  }

  colorChange(color): void {
    this.defaultColor = color;
    this.store.template.colorChart = color;
  }

  submit(): void {
    const postData = {
      'template.colorChart': this.defaultColor
    };
    this.storeService.edit(this.store._id, postData).subscribe(store => {
      encryptStorage.setItem('store', store);
    });
  }
}

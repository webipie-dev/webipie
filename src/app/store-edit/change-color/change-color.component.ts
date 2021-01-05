import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';

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
  storeId = '5fd09d461bcaf731b40f95fb';

  public show = false;
  public defaultColors = [
    {name: 'chartI', colors: ['#ffffff', '#000105', '#3e6158', '#3f7a89', '#96c582', ]},
    {name: 'chartII', colors: ['#000105', '#ffffff', '#3e6158', '#3f7a89', '#96c582', ]},
    {name: 'chartIII', colors: ['#ffffff', '#000105', '#3e6158', '#3f7a89', '#96c582', ]},
  ];

  ngOnInit(): void {
  }

  public toggleColors(): void {
    this.show = !this.show;
    console.log('here');
  }

  colorChange(color): void {
    this.defaultColor = color.colors;
  }

  submit(): void {
    const postData = {
      'template.colorChart': this.defaultColor
    };
    this.storeService.edit(this.storeId, postData).subscribe(data => {
      console.log(data);
    });
  }
}

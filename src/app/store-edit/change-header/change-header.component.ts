import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-header',
  templateUrl: './change-header.component.html',
  styleUrls: ['./change-header.component.css']
})
export class ChangeHeaderComponent implements OnInit {

  constructor() { }
  headerForm: FormGroup;
  postData = new FormData();
  title = 'A title here';
  description = 'A description here';
  mainButton = 'main button here';
  imgSrc = '../../../assets/images/dress.jpg';

  ngOnInit(): void {
    this.headerForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      mainButton: new FormControl(null),
      img: new FormControl(null),
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.imgSrc = reader.result.toString();
    };
    this.postData.append('img', file, file.name);
  }

  onSubmit() {
    for (const field in this.headerForm.controls) {
      const control = this.headerForm.get(field);
      if (control.value) {
        this.postData.append(field, control.value);
      } else {
        if ((field !== 'img')) {
          this.postData.append(field, '');
        }
      }
    }
    console.log('heyyyy');
  }
}

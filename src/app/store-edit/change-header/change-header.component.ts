import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';
import {encryptLocalStorage, encryptStorage} from '../../_shared/utils/encrypt-storage';
import {Store} from '../../_shared/models/store.model';

declare var $: any;

@Component({
  selector: 'app-change-header',
  templateUrl: './change-header.component.html',
  styleUrls: ['./change-header.component.css']
})
export class ChangeHeaderComponent implements OnInit {

  constructor(private storeService: StoreService,
              private router: Router) { }
  storeId = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
  headerForm: FormGroup;
  initialHeaderForm: FormGroup;
  postData = new FormData();
  imgSrc = encryptStorage.getItem('store').template.header.img;
  store: Store;

  ngOnInit(): void {
    this.store = encryptStorage.getItem('store');
    this.headerForm = new FormGroup({
      title: new FormControl(this.store.template.header.title),
      description: new FormControl(this.store.template.header.description),
      mainButton: new FormControl(this.store.template.header.mainButton),
      img: new FormControl(this.store.template.header.img),
    });
    this.initialHeaderForm = new FormGroup({
      title: new FormControl(this.store.template.header.title),
      description: new FormControl(this.store.template.header.description),
      mainButton: new FormControl(this.store.template.header.mainButton),
      img: new FormControl(this.store.template.header.img),
    });
  }
  changeHeaderOnChange() {
    const subjectToChange = {
      subj: this.headerForm.value,
      type: 'header',
    };
    console.log(subjectToChange);
    $('#iframe')[0].contentWindow.postMessage(subjectToChange, 'http://store.webipie.com:4200/');
  }

  onFileChanged(event): void {
    const file = event.target.files[0];
    this.postData.append('img', file, file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (events) => {
      this.imgSrc = reader.result.toString();
      this.headerForm.value.img = this.imgSrc;
      this.changeHeaderOnChange();
    };
  }

  testSame(): boolean {
    return this.initialHeaderForm.get('description').value === this.headerForm.get('description').value &&
      this.initialHeaderForm.get('title').value === this.headerForm.get('title').value &&
      this.initialHeaderForm.get('mainButton').value === this.headerForm.get('mainButton').value &&
      this.initialHeaderForm.get('img').value === this.headerForm.get('img').value;
  }

  onSubmit(): void {
    for (const field in this.headerForm.controls) {
      if (field !== 'img') {
        const control = this.headerForm.get(field);
        console.log('I am here');
        if (control.value) {
          const head = 'template.header.' + field;
          this.postData.append(head, control.value);
        }
      }
    }
    this.postData.append('ids', this.storeId);
    this.storeService.edit(this.storeId, this.postData).subscribe(store => {
      encryptStorage.setItem('store', store);
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['store/header']);
        this.initialHeaderForm = this.headerForm;
      });
    });
  }
}

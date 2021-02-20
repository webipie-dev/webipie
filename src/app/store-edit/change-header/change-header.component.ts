import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';

@Component({
  selector: 'app-change-header',
  templateUrl: './change-header.component.html',
  styleUrls: ['./change-header.component.css']
})
export class ChangeHeaderComponent implements OnInit {

  constructor(private storeService: StoreService,
              private router: Router) { }
  storeId = '5fd09d461bcaf731b40f95fb';
  headerForm: FormGroup;
  postData = new FormData();
  imgSrc = '../../../assets/images/fashion-WPWVGRY.jpg';
  store: any;

  ngOnInit(): void {
    this.store = encryptStorage.getItem('store');
    this.headerForm = new FormGroup({
      title: new FormControl(this.store.template.header.title),
      description: new FormControl(this.store.template.header.description),
      mainButton: new FormControl(this.store.template.header.mainButton),
      img: new FormControl(this.store.template.header.img),
    });
  }

  onFileChanged(event): void {
    const file = event.target.files[0];
    this.postData.append('headerImg', file, file.name);
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (events) => {
      this.imgSrc = reader.result.toString();
    };
  }

  onSubmit(): void {
    for (const field in this.headerForm.controls) {
      if (field !== 'img') {
        const control = this.headerForm.get(field);
        if (control.value) {
          const head = 'template.header.' + field;
          this.postData.append(head, control.value);
        }
      }
    }
    this.postData.append('ids', this.storeId);
    this.storeService.edit(this.storeId, this.postData).subscribe(store => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['store/header']);
        encryptStorage.setItem('store', store);
      });
    });
  }
}

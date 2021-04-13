import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';
import {encryptLocalStorage, encryptStorage} from '../../_shared/utils/encrypt-storage';
import {Store} from '../../_shared/models/store.model';
import Swal from 'sweetalert2';
import {UploadService} from '../../_shared/services/upload.service';
import {emit} from 'cluster';

declare var $: any;

@Component({
  selector: 'app-change-header',
  templateUrl: './change-header.component.html',
  styleUrls: ['./change-header.component.css']
})
export class ChangeHeaderComponent implements OnInit {

  storeId: string;
  headerForm: FormGroup;
  initialHeaderForm: FormGroup;
  postData = {
      'template.header': {
        img: '',
        title: '',
        description: '',
        mainButton: ''
      }
  };
  imgSrc = encryptStorage.getItem('store').template.header.img;
  store: Store;
  uploadConfig;
  savedImage = '';


  constructor(private storeService: StoreService,
              private uploadService: UploadService,
              private router: Router) {}

  ngOnInit(): void {
    this.store = encryptStorage.getItem('store');
    this.storeId = this.store.id;
    // set initial and default values to test whether the user has made any changes
    // whether we should send modifications to back
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

  // real time header change
  changeHeader(data?: FormGroup): void {
    const subjectToChange = {
      subj: data || this.headerForm.value,
      type: 'header',
    };
    $('#iframe')[0].contentWindow.postMessage(subjectToChange, 'http://store.webipie.com:4200/');
  }

  // image change
  async onFileChanged(event) {

    const file = event.target.files[0];
    const check = this.uploadService.imageCheckType(file.type);

    if (check) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (events) => {
        this.imgSrc = reader.result.toString();
        this.headerForm.value.img = this.imgSrc;
        this.changeHeader();
        this.uploadConfig = await this.uploadService.signedUrl(this.store, file.type);
        console.log('2');
        await this.uploadService.upload(this.uploadConfig.url, file);
        console.log('3');
        this.savedImage = this.uploadConfig.key;
        console.log(this.savedImage);
      };
    }

  }

  testChange(): boolean {
    return this.initialHeaderForm.get('description').value === this.headerForm.get('description').value &&
      this.initialHeaderForm.get('title').value === this.headerForm.get('title').value &&
      this.initialHeaderForm.get('mainButton').value === this.headerForm.get('mainButton').value &&
      this.initialHeaderForm.get('img').value === this.imgSrc;
  }

  resetHeader(): void {
    this.headerForm.reset(this.initialHeaderForm.value);
    this.imgSrc = this.initialHeaderForm.get('img').value;
    this.changeHeader(this.initialHeaderForm.value);
  }

  onSubmit(): void {
    if (this.savedImage !== '') {
      this.postData['template.header'].img = 'https://webipie-images.s3.eu-west-3.amazonaws.com/' + this.savedImage;
    }else {
      this.postData['template.header'].img = this.headerForm.get('img').value;
    }

    for (const field in this.headerForm.controls) {
      const control = this.headerForm.get(field);
      if (field !== 'img' ) {
        if (control.value) {
          this.postData['template.header'][field] = control.value;
        }
      }
    }
    console.log(this.postData);
    this.storeService.edit(this.storeId, this.postData).subscribe(store => {
      encryptStorage.setItem('store', store);
      this.initialHeaderForm = this.headerForm;

      this.router.navigateByUrl('/store');
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Saved successfully'
      });
    });
  }

  // in case the user changed values and didn't click on save
  returnToEditStore(): void {
    if (!this.testChange()) {
      Swal.fire({
        title: 'Be Careful!',
        text: 'You have unsaved changes, Would you continue to discard these changes or save them before proceeding ?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Save Changes',
        denyButtonText: 'Discard Changes'
      }).then(result => {
        if (result.value) {
          this.onSubmit();
        } else {
          this.changeHeader(this.initialHeaderForm.value);
          Swal.close();
        }
        this.router.navigateByUrl('/store');
      });
    } else {
      this.router.navigateByUrl('/store');
    }
  }
}


import {Component, HostListener, OnInit} from '@angular/core';
import { AuthService } from '../../_shared/services/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import {UploadService} from '../../_shared/services/upload.service';
import {encryptLocalStorage, encryptStorage} from '../../_shared/utils/encrypt-storage';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {imagesBucket} from 'src/app/configuration'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public windowsWidth = window.innerWidth;
  oldPassword: string;
  newPassword: string;
  checked: boolean;
  validation: boolean;

  email = '';
  name = '';
  storeName = '';
  prevName = '';
  storeId = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
  store: Store;
  imgSrc = '';
  uploadConfig;
  savedImage = '';
  submitLogo = false;



  constructor(private authService: AuthService,
              private uploadService: UploadService,
              private storeService: StoreService) { }


  ngOnInit(): void {
    this.checked = false;
    this.validation = false;

    if (encryptStorage.getItem('store')) {
      this.imgSrc = encryptStorage.getItem('store').logo;
      this.store = encryptStorage.getItem('store');
      this.storeName = this.store.name;
      this.prevName = this.store.name;

    } else {
      this.storeService.getById(this.storeId).subscribe( store => {
        this.store = store;
        encryptStorage.setItem('store', this.store);
        this.imgSrc = store.logo;
        this.storeName = this.store.name;
        this.prevName = this.store.name;
      });
    }

  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validatePwd(event: any): void{
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm;
    if (pattern.test(event.target.value)){
      event.target.classList.remove('red');
      this.validation = false;
    }
    else{
      event.target.classList.add('red');
      this.validation = true;
    }
  }

  checkPwd(event: any): void{
    if (this.newPassword === event.target.value) {
      event.target.classList.remove('red');
      this.checked = true;
    }
    else {
      event.target.classList.add('red');
      this.checked = false;
    }
  }

  changePwd(): void{
    this.authService.changePwd(this.oldPassword, this.newPassword).subscribe( data => {
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: 'success',
        timerProgressBar: false,
        timer: 4000,
        title: 'Password has been changed!'
      });
    },
    (err) => {
      console.log(err.error.errors[0].message);
      Swal.fire({
        title: 'Error!',
        text: err.error.errors[0].message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }


  @HostListener('window:resize') windwosResize(): void {
    this.windowsWidth = window.innerWidth;
  }

  clickAddPhotos(): void {
    document.getElementById('hiddenImageInput').click();
  }


  onFileChanged(event): void {
    const file = event.target.files[0];
    const check = this.uploadService.imageCheckType(file.type);

    if (check) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (events) => {
        this.imgSrc = reader.result.toString();
        console.log(this.store);
        this.uploadConfig = await this.uploadService.signedUrl(this.store, file.type);
        await this.uploadService.upload(this.uploadConfig.url, file);
        this.savedImage = this.uploadConfig.key;
      };
    }
  }

  onChangeName(): void{
    this.prevName = this.storeName;
    this.storeService.edit(this.store.id, {name: this.storeName}).subscribe(data => {
      console.log(data);
      this.store.name = this.storeName;
      encryptStorage.setItem('store', this.store);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Store name has been changed',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }


  onSubmit(): void {
    this.submitLogo = true;
    if (this.savedImage !== '') {
      const logo = imagesBucket + this.savedImage;
      this.storeService.edit(this.store.id, {logo}).subscribe(data => {
        console.log(data);
        this.store.logo = logo;
        encryptStorage.setItem('store', this.store);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Your Logo has been saved',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }
}

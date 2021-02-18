
import {Component, HostListener, OnInit} from '@angular/core';
import { AuthService } from '../../_shared/services/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public windwosWidth = window.innerWidth;

  oldPassword: string;
  newPassword: string;
  checked: boolean;
  validation: boolean;
  
  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.checked = false;
    this.validation = false;
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
    // console.log(value);
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
      console.log(data);
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
    this.windwosWidth = window.innerWidth;
  }

}

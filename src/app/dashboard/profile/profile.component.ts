import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  oldPassword: string;
  newPassword: string;
  checked: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checked = false;
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
    this.authService.changePwd(this.oldPassword, this.newPassword).subscribe(data => {
      console.log(data);
    },
    (err) =>{
      console.log(err);
    });
  }

}

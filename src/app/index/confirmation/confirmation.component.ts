import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private router: Router,
    private authservice: AuthService) { }

  ngOnInit(): void {
  }

  navigateDashboard(): void{
    this.router.navigate(['dashboard']);
  }

  resend(): void{
    this.authservice.resendLink(localStorage.getItem('token'));
  }
}

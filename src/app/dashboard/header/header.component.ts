import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  openDropDown() {
    document.getElementById('dropdown-profile').parentElement.classList.toggle('active');
  }

  logOut(): void{
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}

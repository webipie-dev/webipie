import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/services/auth.service';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private storeService: StoreService) { }

  ngOnInit(): void {
  }

  openDropDown() {
    document.getElementById('dropdown-profile').parentElement.classList.toggle('active');
  }

  logOut(): void{
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  preview() {
    const storeId = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
    this.storeService.getById(storeId).subscribe(store => {
      const url = 'http://' + store.url + ':4200';
      window.open(url, '_blank');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { encryptLocalStorage } from 'src/app/_shared/utils/encrypt-storage';
import { AuthService } from '../../_shared/services/auth.service';
import { StoreService } from '../../_shared/services/store.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private storeService: StoreService) { }

  ngOnInit(): void {
  }

  navigateDashboard(): void{
    const templateId = this.route.snapshot.queryParamMap.get('templateId');
    const storeName = this.route.snapshot.queryParamMap.get('storeName');
    const storeType = this.route.snapshot.queryParamMap.get('storeType');
    if (localStorage.getItem('storeID')){
      this.router.navigate(['dashboard']);
    }else if (templateId && storeType && storeName) {
      this.storeService.addOne({ templateId, name: storeName, storeType }).subscribe(store => {
        localStorage.setItem('storeID', encryptLocalStorage.encryptString(store.id));
        this.router.navigate(['dashboard']);
      });
    } else{
      this.router.navigate(['templates']);
    }
  }

  resend(): void{
    this.authservice.resendLink(localStorage.getItem('token'));
  }
}

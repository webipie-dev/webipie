import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StoreEditComponent} from "./store-edit.component";
import {SidenavStoreComponent} from "./sidenav-store/sidenav-store.component";
import {ChangeFontComponent} from './change-font/change-font.component';
import {SocialMediaComponent} from './social-media/social-media.component';


const routes: Routes = [{
    path: '',
    component: StoreEditComponent,
    children: [
      {
        path: 'sidenavv',
        component: SidenavStoreComponent
      },
      {
        path: 'font',
        component: ChangeFontComponent
      },
      {
        path: 'social-media',
        component: SocialMediaComponent
      }
    ]
  }]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreEditRoutingModule {
}

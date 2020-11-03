import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StoreEditComponent} from "./store-edit.component";
import {SidenavStoreComponent} from "./sidenav-store/sidenav-store.component";
import {ChangeFontComponent} from './change-font/change-font.component';
import { ChangeColorComponent } from './change-color/change-color.component';
import {ChangeContactComponent} from './change-contact/change-contact.component';
import {ChangeHeaderComponent} from './change-header/change-header.component';

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
        path: 'color',
        component: ChangeColorComponent
      },
      {
        path: 'contact',
        component: ChangeContactComponent
      },
      {
        path: 'header',
        component: ChangeHeaderComponent
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

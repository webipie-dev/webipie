import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StoreEditComponent} from "./store-edit.component";
import {SidenavStoreComponent} from "./sidenav-store/sidenav-store.component";
import {ChangeFontComponent} from './change-font/change-font.component';


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

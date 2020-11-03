import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StoreEditComponent} from "./store-edit.component";
import {ChangeFontComponent} from './change-font/change-font.component';
import { ChangeColorComponent } from './change-color/change-color.component';
import {ChangeContactComponent} from './change-contact/change-contact.component';
import {ChangeHeaderComponent} from './change-header/change-header.component';
import {SocialMediaComponent} from './social-media/social-media.component';
import {SidenavMenuComponent} from './sidenav-menu/sidenav-menu.component';


const routes: Routes = [{
    path: '',
    component: StoreEditComponent,
    children: [
      {
        path: '',
        component: SidenavMenuComponent,
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
        component: ChangeHeaderComponent,
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

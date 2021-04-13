import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {AfterSigninComponent} from './after-signin/after-signin.component';
import {PricingComponent} from './pricing/pricing.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {TemplatesPageComponent} from './templates-page/templates-page.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SpinnerModule} from '../spinner/spinner.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IndexComponent} from './index.component';
import {IndexRoutingModule} from './index-routing.module';
import { LoadingSpinnerComponent } from '../_shared/loading-spinner/loading-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
    declarations: [
        IndexComponent,
        HeaderComponent,
        AfterSigninComponent,
        PricingComponent,
        SignInComponent,
        SignUpComponent,
        TemplatesPageComponent,
        LoadingSpinnerComponent,
    ],
    imports: [
        CommonModule,
        DragDropModule,
        SpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        HttpClientModule,
        IndexRoutingModule,
        NgxSpinnerModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        LoadingSpinnerComponent
    ]
})
export class IndexModule { }

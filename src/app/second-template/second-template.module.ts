import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSecondTemplateComponent } from './header-second-template/header-second-template.component';
import { FooterSecondTemplateComponent } from './footer-second-template/footer-second-template.component';
import { HomeSecondTemplateComponent } from './home-second-template/home-second-template.component';
import {SecondTemplateRoutingModule} from './second-template-routing.module';
import { TopSliderComponent } from './top-slider/top-slider.component';
import { ProductsSectionSecondTemplateComponent } from './products-section-second-template/products-section-second-template.component';
import { AboutSecondTemplateComponent } from './about-second-template/about-second-template.component';
import { ProductsAllSecondTemplateComponent } from './products-all-second-template/products-all-second-template.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CartSecondTemplateComponent } from './cart-second-template/cart-second-template.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {SecondTemplateComponent} from './second-template.component';
import { CheckoutSecondTemplateComponent } from './checkout-second-template/checkout-second-template.component';
import {SpinnerModule} from '../spinner/spinner.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchSecondTemplateComponent } from './search-second-template/search-second-template.component';

// https://docs.google.com/document/d/18aZNjQb-RWodUCqOi0Yzu2EhecNpA94TJXMs8vrbUMc/edit?usp=sharing


@NgModule({
    declarations: [
        SecondTemplateComponent,
        HeaderSecondTemplateComponent,
        FooterSecondTemplateComponent,
        HomeSecondTemplateComponent,
        TopSliderComponent,
        ProductsSectionSecondTemplateComponent,
        AboutSecondTemplateComponent,
        ProductsAllSecondTemplateComponent,
        CartSecondTemplateComponent,
        CheckoutSecondTemplateComponent,
        ProductDetailComponent,
        // SubHeaderSecondTemplateComponent,
        SearchSecondTemplateComponent,

    ],
    exports: [
      SecondTemplateComponent,
    ],
    imports: [
        CommonModule,
        SecondTemplateRoutingModule,
        DragDropModule,
        SpinnerModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SecondTemplateModule { }

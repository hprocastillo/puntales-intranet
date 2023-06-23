import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsHomeComponent } from './components/products-home/products-home.component';
import { ProductsNewComponent } from './components/products-new/products-new.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductsNewComponent,
    ProductsListComponent,
    ProductsViewComponent,
    ProductsEditComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }

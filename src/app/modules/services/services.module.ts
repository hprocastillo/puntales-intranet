import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesHomeComponent } from './components/services-home/services-home.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { ServicesNewComponent } from './components/services-new/services-new.component';
import { ServicesEditComponent } from './components/services-edit/services-edit.component';
import { ServicesViewComponent } from './components/services-view/services-view.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ServicesHomeComponent,
    ServicesListComponent,
    ServicesNewComponent,
    ServicesEditComponent,
    ServicesViewComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ]
})
export class ServicesModule { }

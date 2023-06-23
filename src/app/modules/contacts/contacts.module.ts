import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsHomeComponent } from './components/contacts-home/contacts-home.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactsViewComponent } from './components/contacts-view/contacts-view.component';


@NgModule({
  declarations: [
    ContactsHomeComponent,
    ContactsListComponent,
    ContactsViewComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }

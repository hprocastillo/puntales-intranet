import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsHomeComponent} from "./components/contacts-home/contacts-home.component";
import {Page404Component} from "../../components/page404/page404.component";

const routes: Routes = [
  {
    path: '', component: ContactsHomeComponent
  },
  {
    path: '**', component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {
}

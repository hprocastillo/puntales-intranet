import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from "../../components/page404/page404.component";
import {ServicesHomeComponent} from "./components/services-home/services-home.component";

const routes: Routes = [
  {
    path: '', component: ServicesHomeComponent
  },
  {
    path: '**', component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule {
}

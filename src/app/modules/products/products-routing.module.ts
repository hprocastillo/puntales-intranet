import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsHomeComponent} from "./components/products-home/products-home.component";
import {Page404Component} from "../../components/page404/page404.component";

const routes: Routes = [
  {
    path: '', component: ProductsHomeComponent
  },
  {
    path: '**', component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}

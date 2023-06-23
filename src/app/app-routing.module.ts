import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {Page404Component} from "./components/page404/page404.component";
import {LoginComponent} from "./components/login/login.component";
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: 'home',
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    component: HomeComponent
  },
  {
    path: 'login',
    ...canActivate(() => redirectLoggedInTo(['/home'])),
    component: LoginComponent
  },
  {
    path: 'services',
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    loadChildren: () => import('./modules/services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'products',
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'contacts',
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    loadChildren: () => import('./modules/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**', component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

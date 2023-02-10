import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './Components/categories/categories.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ProductsComponent } from './Components/products/products.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'orders', component: OrdersComponent },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

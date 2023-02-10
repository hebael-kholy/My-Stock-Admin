import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ProductsComponent } from './Components/products/products.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { SettingsComponent } from './Components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    ProductsComponent,
    OrdersComponent,
    CategoriesComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

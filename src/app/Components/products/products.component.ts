import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(public authService: AuthenticationService) {}

  loginStatus = this.authService.checkLoginStatus();

  logOut() {
    this.authService.logOut();
  }
}

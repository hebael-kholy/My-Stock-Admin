import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  constructor(public authService: AuthenticationService) {}

  loginStatus = this.authService.checkLoginStatus();

  logOut() {
    this.authService.logOut();
  }
}

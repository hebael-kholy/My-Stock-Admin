import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public authService: AuthenticationService) {}

  loginStatus = this.authService.checkLoginStatus();

  logOut() {
    this.authService.logOut();
  }
}

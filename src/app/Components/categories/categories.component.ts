import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(public authService: AuthenticationService) {}

  loginStatus = this.authService.checkLoginStatus();

  logOut() {
    this.authService.logOut();
  }
}

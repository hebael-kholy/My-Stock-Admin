import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(public authService: AuthenticationService) {}

  logOut() {
    this.authService.logOut();
  }
}

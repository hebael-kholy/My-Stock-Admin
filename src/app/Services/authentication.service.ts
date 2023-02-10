import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from '../model/signInData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // private readonly mockedUser = new SignInData(
  //   'dinaomran8@gmail.com',
  //   'test123'
  // );
  isAuthenticated = false;
  constructor(private router: Router, private myHttpClient: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    this.isAuthenticated = true;
    return this.myHttpClient.post(
      'https://ecommerceiti-heba.onrender.com/users/admin/login',
      obj
    );
  }

  // authenticate(signInData: SignInData): boolean {
  //   if (this.checkCredentials(signInData)) {
  //     this.isAuthenticated = true;
  //     this.router.navigate(['home']);
  //     return true;
  //   } else {
  //     this.isAuthenticated = false;
  //     return false;
  //   }
  //   }
  // private checkCredentials(signInData: SignInData): boolean {
  //   return (
  //     this.checkEmail(signInData.getEmail()) &&
  //     this.checkPassword(signInData.getPassword())
  //   );
  // }

  // private checkEmail(email: string): boolean {
  //   return email === this.mockedUser.getEmail();
  // }
  // private checkPassword(password: string): boolean {
  //   return password === this.mockedUser.getPassword();
  // }

  logOut() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }
}

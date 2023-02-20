import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = false;
  constructor(private router: Router, private myHttpClient: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    this.isAuthenticated = true;
    return this.myHttpClient.post(
      'https://ecommerceiti-heba.onrender.com/users/admin/login',
      obj
    );
  }

  logOut() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('image');
    localStorage.removeItem('id');
    this.router.navigate(['']);
  }

  checkLoginStatus() {
    return localStorage.getItem('token');
  }
}

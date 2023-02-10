import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { SignInData } from './../../model/signInData';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  hide: any = true;
  SignInData: any;
  errmsg: any;

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  isLoading = false;

  onSubmit(email: any, password: any) {
    const loginObj = { email, password };
    this.isLoading = true;
    this.authService.onLogin(loginObj).subscribe(
      (res: any) => {
        console.log('res:', res);
        console.log('token:', res.token);
        localStorage.setItem('token', res.token);
        Swal.fire('Thank You...', 'You Login Successfully', 'success');
        this.router.navigate(['home']);
        this.isLoading = false;
      },
      (err) => {
        Swal.fire('Sorry....', 'Invalid Email or Password', 'error');
        this.isLoading = false;
      }
    );
  }

  // this.SignInData = new SignInData(
  //   signInForm.value.email,
  //   signInForm.value.password
  // );
  // if (this.authService.(this.SignInData)) {
  //   this.router.navigate(['home']);
  //   this.errmsg = 'Logged In Successfully';
  // } else {
  //   this.errmsg = 'Invalid Email or Password';
  // }
}

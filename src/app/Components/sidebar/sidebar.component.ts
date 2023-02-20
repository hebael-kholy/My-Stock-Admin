import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  image: any;
  username: any;
  useremail: any;

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.image = localStorage.getItem('image');
    this.username = localStorage.getItem('name');
    this.useremail = localStorage.getItem('email');
  }
}

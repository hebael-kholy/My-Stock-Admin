import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private myHttp: HttpClient) {}

  getAllOrders() {
    return this.myHttp.get('https://ecommerceiti-heba.onrender.com/product');
  }
}

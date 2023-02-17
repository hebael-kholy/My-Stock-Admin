import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'price', 'title', 'state'];

  dataSource = [];
  isLoading = false;

  constructor(public orderService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe((res: any) => {
      console.log(res.data);
      this.dataSource = res.data;
      this.isLoading = false;
    });
  }
}

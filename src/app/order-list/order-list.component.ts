import { Component, OnInit } from '@angular/core';
import { OrderInfo } from 'src/model/order.mode';
import { Router } from '@angular/router';
import { OrderService } from 'src/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: OrderInfo[] = [];
  selectedOrders: Set<number> = new Set();
  isEditDisabled: boolean = false;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  toggleSelection(orderID: number): void {
    if (this.selectedOrders.has(orderID)) {
      this.selectedOrders.delete(orderID);
    } else {
      this.selectedOrders.add(orderID);
    }
    this.isEditDisabled = this.selectedOrders.size > 0;
  }

  toggleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.orders.forEach(order => this.selectedOrders.add(order.orderID));
    } else {
      this.selectedOrders.clear();
    }
  }

  areAllSelected(): boolean {
    return this.orders.length > 0 && this.selectedOrders.size === this.orders.length;
  }

  deleteSelectedOrders(): void {
    const orderIDs = Array.from(this.selectedOrders);
    this.orderService.deleteMultipleOrders(orderIDs).subscribe(() => {
      this.loadOrders();
      this.selectedOrders.clear();
      this.isEditDisabled = false;
    });
  }

  editSelectedOrder(orderID: number): void {
    this.router.navigate(['/orders/edit', orderID]);
  }

  deleteOrder(orderID: number): void {
    this.orderService.deleteOrder(orderID).subscribe(() => {
      this.loadOrders();
      this.selectedOrders.delete(orderID); // Remove from selected orders if deleted
      this.isEditDisabled = this.selectedOrders.size > 0;
    });
  }

  addOrder(): void {
    this.router.navigate(['/orders/add']);
  }
}

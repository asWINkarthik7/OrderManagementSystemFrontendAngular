import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OrderInfo } from 'src/model/order.mode';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.ordermanagementbaseurl}/OrderManagement`; // Concatenate to form full endpoint

  constructor(private http: HttpClient) { }

  // Method to get all orders
  getAllOrders(): Observable<OrderInfo[]> {
    return this.http.get<OrderInfo[]>(`${this.apiUrl}`);
  }

  // Method to add a new order
  addOrder(order: OrderInfo): Observable<OrderInfo> {
    return this.http.post<OrderInfo>(`${this.apiUrl}`, order);
  }

  // Method to update an order
  updateOrder(order: OrderInfo): Observable<OrderInfo> {
    return this.http.put<OrderInfo>(`${this.apiUrl}/${order.orderID}`, order);
  }

  // Method to delete a single order
  deleteOrder(orderID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderID}`);
  }

  // Method to delete multiple orders
  deleteMultipleOrders(orderIDs: number[]): Observable<void> {
    return this.http.post<void>(`${environment.ordermanagementbaseurl}/orders/delete-multiple`, { orderIDs });
  }
}

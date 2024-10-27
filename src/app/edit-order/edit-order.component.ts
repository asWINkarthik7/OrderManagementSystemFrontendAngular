import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/service/order.service';
import { OrderInfo } from 'src/model/order.mode';


@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  order: OrderInfo = {
    orderID: 0,
    vendor: '',
    orderAmount: 0,
    orderNumber: 0,
    shop: ''
  };
  isEditMode = false;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const orderID = this.route.snapshot.paramMap.get('id');
    if (orderID) {
      this.isEditMode = true;
      this.orderService.getAllOrders().subscribe(orders => {
        this.order = orders.find(o => o.orderID === +orderID) || this.order;
      });
    }
  }

  saveOrder(): void {
    if (this.isEditMode) {
      this.orderService.updateOrder(this.order).subscribe(() => {
        this.router.navigate(['/']); // Navigate back to order list after edit
      });
    } else {
      this.orderService.addOrder(this.order).subscribe(() => {
        this.router.navigate(['/']); // Navigate back to order list after add
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']); // Navigate back to order list
  }

}

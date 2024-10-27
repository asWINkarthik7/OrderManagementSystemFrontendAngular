import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' }, // Redirect root path to /orders
  { path: 'orders', component: OrderListComponent },
  { path: 'edit-order/:id', component: EditOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

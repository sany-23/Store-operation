import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalPrice: number = 0;
  totalItems: number = 0;
  toastVisible: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Load cart items from the service
  loadCartItems(): void {
    this.productService.getCart().subscribe((data: any[]) => {
      this.dataSource.data = data;
      this.calculateTotals();
    });
  }

  // Calculate total price and total number of items
  calculateTotals(): void {
    this.totalPrice = this.dataSource.data.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.totalItems = this.dataSource.data.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }

  // Remove an item from the cart
  removeFromCart(item: any): void {
    this.productService.removeFromCart(item.id).subscribe(() => {
      this.loadCartItems();
    });
  }

  // Checkout, clear the cart, show a toast notification, and navigate to the landing page
  checkout(): void {
    this.router.navigate(['inventory']); // Navigate to the landing page
  }

  // Show toast notification
  showToast(message: string): void {
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 3000); // Hide toast after 3 seconds
  }
}

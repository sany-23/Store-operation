import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.css'],
})
export class InventoryManagementComponent implements OnInit {
  dataSource: any[] = [];
  totalPrice: number = 0;
  totalItems: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.productService.getCart().subscribe((data: any[]) => {
      this.dataSource = data;
      this.calculateTotals();
    });
  }

  // Calculate total price and total number of items
  calculateTotals(): void {
    this.totalPrice = this.dataSource.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.totalItems = this.dataSource.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
  checkout(): void {
    alert('Purchase completed');
    this.router.navigate(['/']); // Navigate to the landing page
  }
}

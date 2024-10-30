import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

declare var bootstrap: any; // Required to use Bootstrap JavaScript functions

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'name',
    'category',
    'price',
    // 'stock',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>();
  selectedProduct: Product | null = null;
  toastVisible: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProductModal(product: Product): void {
    this.selectedProduct = product;
    const modal = new bootstrap.Modal(
      document.getElementById('productModal'),
      {}
    );
    modal.show();
  }

  addToCart(product: Product | null): void {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };
    this.productService.addToCart(cartItem).subscribe(() => {
      this.toastVisible = true;
      setTimeout(() => {
        this.toastVisible = false;
      }, 3000); // Hide toast after 3 seconds
    });
  }
}

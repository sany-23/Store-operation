// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private cartUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.cartUrl);
  }

  // Add an item to the cart
  addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.cartUrl, item);
  }

  // Remove an item from the cart
  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}/${id}`);
  }

  // Clear all items from the cart
  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}`);
  }
}

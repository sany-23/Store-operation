// src/app/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  rating?: number;
  reviews?: number;
  editing?: boolean; // Optional property for editing state
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

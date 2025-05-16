export interface ProductId {
  productId: string;
}

export interface Cart {
  userId: string;
  items: {
    productId: string | string[]
  }
}
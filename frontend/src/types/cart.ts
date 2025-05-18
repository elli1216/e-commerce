export interface Item {
  productId: string;
  price: string;
  quantity: string;
  arrivingDate: string;
  shippingFee: string;
  subTotal: string
  increaseQuantity?: (productId: string) => void;
  decreaseQuantity?: (productId: string) => void;
  onDeleteItem?: (productId: string) => void;
}

export interface Cart {
  userId: string;
  items: {
    item: Item | Item[]
  }
  itemCount: string;
  total: string
}
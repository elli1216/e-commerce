export interface Item {
  productId: string;
  quantity: string;
  status: string;
  arrivingDate: string;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  items: { item: Item | Item[] };
  orderTotal: string;
}
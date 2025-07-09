export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'everyday' | 'luxury' | 'tech' | 'real-estate' | 'vehicles' | 'experiences';
}

export interface Purchase {
  item: Item;
  quantity: number;
}

export interface SpendingState {
  remainingMoney: number;
  totalSpent: number;
  purchases: Purchase[];
}
export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  expiryDate: string;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expired';
};

export type Sale = {
  id: string;
  date: string;
  items: {
    itemId: string;
    name: string;
    quantity: number;
  }[];
  totalAmount: number;
  paymentRef: string;
};

export type Alert = {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
};

export type UsageData = {
  month: string;
  Paracetamol: number;
  Amoxicillin: number;
  Ibuprofen: number;
};

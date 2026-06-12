export type OrderItem = {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  paymentMethod: "credit_card";
  items: OrderItem[];
  createdAt: string;
};

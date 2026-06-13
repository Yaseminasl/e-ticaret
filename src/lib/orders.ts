import { db } from "@/lib/database";
import type { Order } from "@/types/order";

type CreateOrderItemInput = {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type CreateOrderInput = {
  userId: string;
  orderNumber: string;
  totalAmount: number;
  shippingName: string;
  shippingAddress: string;
  shippingPhone: string;
  paymentMethod: "credit_card";
  items: CreateOrderItemInput[];
};

type OrderRow = {
  id: number;
  order_number: string;
  total_amount: number;
  status: Order["status"];
  shipping_name: string;
  shipping_address: string;
  shipping_phone: string;
  payment_method: "credit_card";
  created_at: string;
};

type OrderItemRow = {
  product_id: number;
  name: string;
  quantity: number;
  unit_price: number;
};

function mapOrder(row: OrderRow, items: OrderItemRow[]): Order {
  return {
    id: String(row.id),
    orderNumber: row.order_number,
    totalAmount: row.total_amount,
    status: row.status,
    shippingName: row.shipping_name,
    shippingAddress: row.shipping_address,
    shippingPhone: row.shipping_phone,
    paymentMethod: row.payment_method,
    createdAt: row.created_at,
    items: items.map((item) => ({
      productId: item.product_id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      lineTotal: item.unit_price * item.quantity,
    })),
  };
}

function getOrderItems(orderId: number) {
  return db
    .prepare(
      `
      SELECT
        order_items.product_id,
        products.name,
        order_items.quantity,
        order_items.unit_price
      FROM order_items
      JOIN products ON products.id = order_items.product_id
      WHERE order_items.order_id = ?
      `,
    )
    .all(orderId) as OrderItemRow[];
}

export function createOrder(input: CreateOrderInput) {
  db.exec("BEGIN TRANSACTION;");

  try {
    const orderResult = db
      .prepare(
        `
        INSERT INTO orders (
          user_id,
          order_number,
          total_amount,
          status,
          shipping_name,
          shipping_address,
          shipping_phone,
          payment_method
        )
        VALUES (?, ?, ?, 'processing', ?, ?, ?, ?)
        `,
      )
      .run(
        Number(input.userId),
        input.orderNumber,
        input.totalAmount,
        input.shippingName,
        input.shippingAddress,
        input.shippingPhone,
        input.paymentMethod,
      );

    const orderId = Number(orderResult.lastInsertRowid);
    const insertItem = db.prepare(
      `
      INSERT INTO order_items (order_id, product_id, quantity, unit_price)
      VALUES (?, ?, ?, ?)
      `,
    );

    for (const item of input.items) {
      insertItem.run(orderId, item.productId, item.quantity, item.unitPrice);
    }

    db.exec("COMMIT;");

    return getOrderById(String(orderId));
  } catch (error) {
    db.exec("ROLLBACK;");
    throw error;
  }
}

export function getOrdersByUserId(userId: string) {
  const rows = db
    .prepare(
      `
      SELECT
        id,
        order_number,
        total_amount,
        status,
        shipping_name,
        shipping_address,
        shipping_phone,
        payment_method,
        created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
    )
    .all(Number(userId)) as OrderRow[];

  return rows.map((row) => mapOrder(row, getOrderItems(row.id)));
}

export function getOrderById(id: string) {
  const row = db
    .prepare(
      `
      SELECT
        id,
        order_number,
        total_amount,
        status,
        shipping_name,
        shipping_address,
        shipping_phone,
        payment_method,
        created_at
      FROM orders
      WHERE id = ?
      `,
    )
    .get(Number(id)) as OrderRow | undefined;

  return row ? mapOrder(row, getOrderItems(row.id)) : null;
}

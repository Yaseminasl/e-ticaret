"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Order } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      const response = await fetch("/api/orders");

      if (response.ok) {
        const data = (await response.json()) as { orders: Order[] };
        setOrders(data.orders);
      }

      setIsLoading(false);
    }

    void loadOrders();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Siparişlerim
          </p>
          <h1 className="mt-3 text-3xl font-bold">Sipariş Geçmişi</h1>
          <p className="mt-3 text-slate-600">
            Tamamladığın siparişleri ve sipariş durumlarını buradan takip
            edebilirsin.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-600">
            Siparişler yükleniyor...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold">Henüz siparişin yok</h2>
            <p className="mt-2 text-slate-600">
              Sipariş geçmişini görmek için önce alışverişini tamamlamalısın.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Ürünlere Git
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">
                      {order.orderNumber}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Teslimat: {order.shippingName} - {order.shippingPhone}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      {order.status}
                    </p>
                    <p className="mt-3 text-lg font-bold">
                      {order.totalAmount.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <h3 className="font-semibold">Ürünler</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {order.items.map((item) => (
                      <li
                        key={`${order.id}-${item.productId}`}
                        className="flex justify-between"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>
                          {item.lineTotal.toLocaleString("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                          })}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

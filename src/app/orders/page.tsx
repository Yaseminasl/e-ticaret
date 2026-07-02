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
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#338caa] dark:text-[#a32c2c]">
            Siparişlerim
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
            Sipariş Geçmişi
          </h1>
          <p className="mt-3 max-w-2xl text-[#6697a8] dark:text-[#D1D5DB]">
            Tamamladığın siparişleri ve sipariş durumlarını buradan takip
            edebilirsin.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-lg border border-[#D7BDF8] bg-white/80 p-10 text-center text-[#6A7F95] shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114] dark:text-[#D1D5DB]">
            Siparişler yükleniyor...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#D7BDF8] bg-white/80 p-10 text-center shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              Henüz siparişin yok
            </h2>
            <p className="mt-2 text-[#6A7F95] dark:text-[#D1D5DB]">
              Sipariş geçmişini görmek için önce alışverişini tamamlamalısın.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
            >
              Ürünlere Git
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-lg border border-[#D7BDF8] bg-white/80 p-5 shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-[#6A7F95] dark:text-[#9CA3AF]">
                      {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold text-slate-950 dark:text-white">
                      {order.orderNumber}
                    </h2>
                    <p className="mt-2 text-sm text-[#6A7F95] dark:text-[#D1D5DB]">
                      Teslimat: {order.shippingName} - {order.shippingPhone}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="rounded-full bg-[#D7ECFF] px-3 py-1 text-sm font-bold text-[#338caa] dark:bg-[#2A1218] dark:text-[#F5D0D8]">
                      {order.status}
                    </p>
                    <p className="mt-3 text-lg font-extrabold text-slate-950 dark:text-white">
                      {order.totalAmount.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </p>
                    <Link
                      href={`/orders/${order.id}`}
                      className="mt-3 inline-flex rounded-md bg-[#338caa] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
                    >
                      Detay
                    </Link>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#D7BDF8] pt-4 dark:border-[#5A1F2D]">
                  <h3 className="font-extrabold text-slate-950 dark:text-white">
                    Ürünler
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[#6A7F95] dark:text-[#D1D5DB]">
                    {order.items.map((item) => (
                      <li
                        key={`${order.id}-${item.productId}`}
                        className="flex justify-between rounded-md bg-gradient-to-r from-[#FADADD] via-[#FFF2D8] to-[#D7ECFF] px-4 py-3 dark:bg-none dark:bg-[#0B0B0C]"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-bold text-slate-950 dark:text-white">
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

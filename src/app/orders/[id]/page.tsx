"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Order } from "@/types/order";

type OrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      const { id } = await params;
      const response = await fetch(`/api/orders/${id}`);

      if (response.ok) {
        const data = (await response.json()) as { order: Order };
        setOrder(data.order);
      }

      setIsLoading(false);
    }

    void loadOrder();
  }, [params]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-600">
            Sipariş detayı yükleniyor...
          </div>
        </section>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
            <h1 className="text-2xl font-bold">Sipariş bulunamadı</h1>
            <Link
              href="/orders"
              className="mt-6 inline-flex rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Siparişlerime Dön
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/orders"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          Siparişlerime dön
        </Link>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                Sipariş Detayı
              </p>
              <h1 className="mt-2 text-3xl font-bold">{order.orderNumber}</h1>
              <p className="mt-2 text-slate-600">
                {new Date(order.createdAt).toLocaleDateString("tr-TR")}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                {order.status}
              </p>
              <p className="mt-3 text-2xl font-bold">
                {order.totalAmount.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Alıcı</p>
              <p className="mt-1 font-semibold">{order.shippingName}</p>
            </div>

            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Telefon</p>
              <p className="mt-1 font-semibold">{order.shippingPhone}</p>
            </div>

            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Ödeme</p>
              <p className="mt-1 font-semibold">Kredi kartı</p>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Adres</p>
            <p className="mt-1 font-semibold">{order.shippingAddress}</p>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="text-xl font-semibold">Ürünler</h2>

            <ul className="mt-4 space-y-3">
              {order.items.map((item) => (
                <li
                  key={`${order.id}-${item.productId}`}
                  className="flex justify-between rounded-md border border-slate-200 p-4 text-sm"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="mt-1 text-slate-600">Adet: {item.quantity}</p>
                  </div>
                  <p className="font-bold">
                    {item.lineTotal.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

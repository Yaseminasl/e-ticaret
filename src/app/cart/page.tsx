"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();

  const cartProducts = items
    .map((item) => {
      const product = products.find(
        (productItem) => productItem.id === item.productId,
      );

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((product) => product !== null);

  const totalItems = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );
  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.lineTotal,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Sepet
          </p>
          <h1 className="mt-3 text-3xl font-bold">Alışveriş Sepeti</h1>
          <p className="mt-3 text-slate-600">
            Sepetindeki ürünleri kontrol et, miktarları düzenle ve siparişe
            devam et.
          </p>
        </div>

        {cartProducts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold">Sepetin boş</h2>
            <p className="mt-2 text-slate-600">
              Ürünleri inceleyip sepetine ekleyerek alışverişe başlayabilirsin.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Ürünlere Git
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cartProducts.map((product) => (
                <article
                  key={product.id}
                  className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[140px_1fr]"
                >
                  <img
                    src={`${product.imageUrl}?auto=format&fit=crop&w=400&q=80`}
                    alt={product.name}
                    className="h-32 w-full rounded-md object-cover"
                  />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-emerald-700">
                        {product.category}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold">
                        {product.name}
                      </h2>
                      <p className="mt-2 font-bold">
                        {product.price.toLocaleString("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, product.quantity - 1)
                        }
                        className="h-9 w-9 rounded-md border border-slate-300 font-bold hover:bg-slate-100"
                      >
                        -
                      </button>

                      <span className="w-8 text-center font-semibold">
                        {product.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, product.quantity + 1)
                        }
                        className="h-9 w-9 rounded-md border border-slate-300 font-bold hover:bg-slate-100"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold">Sepet Özeti</h2>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Toplam ürün</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span>Ara toplam</span>
                  <span>
                    {totalPrice.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between text-base font-bold text-slate-950">
                    <span>Genel toplam</span>
                    <span>
                      {totalPrice.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block rounded-md bg-slate-950 px-5 py-3 text-center font-semibold text-white hover:bg-slate-800"
              >
                Siparişe Devam Et
              </Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { getProductImageUrl } from "@/lib/image-url";
import type { Product } from "@/types/product";

type CartProduct = Product & {
  quantity: number;
  lineTotal: number;
};

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch("/api/products");
      const data = (await response.json()) as { products: Product[] };
      setProducts(data.products);
    }

    void loadProducts();
  }, []);

  const cartProducts = useMemo(
    () =>
      items
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
        .filter((product): product is CartProduct => product !== null),
    [items, products],
  );

  const isLoadingProducts = items.length > 0 && products.length === 0;
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
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#338caa] dark:text-[#a32c2c]">
            Sepet
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
            Alışveriş Sepeti
          </h1>
          <p className="mt-3 max-w-2xl text-[#6A7F95] dark:text-[#D1D5DB]">
            Sepetindeki ürünleri kontrol et, miktarları düzenle ve siparişe
            devam et.
          </p>
        </div>

        {isLoadingProducts ? (
          <div className="rounded-lg border border-[#D7BDF8] bg-white/80 p-10 text-center text-[#6A7F95] shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114] dark:text-[#D1D5DB]">
            Sepet yükleniyor...
          </div>
        ) : cartProducts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#D7BDF8] bg-white/80 p-10 text-center shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]">
            <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
              Sepetin boş
            </h2>
            <p className="mt-2 text-[#6A7F95] dark:text-[#D1D5DB]">
              Ürünleri inceleyip sepetine ekleyerek alışverişe başlayabilirsin.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
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
                  className="grid gap-4 rounded-lg border border-[#D7BDF8] bg-gradient-to-r from-white/85 via-[#FFF7E8]/75 to-[#EAF7FF]/85 p-4 shadow-sm backdrop-blur sm:grid-cols-[140px_1fr] dark:border-[#5A1F2D] dark:bg-none dark:bg-[#161114]"
                >
                  <Image
                    src={getProductImageUrl(
                      product.imageUrl,
                      "auto=format&fit=crop&w=400&q=80",
                    )}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="h-32 w-full rounded-md object-cover"
                  />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="inline-flex rounded-full bg-[#D7ECFF] px-3 py-1 text-xs font-bold text-[#338caa] dark:bg-[#2A1218] dark:text-[#F5D0D8]">
                        {product.category}
                      </p>
                      <h2 className="mt-2 text-lg font-extrabold text-slate-950 dark:text-white">
                        {product.name}
                      </h2>
                      <p className="mt-2 font-extrabold text-[#338caa] dark:text-[#F5D0D8]">
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
                        className="h-9 w-9 rounded-md border border-[#BDE0FE] bg-white/80 font-bold text-[#338caa] shadow-sm transition hover:bg-[#D7ECFF] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-[#F5D0D8] dark:hover:bg-[#2A1218]"
                      >
                        -
                      </button>

                      <span className="w-8 text-center font-extrabold text-slate-950 dark:text-white">
                        {product.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, product.quantity + 1)
                        }
                        className="h-9 w-9 rounded-md border border-[#BDE0FE] bg-white/80 font-bold text-[#338caa] shadow-sm transition hover:bg-[#D7ECFF] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-[#F5D0D8] dark:hover:bg-[#2A1218]"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="rounded-md px-3 py-2 text-sm font-bold text-[#D9534F] transition hover:bg-[#FADADD] dark:text-[#FB7185] dark:hover:bg-[#2A1218]"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-[#D7BDF8] bg-white/80 p-5 shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]">
              <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                Sepet Özeti
              </h2>

              <div className="mt-5 space-y-3 text-sm text-[#6A7F95] dark:text-[#D1D5DB]">
                <div className="flex justify-between rounded-md bg-gradient-to-r from-[#FADADD] to-[#D7ECFF] px-4 py-3 dark:bg-none dark:bg-[#0B0B0C]">
                  <span>Toplam ürün</span>
                  <span className="font-bold text-slate-950 dark:text-white">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between rounded-md bg-gradient-to-r from-[#FFF2D8] to-[#E6F6E8] px-4 py-3 dark:bg-none dark:bg-[#0B0B0C]">
                  <span>Ara toplam</span>
                  <span className="font-bold text-slate-950 dark:text-white">
                    {totalPrice.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </span>
                </div>

                <div className="border-t border-[#D7BDF8] pt-3 dark:border-[#5A1F2D]">
                  <div className="flex justify-between text-base font-extrabold text-slate-950 dark:text-white">
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
                className="mt-6 block rounded-md bg-[#338caa] px-5 py-3 text-center font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
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

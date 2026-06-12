"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/hooks/useCart";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  function onlyDigits(value: string) {
    return value.replace(/\D/g, "");
  }

  function formatPhone(value: string) {
    const digits = onlyDigits(value).slice(0, 11);

    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    if (digits.length <= 9) {
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    }

    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(
      7,
      9,
    )} ${digits.slice(9)}`;
  }

  function formatCardNumber(value: string) {
    return onlyDigits(value)
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiryDate(value: string) {
    const digits = onlyDigits(value).slice(0, 4);

    if (digits.length <= 2) return digits;

    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

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
        .filter((product) => product !== null),
    [items],
  );

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.lineTotal,
    0,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const generatedOrderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(
      Math.random() * 100000,
    )
      .toString()
      .padStart(5, "0")}`;

    setOrderNumber(generatedOrderNumber);
    setIsOrderComplete(true);
    clearCart();
  }

  if (isOrderComplete) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Sipariş Alındı
            </p>
            <h1 className="mt-3 text-3xl font-bold">
              Siparişin başarıyla oluşturuldu
            </h1>
            <p className="mt-4 text-slate-600">
              Sipariş numaran:
              <span className="ml-2 font-bold text-slate-950">
                {orderNumber}
              </span>
            </p>

            <div className="mt-8 flex justify-center gap-3">
              <Link
                href="/products"
                className="rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                Alışverişe Devam Et
              </Link>
              <Link
                href="/orders"
                className="rounded-md border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100"
              >
                Siparişlerim
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
            <h1 className="text-2xl font-bold">Sepetin boş</h1>
            <p className="mt-3 text-slate-600">
              Checkout sayfasına devam etmek için önce sepete ürün eklemelisin.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Ürünlere Git
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Checkout
          </p>
          <h1 className="mt-3 text-3xl font-bold">Siparişi Tamamla</h1>
          <p className="mt-3 text-slate-600">
            Teslimat bilgilerini gir ve simüle ödeme ile siparişini oluştur.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">Teslimat Bilgileri</h2>

            <div className="mt-5 grid gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Ad Soyad
                <input
                  required
                  name="shippingName"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
                  placeholder="Yasemin Asl"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Adres
                <textarea
                  required
                  name="shippingAddress"
                  rows={4}
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
                  placeholder="Mahalle, sokak, bina no, ilçe/il"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Telefon
                <input
                  required
                  name="shippingPhone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(event) =>
                    setPhone(formatPhone(event.target.value))
                  }
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
                  placeholder="05xx xxx xx xx"
                />
              </label>
            </div>

            <h2 className="mt-8 text-xl font-semibold">Simüle Ödeme</h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
                Kart Numarası
                <input
                  required
                  name="cardNumber"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(event) =>
                    setCardNumber(formatCardNumber(event.target.value))
                  }
                  minLength={19}
                  maxLength={19}
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
                  placeholder="4242 4242 4242 4242"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Son Kullanma
                <input
                  required
                  name="expiryDate"
                  inputMode="numeric"
                  value={expiryDate}
                  onChange={(event) =>
                    setExpiryDate(formatExpiryDate(event.target.value))
                  }
                  minLength={5}
                  maxLength={5}
                  placeholder="12/30"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                CVV
                <input
                  required
                  name="cvv"
                  inputMode="numeric"
                  value={cvv}
                  onChange={(event) =>
                    setCvv(onlyDigits(event.target.value).slice(0, 4))
                  }
                  minLength={3}
                  maxLength={4}
                  placeholder="123"
                  className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Siparişi Tamamla
            </button>
          </form>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">Sipariş Özeti</h2>

            <div className="mt-5 space-y-4">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-slate-600">Adet: {product.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {product.lineTotal.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Toplam</span>
                <span>
                  {totalPrice.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState, type FormEvent } from "react";

const trustItems = [
  {
    title: "Güvenli Alışveriş",
    description:
      "Kullanıcı oturumu, sepet ve sipariş akışı kontrollü şekilde yönetilir.",
  },
  {
    title: "Hızlı Sipariş Takibi",
    description:
      "Kullanıcılar sipariş geçmişini ve sipariş detaylarını hesabından görebilir.",
  },
  {
    title: "Modern Ürün Deneyimi",
    description:
      "Ürün detayları, yorumlar, renk seçenekleri ve kategori filtreleriyle desteklenir.",
  },
];

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSent(true);
    event.currentTarget.reset();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#007ea8] dark:text-[#F5D0D8]">
            Hakkımızda
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
            Modern, güvenilir ve kullanıcı dostu alışveriş deneyimi
          </h1>
          <p className="mt-3 max-w-3xl text-[#6697a8] dark:text-[#D1D5DB]">
            Bu e-ticaret uygulaması; ürün keşfi, sepet yönetimi, kullanıcı
            girişi, sipariş oluşturma ve sipariş takibi süreçlerini tek bir
            modern arayüzde göstermek için geliştirildi.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-lg border border-[#D7BDF8] bg-white/80 p-6 shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]">
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#338caa] dark:text-[#F5D0D8]">
              Proje Hakkında
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-950 dark:text-white">
              Mezuniyet projesi olarak tasarlandı
            </h2>
            <p className="mt-4 leading-8 text-[#6A7F95] dark:text-[#D1D5DB]">
              Projede Next.js, TypeScript, Tailwind CSS ve SQLite kullanıldı.
              Kullanıcılar ürünleri kategoriye göre inceleyebilir, sepete ürün
              ekleyebilir, ödeme adımından sipariş oluşturabilir ve sipariş
              geçmişini takip edebilir.
            </p>

            <div className="mt-6 grid gap-4">
              {trustItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-md bg-gradient-to-r from-[#FADADD] via-[#FFF2D8] to-[#D7ECFF] p-4 dark:bg-none dark:bg-[#0B0B0C] dark:ring-1 dark:ring-[#5A1F2D]"
                >
                  <h3 className="font-extrabold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#6A7F95] dark:text-[#D1D5DB]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[#D7BDF8] bg-white/80 p-6 shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]">
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#338caa] dark:text-[#F5D0D8]">
              İletişim
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-950 dark:text-white">
              Bize ulaş
            </h2>

            <div className="mt-5 space-y-3 text-[#6A7F95] dark:text-[#D1D5DB]">
              <div className="rounded-md bg-white/70 p-4 dark:bg-[#0B0B0C] dark:ring-1 dark:ring-[#5A1F2D]">
                <p className="text-sm text-[#8A78A8] dark:text-[#A3A3A3]">
                  E-posta
                </p>
                <p className="mt-1 font-bold text-slate-950 dark:text-white">
                  destek@eticaret-demo.com
                </p>
              </div>

              <div className="rounded-md bg-white/70 p-4 dark:bg-[#0B0B0C] dark:ring-1 dark:ring-[#5A1F2D]">
                <p className="text-sm text-[#8A78A8] dark:text-[#A3A3A3]">
                  Telefon
                </p>
                <p className="mt-1 font-bold text-slate-950 dark:text-white">
                  0850 000 00 00
                </p>
              </div>

              <div className="rounded-md bg-white/70 p-4 dark:bg-[#0B0B0C] dark:ring-1 dark:ring-[#5A1F2D]">
                <p className="text-sm text-[#8A78A8] dark:text-[#A3A3A3]">
                  Adres
                </p>
                <p className="mt-1 font-bold text-slate-950 dark:text-white">
                  İstanbul, Türkiye
                </p>
              </div>
            </div>

            {isSent ? (
              <div className="mt-5 rounded-md border border-[#BDE0FE] bg-[#D7ECFF] p-4 text-sm font-bold text-[#338caa] dark:border-[#5A1F2D] dark:bg-[#2A1218] dark:text-[#F5D0D8]">
                Mesajınız alındı. En kısa sürede dönüş yapılacaktır.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="flex flex-col gap-2 text-sm font-semibold text-[#7B668F] dark:text-[#D1D5DB]">
                Ad Soyad
                <input
                  required
                  name="name"
                  className="rounded-md border border-[#F3BBD6] bg-white/85 px-3 py-2 text-slate-950 outline-none focus:border-[#CBA6F7] focus:ring-2 focus:ring-[#E9D5FF] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-white dark:focus:border-[#BE123C] dark:focus:ring-[#3B1018]"
                  placeholder="Adını yaz"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-[#7B668F] dark:text-[#D1D5DB]">
                Mesaj
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="rounded-md border border-[#BDE0FE] bg-white/85 px-3 py-2 text-slate-950 outline-none focus:border-[#CBA6F7] focus:ring-2 focus:ring-[#E9D5FF] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-white dark:focus:border-[#BE123C] dark:focus:ring-[#3B1018]"
                  placeholder="Mesajını yaz"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
              >
                Mesaj Gönder
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}

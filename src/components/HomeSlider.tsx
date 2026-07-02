"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    title: "Yeni sezon çanta koleksiyonu",
    description:
      "Laptop çantaları, kadın sırt çantaları ve günlük aksesuarlarla stilini tamamla.",
    image: "/products/laptop-cantasi-sirt.png",
    href: "/products",
    badge: "Yeni Koleksiyon",
  },
  {
    title: "Teknoloji ürünlerinde modern seçimler",
    description:
      "Kulaklık, akıllı saat, klavye ve taşınabilir ürünleri kolayca keşfet.",
    image:
      "https://cdn03.ciceksepeti.com/cicek/kc7213266-1/L/e6s-true-kablosuz-kulaklik-dijital-gostergeli-ekranli-bluetooth-5-0-kulaklik-kc7213266-1-dcc3057984294389ac5dd9e215ee1c7f.jpg",
    href: "/products",
    badge: "Popüler Ürünler",
  },
  {
    title: "Bakım ve yaşam ürünleri bir arada",
    description:
      "Cilt bakım setleri, ev yaşam ürünleri ve özel seçimlerle alışverişi keyifli hale getir.",
    image: "/products/cilt-bakim-seti.png",
    href: "/products",
    badge: "Öne Çıkanlar",
  },
];

export function HomeSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  function goToPreviousSlide() {
    setActiveSlide((currentSlide) =>
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1,
    );
  }

  function goToNextSlide() {
    setActiveSlide((currentSlide) =>
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-[#D7BDF8] bg-white/80 shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#007ea8] dark:text-[#F5D0D8]">
            {slide.badge}
          </p>

          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight text-[#338caa] dark:text-white sm:text-5xl">
            {slide.title}
          </h1>

          <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-[#6697a8] dark:text-[#D1D5DB]">
            {slide.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={slide.href}
              className="rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
            >
              Ürünleri İncele
            </Link>

            <Link
              href="/register"
              className="rounded-md border border-[#BDE0FE] bg-white/70 px-5 py-3 font-bold text-[#338caa] shadow-sm transition hover:bg-[#D7ECFF] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-[#F5D0D8] dark:hover:bg-[#2A1218]"
            >
              Hesap Oluştur
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Önceki banner"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#BDE0FE] bg-white/80 text-xl font-bold text-[#338caa] shadow-sm transition hover:bg-[#D7ECFF] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-[#F5D0D8] dark:hover:bg-[#2A1218]"
            >
              ‹
            </button>

            <div className="flex gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`${index + 1}. banner`}
                  className={`h-2.5 rounded-full transition ${
                    activeSlide === index
                      ? "w-9 bg-[#338caa] dark:bg-[#BE123C]"
                      : "w-2.5 bg-[#BDE0FE] dark:bg-[#5A1F2D]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Sonraki banner"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#BDE0FE] bg-white/80 text-xl font-bold text-[#338caa] shadow-sm transition hover:bg-[#D7ECFF] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-[#F5D0D8] dark:hover:bg-[#2A1218]"
            >
              ›
            </button>
          </div>
        </div>

        <div className="relative min-h-[320px]">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

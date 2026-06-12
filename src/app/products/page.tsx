"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const categories = [
  "Tümü",
  ...Array.from(new Set(products.map((product) => product.category))),
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortOption, setSortOption] = useState("default");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("tr-TR");

    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Tümü" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((firstProduct, secondProduct) => {
      if (sortOption === "price-asc") {
        return firstProduct.price - secondProduct.price;
      }

      if (sortOption === "price-desc") {
        return secondProduct.price - firstProduct.price;
      }

      if (sortOption === "name-asc") {
        return firstProduct.name.localeCompare(secondProduct.name, "tr");
      }

      return firstProduct.id - secondProduct.id;
    });
  }, [searchTerm, selectedCategory, sortOption]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Ürünler
          </p>
          <h1 className="mt-3 text-3xl font-bold">Tüm Ürünler</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Ürünleri adına göre ara, kategoriyle filtrele ve fiyata göre sırala.
          </p>
        </div>

        <div className="mb-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Arama
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Ürün adı ara"
              className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Kategori
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Sıralama
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
            >
              <option value="default">Varsayılan</option>
              <option value="price-asc">Fiyat: düşükten yükseğe</option>
              <option value="price-desc">Fiyat: yüksekten düşüğe</option>
              <option value="name-asc">İsim: A-Z</option>
            </select>
          </label>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showDescription />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            Aramana uygun ürün bulunamadı.
          </div>
        )}
      </section>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

type ProductFiltersProps = {
  products: Product[];
};

const allCategoriesLabel = "Tümü";

export function ProductFilters({ products }: ProductFiltersProps) {
  const categories = useMemo(
    () => [
      allCategoriesLabel,
      ...Array.from(new Set(products.map((product) => product.category))),
    ],
    [products],
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(allCategoriesLabel);
  const [sortOption, setSortOption] = useState("default");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("tr-TR");

    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLocaleLowerCase("tr-TR")
        .includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === allCategoriesLabel ||
        product.category === selectedCategory;

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
  }, [products, searchTerm, selectedCategory, sortOption]);

  return (
    <>
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
    </>
  );
}

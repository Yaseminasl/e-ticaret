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
      if (sortOption === "price-asc")
        return firstProduct.price - secondProduct.price;
      if (sortOption === "price-desc")
        return secondProduct.price - firstProduct.price;
      if (sortOption === "name-asc")
        return firstProduct.name.localeCompare(secondProduct.name, "tr");

      return firstProduct.id - secondProduct.id;
    });
  }, [products, searchTerm, selectedCategory, sortOption]);

  return (
    <>
      <div className="mb-8 rounded-lg border border-pink-200 bg-gradient-to-r from-white/80 via-pink-50/90 to-sky-50/90 p-5 shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-none dark:bg-[#161114]">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-[#E5E7EB]">
            Arama
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Ürün adı ara"
              className="rounded-md border border-pink-200 bg-white/85 px-3 py-2 text-slate-950 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 dark:border-[#5A1F2D] dark:bg-[#070707] dark:text-white dark:focus:border-[#9F1239] dark:focus:ring-[#3B1018]"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-[#E5E7EB]">
            Kategori
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-md border border-sky-200 bg-white/85 px-3 py-2 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-[#5A1F2D] dark:bg-[#070707] dark:text-white dark:focus:border-[#9F1239] dark:focus:ring-[#3B1018]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-[#E5E7EB]">
            Sıralama
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="rounded-md border border-violet-200 bg-white/85 px-3 py-2 text-slate-950 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-[#5A1F2D] dark:bg-[#070707] dark:text-white dark:focus:border-[#9F1239] dark:focus:ring-[#3B1018]"
            >
              <option value="default">Varsayılan</option>
              <option value="price-asc">Fiyat: düşükten yükseğe</option>
              <option value="price-desc">Fiyat: yüksekten düşüğe</option>
              <option value="name-asc">İsim: A-Z</option>
            </select>
          </label>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} showDescription />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-pink-300 bg-gradient-to-r from-pink-50 via-yellow-50 to-sky-50 p-10 text-center font-semibold text-slate-600 shadow-sm dark:border-[#5A1F2D] dark:bg-none dark:bg-[#161114] dark:text-[#E5E7EB]">
          Aramana uygun ürün bulunamadı.
        </div>
      )}
    </>
  );
}

import { Suspense } from "react";
import { ProductFilters } from "../../components/ProductFilters";
import { getProducts } from "@/lib/products";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#338caa] dark:text-[#F5D0D8]">
            Ürünler
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-[#F8FAFC]">
            Tüm Ürünler
          </h1>

          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-[#6697a8] dark:text-[#E5E7EB]">
            Ürünleri adına göre ara, kategoriyle filtrele ve fiyata göre sırala.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-lg border border-[#D7BDF8] bg-white/80 p-10 text-center font-semibold text-[#6697a8] shadow-sm dark:border-[#5A1F2D] dark:bg-[#161114] dark:text-[#D1D5DB]">
              Ürünler yükleniyor...
            </div>
          }
        >
          <ProductFilters products={products} />
        </Suspense>
      </section>
    </main>
  );
}

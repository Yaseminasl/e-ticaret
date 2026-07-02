import { ProductFilters } from "../../components/ProductFilters";
import { getProducts } from "@/lib/products";

export default function ProductsPage() {
  const products = getProducts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#007ea8]">
            Ürünler
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-[#338caa] dark:text-[#835ace]">
            Tüm Ürünler
          </h1>

          <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-[#6697a8] dark:text-[#a786d8]">
            Ürünleri adına göre ara, kategoriyle filtrele ve fiyata göre sırala.
          </p>
        </div>

        <ProductFilters products={products} />
      </section>
    </main>
  );
}

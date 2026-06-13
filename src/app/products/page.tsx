import { ProductFilters } from "../../components/ProductFilters";
import { getProducts } from "@/lib/products";

export default function ProductsPage() {
  const products = getProducts();

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

        <ProductFilters products={products} />
      </section>
    </main>
  );
}

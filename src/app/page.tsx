import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#007ea8] dark:text-[#ffaaaa]">
            Mezuniyet Projesi
          </p>

          <h1 className="mt-4 text-4xl font-extrabold text-[#338caa] dark:text-white sm:text-5xl">
            Modern bir e-ticaret deneyimi
          </h1>

          <p className="mt-5 text-lg font-medium leading-8 text-[#6697a8] dark:text-white">
            Ürünleri keşfet, sepete ekle, güvenli oturumla sipariş oluştur.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

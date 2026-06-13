import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Mezuniyet Projesi
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Modern bir e-ticaret deneyimi
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Ürünleri keşfet, sepete ekle, güvenli oturumla sipariş oluştur. Bu
            uygulama Next.js, TypeScript, Tailwind CSS ve SQLite ile
            geliştirilecek.
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

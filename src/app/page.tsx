import { HomeSlider } from "@/components/HomeSlider";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { CategoryShowcase } from "@/components/CategoryShowcase";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <HomeSlider />
        <CategoryShowcase />

        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#007ea8] dark:text-[#F5D0D8]">
            Mezuniyet Projesi
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
            Öne Çıkan Ürünler
          </h2>

          <p className="mt-3 max-w-2xl text-[#6697a8] dark:text-[#D1D5DB]">
            En çok ilgi gören ürünleri keşfet, sepete ekle ve güvenli sipariş
            akışını tamamla.
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

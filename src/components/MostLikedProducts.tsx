import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

type MostLikedProductsProps = {
  products: Product[];
};

export function MostLikedProducts({ products }: MostLikedProductsProps) {
  const likedProducts = products.slice(0, 4);

  return (
    <section>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#007ea8] dark:text-[#F5D0D8]">
            En Çok Beğenilenler
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
            Kullanıcıların favorileri
          </h2>
          <p className="mt-3 max-w-2xl text-[#6697a8] dark:text-[#D1D5DB]">
            Yüksek puan alan ve kullanıcıların en çok ilgi gösterdiği ürünleri
            keşfet.
          </p>
        </div>

        <div className="rounded-full bg-[#D7ECFF] px-4 py-2 text-sm font-extrabold text-[#338caa] dark:bg-[#2A1218] dark:text-[#F5D0D8]">
          Ortalama 4.8 / 5 puan
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {likedProducts.map((product) => (
          <div key={product.id} className="relative">
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-[#D9534F] shadow-sm dark:bg-[#2A1218] dark:text-[#F5D0D8]">
              ★ 4.8
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

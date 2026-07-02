import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Elektronik",
    description: "Kulaklık, saat, klavye ve teknoloji ürünleri",
    image:
      "https://cdn03.ciceksepeti.com/cicek/kc7213266-1/L/e6s-true-kablosuz-kulaklik-dijital-gostergeli-ekranli-bluetooth-5-0-kulaklik-kc7213266-1-dcc3057984294389ac5dd9e215ee1c7f.jpg",
    accent: "from-sky-100 to-cyan-50",
  },
  {
    name: "Giyim",
    description: "Ayakkabı, sweatshirt, tayt ve günlük parçalar",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    accent: "from-violet-100 to-pink-50",
  },
  {
    name: "Aksesuar",
    description: "Çanta, saat ve tamamlayıcı seçimler",
    image: "/products/laptop-cantasi.png",
    accent: "from-orange-100 to-yellow-50",
  },
  {
    name: "Kozmetik",
    description: "Cilt bakım setleri ve kişisel bakım ürünleri",
    image: "/products/cilt-bakim-seti.png",
    accent: "from-pink-100 to-rose-50",
  },
  {
    name: "Ev & Yaşam",
    description: "Dekorasyon ve günlük yaşam ürünleri",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    accent: "from-emerald-100 to-lime-50",
  },
  {
    name: "Spor",
    description: "Aktif yaşam ve antrenman ürünleri",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0",
    accent: "from-amber-100 to-orange-50",
  },
];

export function CategoryShowcase() {
  return (
    <section>
      <div className="mb-5">
        <p className="text-sm font-extrabold uppercase tracking-wide text-[#007ea8] dark:text-[#F5D0D8]">
          Kategoriler
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
          İlgini çeken kategoriyi seç
        </h2>
        <p className="mt-3 max-w-2xl text-[#6697a8] dark:text-[#D1D5DB]">
          Ürünleri kategoriye göre keşfet ve alışverişini daha hızlı tamamla.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/products?category=${encodeURIComponent(category.name)}`}
            className={`group overflow-hidden rounded-lg border border-[#D7BDF8] bg-gradient-to-br ${category.accent} shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#5A1F2D] dark:bg-none dark:bg-[#161114]`}
          >
            <div className="relative h-40">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
              <p className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-sm font-extrabold text-[#338caa] dark:bg-[#2A1218] dark:text-[#F5D0D8]">
                {category.name}
              </p>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                {category.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6A7F95] dark:text-[#D1D5DB]">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const featuredProducts = [
  {
    id: 1,
    name: "Kablosuz Kulaklık",
    category: "Elektronik",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 2,
    name: "Spor Ayakkabı",
    category: "Giyim",
    price: 2199.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 3,
    name: "Akıllı Saat",
    category: "Aksesuar",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
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
            <article
              key={product.id}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={`${product.image}?auto=format&fit=crop&w=800&q=80`}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-sm text-emerald-700">{product.category}</p>
                <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
                <p className="mt-3 text-lg font-bold">
                  {product.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

const footerLinks = [
  { href: "/products", label: "Ürünler" },
  { href: "/orders", label: "Siparişlerim" },
  { href: "/faq", label: "SSS" },
  { href: "/contact", label: "İletişim" },
  { href: "/terms", label: "Şartlar" },
];

export function Footer() {
  return (
    <footer className="border-t border-pink-200 bg-gradient-to-r from-pink-50 via-yellow-50 to-sky-50 dark:border-[#4A1C26] dark:bg-none dark:bg-[#09090B]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-extrabold text-pink-500 dark:text-[#F5D0D8]">
            Yasomanya
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-[#D1D5DB]">
            Ürün keşfi, sepet yönetimi, güvenli oturum ve sipariş takibi
            özellikleriyle hazırlanmış modern bir mezuniyet projesi.
          </p>
        </div>

        <div>
          <p className="font-bold text-slate-950 dark:text-white">
            Hızlı Erişim
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600 dark:text-[#D1D5DB]">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-pink-600 dark:hover:text-[#F5D0D8]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-bold text-slate-950 dark:text-white">
            Proje Bilgisi
          </p>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-[#D1D5DB]">
            <p>Next.js</p>
            <p>TypeScript</p>
            <p>Tailwind CSS</p>
            <p>SQLite</p>
          </div>
        </div>
      </div>

      <div className="border-t border-pink-100 px-6 py-4 text-center text-sm text-slate-500 dark:border-[#4A1C26] dark:text-[#A3A3A3]">
        © 2026 Yasomanya. Mezuniyet projesi kapsamında geliştirilmiştir.
      </div>
    </footer>
  );
}

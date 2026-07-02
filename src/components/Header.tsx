"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/products", label: "Ürünler" },
  { href: "/orders", label: "Siparişlerim" },
];

export function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { theme, isThemeReady, toggleTheme } = useTheme();

  const linkClass =
    "rounded-full px-3 py-2 transition hover:bg-white/70 hover:text-pink-600 dark:hover:bg-[#2A1218] dark:hover:text-[#F5D0D8]";

  return (
    <header className="border-b border-pink-200 bg-gradient-to-r from-pink-50 via-yellow-50 to-sky-50 shadow-sm dark:border-[#4A1C26] dark:bg-none dark:bg-[#09090B]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="rounded-md bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 bg-clip-text text-xl font-extrabold text-transparent dark:bg-none dark:text-[#F5D0D8]"
        >
          E-Ticaret
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-700 dark:text-[#F8FAFC]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}

          <Link href="/cart" className={linkClass}>
            Sepet ({totalItems})
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 dark:border-[#F5D0D8] dark:bg-[#F8FAFC] dark:text-[#111113] dark:hover:bg-[#F5D0D8]"
          >
            {isThemeReady && theme === "dark" ? "Light" : "Dark"}
          </button>

          {user ? (
            <>
              <Link href="/profile" className={linkClass}>
                Profil
              </Link>

              <button
                type="button"
                onClick={() => {
                  void logout();
                }}
                className="rounded-md bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:brightness-105 dark:from-[#7F1D1D] dark:via-[#BE123C] dark:to-[#DB2777]"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass}>
                Giriş
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:brightness-105 dark:from-[#7F1D1D] dark:via-[#BE123C] dark:to-[#DB2777]"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

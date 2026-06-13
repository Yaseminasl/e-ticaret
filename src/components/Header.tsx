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
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-slate-950 dark:text-white"
        >
          E-Ticaret
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-slate-700 dark:text-slate-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}

          <Link href="/cart" className="hover:text-emerald-700">
            Sepet ({totalItems})
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {isThemeReady && theme === "dark" ? "Light" : "Dark"}
          </button>

          {user ? (
            <>
              <Link href="/profile" className="hover:text-emerald-700">
                Profil
              </Link>
              <button
                type="button"
                onClick={() => {
                  void logout();
                }}
                className="rounded-md bg-slate-950 px-4 py-2 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-emerald-700">
                Giriş
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
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

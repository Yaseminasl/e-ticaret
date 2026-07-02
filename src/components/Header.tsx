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
    <header className="border-b border-pink-200 bg-gradient-to-r from-pink-50 via-yellow-50 to-sky-50 shadow-sm dark:border-slate-800 dark:bg-none dark:bg-slate-950">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="rounded-md bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 bg-clip-text text-xl font-extrabold text-transparent dark:from-pink-200 dark:via-violet-200 dark:to-sky-200"
        >
          E-Ticaret
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-700 dark:text-slate-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:bg-white/70 hover:text-pink-600 dark:hover:bg-slate-800 dark:hover:text-pink-200"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/cart"
            className="rounded-full px-3 py-2 transition hover:bg-white/70 hover:text-sky-700 dark:hover:bg-slate-800 dark:hover:text-sky-200"
          >
            Sepet ({totalItems})
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            {isThemeReady && theme === "dark" ? "Light" : "Dark"}
          </button>

          {user ? (
            <>
              <Link
                href="/profile"
                className="rounded-full px-3 py-2 transition hover:bg-white/70 hover:text-violet-700 dark:hover:bg-slate-800 dark:hover:text-violet-200"
              >
                Profil
              </Link>

              <button
                type="button"
                onClick={() => {
                  void logout();
                }}
                className="rounded-md bg-gradient-to-r from-[#338caa] via-[#7C3AED] to-[#DB2777] px-4 py-2 font-bold text-white shadow-sm transition hover:brightness-110"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-2 transition hover:bg-white/70 hover:text-violet-700 dark:hover:bg-slate-800 dark:hover:text-violet-200"
              >
                Giriş
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 px-4 py-2 font-semibold text-white shadow-sm transition hover:from-emerald-500 hover:via-sky-500 hover:to-violet-500"
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

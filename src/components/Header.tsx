"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/products", label: "Ürünler" },
];

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-slate-950">
          E-Ticaret
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-slate-700">
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

          <Link href="/login" className="hover:text-emerald-700">
            Giriş
          </Link>

          <Link
            href="/register"
            className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            Kayıt Ol
          </Link>
        </div>
      </nav>
    </header>
  );
}

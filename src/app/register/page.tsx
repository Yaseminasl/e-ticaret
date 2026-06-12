"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      register({
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      });

      router.push("/profile");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Kayıt sırasında bir hata oluştu.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex max-w-6xl justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase text-emerald-700">
            Hesap Oluştur
          </p>
          <h1 className="mt-3 text-3xl font-bold">Kayıt Ol</h1>
          <p className="mt-3 text-slate-600">
            Sipariş verebilmek ve sipariş geçmişini takip etmek için hesap
            oluştur.
          </p>

          {errorMessage ? (
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Ad Soyad
              <input
                required
                name="name"
                className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
                placeholder="Yasemin Asl"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              E-posta
              <input
                required
                name="email"
                type="email"
                className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
                placeholder="yasemin@example.com"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Şifre
              <input
                required
                name="password"
                type="password"
                minLength={6}
                className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-emerald-600"
                placeholder="En az 6 karakter"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Kayıt Ol
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Zaten hesabın var mı?{" "}
            <Link href="/login" className="font-semibold text-emerald-700">
              Giriş yap
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

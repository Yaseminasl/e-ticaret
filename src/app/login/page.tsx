"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") ?? "/profile";
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      await login({
        email: String(formData.get("email")),
        password: String(formData.get("password")),
      });

      router.push(redirectPath);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Giriş sırasında bir hata oluştu.",
      );
    }
  }

  return (
    <div className="w-full max-w-md rounded-lg border border-[#F5CDE3] bg-gradient-to-br from-white/85 via-[#FFF2D8]/80 to-[#F1E8FF]/85 p-7 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-none dark:bg-slate-900">
      <p className="text-sm font-extrabold uppercase tracking-wide text-[#F4A261]">
        Hoş Geldin
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-[#A47AC2] dark:text-[#DCC8FF]">
        Giriş Yap
      </h1>
      <p className="mt-3 leading-7 text-[#8A78A8] dark:text-slate-300">
        Siparişlerini takip etmek ve alışverişe devam etmek için hesabına giriş
        yap.
      </p>

      {errorMessage ? (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="flex flex-col gap-2 text-sm font-semibold text-[#7B668F] dark:text-slate-200">
          E-posta
          <input
            required
            name="email"
            type="email"
            className="rounded-md border border-[#F3BBD6] bg-white/85 px-3 py-2 text-slate-950 outline-none focus:border-[#CBA6F7] focus:ring-2 focus:ring-[#E9D5FF] dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="yasemin@example.com"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-[#7B668F] dark:text-slate-200">
          Şifre
          <input
            required
            name="password"
            type="password"
            minLength={6}
            className="rounded-md border border-[#BDE0FE] bg-white/85 px-3 py-2 text-slate-950 outline-none focus:border-[#CBA6F7] focus:ring-2 focus:ring-[#E9D5FF] dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Şifren"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-gradient-to-r from-[#F4A7B9] via-[#CBA6F7] to-[#9AD7F5] px-5 py-3 font-bold text-white shadow-sm transition hover:brightness-105"
        >
          Giriş Yap
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-[#8A78A8] dark:text-slate-300">
        Hesabın yok mu?{" "}
        <Link href="/register" className="font-bold text-[#A47AC2]">
          Kayıt ol
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex max-w-6xl justify-center px-6 py-12">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}

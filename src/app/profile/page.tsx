"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
            <h1 className="text-2xl font-bold">Profil için giriş yapmalısın</h1>
            <p className="mt-3 text-slate-600">
              Kullanıcı bilgilerini görüntülemek için hesabına giriş yap.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Giriş Yap
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase text-[#338caa]">
            Profil
          </p>
          <h1 className="mt-3 text-3xl font-bold">Hesap Bilgilerim</h1>

          <div className="mt-6 space-y-4 text-slate-700">
            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Ad Soyad</p>
              <p className="mt-1 font-semibold text-slate-950">{user.name}</p>
            </div>

            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-sm text-slate-500">E-posta</p>
              <p className="mt-1 font-semibold text-slate-950">{user.email}</p>
            </div>

            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Rol</p>
              <p className="mt-1 font-semibold text-slate-950">{user.role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              void logout();
            }}
            className="mt-6 rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#9368B0] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Çıkış Yap
          </button>
        </div>
      </section>
    </main>
  );
}

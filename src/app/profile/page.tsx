"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center dark:border-[#5A1F2D] dark:bg-[#161114]">
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
              Profil için giriş yapmalısın
            </h1>
            <p className="mt-3 text-slate-600 dark:text-[#D1D5DB]">
              Kullanıcı bilgilerini görüntülemek için hesabına giriş yap.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
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
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-[#5A1F2D] dark:bg-[#161114]">
          <p className="text-sm font-semibold uppercase text-[#338caa] dark:text-[#F5D0D8]">
            Profil
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            Hesap Bilgilerim
          </h1>

          <div className="mt-6 space-y-4 text-slate-700 dark:text-[#D1D5DB]">
            <div className="rounded-md bg-gradient-to-r from-[#FADADD] via-[#FFF2D8] to-[#D7ECFF] p-4 dark:bg-none dark:bg-[#0B0B0C] dark:ring-1 dark:ring-[#5A1F2D]">
              <p className="text-sm text-slate-500 dark:text-[#A3A3A3]">
                Ad Soyad
              </p>
              <p className="mt-1 font-semibold text-slate-950 dark:text-white">
                {user.name}
              </p>
            </div>

            <div className="rounded-md bg-gradient-to-r from-[#FADADD] via-[#FFF2D8] to-[#D7ECFF] p-4 dark:bg-none dark:bg-[#0B0B0C] dark:ring-1 dark:ring-[#5A1F2D]">
              <p className="text-sm text-slate-500 dark:text-[#A3A3A3]">
                E-posta
              </p>
              <p className="mt-1 font-semibold text-slate-950 dark:text-white">
                {user.email}
              </p>
            </div>

            <div className="rounded-md bg-gradient-to-r from-[#FADADD] via-[#FFF2D8] to-[#D7ECFF] p-4 dark:bg-none dark:bg-[#0B0B0C] dark:ring-1 dark:ring-[#5A1F2D]">
              <p className="text-sm text-slate-500 dark:text-[#A3A3A3]">Rol</p>
              <p className="mt-1 font-semibold text-slate-950 dark:text-white">
                {user.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              void logout();
            }}
            className="mt-6 rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
          >
            Çıkış Yap
          </button>
        </div>
      </section>
    </main>
  );
}

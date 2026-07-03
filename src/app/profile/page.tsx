"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types/user";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  if (digits.length <= 9) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`;
}

function ProfileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-gradient-to-r from-[#FADADD] via-[#FFF2D8] to-[#D7ECFF] p-4 dark:bg-none dark:bg-[#0B0B0C] dark:ring-1 dark:ring-[#5A1F2D]">
      <p className="text-sm text-slate-500 dark:text-[#A3A3A3]">{label}</p>
      <p className="mt-1 font-semibold text-slate-950 dark:text-white">
        {value || "Henüz eklenmedi"}
      </p>
    </div>
  );
}

function ProfileForm({
  user,
  logout,
  updateProfile,
}: {
  user: User;
  logout: () => Promise<void>;
  updateProfile: (input: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(formatPhone(user.phone));
  const [address, setAddress] = useState(user.address);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function cancelEdit() {
    setName(user.name);
    setEmail(user.email);
    setPhone(formatPhone(user.phone));
    setAddress(user.address);
    setMessage("");
    setError("");
    setIsEditing(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      await updateProfile({ name, email, phone, address });
      setMessage("Profil bilgilerin kaydedildi.");
      setIsEditing(false);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Profil bilgileri kaydedilemedi.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-[#5A1F2D] dark:bg-[#161114]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-[#338caa] dark:text-[#F5D0D8]">
            Profil
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
            Hesap Bilgilerim
          </h1>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-md bg-[#338caa] px-4 py-2 font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
          >
            Düzenle
          </button>
        ) : null}
      </div>

      {!isEditing ? (
        <div className="mt-6 space-y-4">
          <ProfileInfo label="Ad Soyad" value={name} />
          <ProfileInfo label="E-posta" value={email} />
          <ProfileInfo label="Telefon" value={phone} />
          <ProfileInfo label="Adres" value={address} />
          <ProfileInfo label="Rol" value={user.role} />

          {message ? (
            <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:bg-[#13251C] dark:text-[#BBF7D0]">
              {message}
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => {
              void logout();
            }}
            className="rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#2C7892] dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
          >
            Çıkış Yap
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Ad Soyad
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-md border border-pink-200 bg-white/80 px-4 py-3 outline-none focus:border-[#338caa] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-md border border-pink-200 bg-white/80 px-4 py-3 outline-none focus:border-[#338caa] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-semibold">
              Telefon
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
              placeholder="05xx xxx xx xx"
              className="mt-2 w-full rounded-md border border-pink-200 bg-white/80 px-4 py-3 outline-none focus:border-[#338caa] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-semibold">
              Adres
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-md border border-pink-200 bg-white/80 px-4 py-3 outline-none focus:border-[#338caa] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-white"
            />
          </div>

          {error ? (
            <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-[#2A1010] dark:text-[#FECACA]">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#2C7892] disabled:opacity-60 dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
            >
              {isSaving ? "Kaydediliyor..." : "Bilgileri Kaydet"}
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-md border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-100 dark:border-[#5A1F2D] dark:text-white dark:hover:bg-[#2A1218]"
            >
              Vazgeç
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const { user, isLoading, logout, updateProfile } = useAuth();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-slate-600">Profil yükleniyor...</p>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center dark:border-[#5A1F2D] dark:bg-[#161114]">
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
              Profil için giriş yapmalısın
            </h1>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-md bg-[#338caa] px-5 py-3 font-bold text-white"
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
        <ProfileForm
          key={user.id}
          user={user}
          logout={logout}
          updateProfile={updateProfile}
        />
      </section>
    </main>
  );
}

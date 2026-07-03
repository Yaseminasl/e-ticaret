"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type ReviewFormProps = {
  productId: number;
};

export function ReviewForm({ productId }: ReviewFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: String(formData.get("userName")),
          rating: Number(formData.get("rating")),
          comment: String(formData.get("comment")),
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Yorum gönderilemedi.");
      }

      form.reset();
      setMessage("Yorumunuz eklendi.");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Yorum gönderilemedi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-[#5A1F2D] dark:bg-[#161114]">
      <p className="text-sm font-semibold uppercase text-[#338caa] dark:text-[#F5D0D8]">
        Yorum Yaz
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
        Ürün hakkında deneyimini paylaş
      </h2>

      {message ? (
        <div className="mt-4 rounded-md bg-[#D7ECFF] p-3 text-sm font-bold text-[#338caa] dark:bg-[#2A1218] dark:text-[#F5D0D8]">
          {message}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-[#2A1218] dark:text-[#FCA5A5]">
          {errorMessage}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-[#D1D5DB]">
          Ad Soyad
          <input
            required
            name="userName"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-[#338caa] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-white"
            placeholder="Adını yaz"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-[#D1D5DB]">
          Puan
          <select
            required
            name="rating"
            defaultValue="5"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-[#338caa] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-white"
          >
            <option value="5">5 - Çok beğendim</option>
            <option value="4">4 - Beğendim</option>
            <option value="3">3 - Orta</option>
            <option value="2">2 - Beklediğim gibi değil</option>
            <option value="1">1 - Beğenmedim</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700 dark:text-[#D1D5DB]">
          Yorum
          <textarea
            required
            name="comment"
            rows={4}
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-[#338caa] dark:border-[#5A1F2D] dark:bg-[#0B0B0C] dark:text-white"
            placeholder="Ürün hakkındaki yorumunu yaz"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-[#338caa] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#2C7892] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#7F1D1D] dark:hover:bg-[#991B1B]"
        >
          {isSubmitting ? "Gönderiliyor..." : "Yorumu Gönder"}
        </button>
      </form>
    </div>
  );
}

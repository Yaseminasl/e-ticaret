import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { getProductImageUrl } from "@/lib/image-url";

type ProductCardProps = {
  product: Product;
  showDescription?: boolean;
};

const cardThemes = [
  {
    card: "from-pink-50 via-white to-sky-50 border-pink-200",
    pill: "bg-pink-100 text-pink-700",
    button: "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
  },
  {
    card: "from-sky-50 via-white to-cyan-50 border-sky-200",
    pill: "bg-sky-100 text-sky-700",
    button: "from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600",
  },
  {
    card: "from-violet-50 via-white to-fuchsia-50 border-violet-200",
    pill: "bg-violet-100 text-violet-700",
    button:
      "from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600",
  },
  {
    card: "from-orange-50 via-white to-amber-50 border-orange-200",
    pill: "bg-orange-100 text-orange-700",
    button:
      "from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
  },
  {
    card: "from-emerald-50 via-white to-lime-50 border-emerald-200",
    pill: "bg-emerald-100 text-emerald-700",
    button:
      "from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600",
  },
];

export function ProductCard({
  product,
  showDescription = false,
}: ProductCardProps) {
  const theme = cardThemes[product.id % cardThemes.length];

  return (
    <article
      className={`overflow-hidden rounded-lg border bg-gradient-to-br shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-none dark:bg-slate-900 ${theme.card}`}
    >
      <Image
        src={getProductImageUrl(
          product.imageUrl,
          "auto=format&fit=crop&w=800&q=80",
        )}
        alt={product.name}
        width={800}
        height={480}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <p
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold dark:bg-slate-800 dark:text-slate-200 ${theme.pill}`}
        >
          {product.category}
        </p>

        <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
          {product.name}
        </h2>

        {showDescription ? (
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {product.description}
          </p>
        ) : null}

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-lg font-bold text-slate-950 dark:text-white">
            {product.price.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })}
          </p>

          <Link
            href={`/products/${product.id}`}
            className={`rounded-md bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${theme.button} dark:from-slate-100 dark:to-slate-300 dark:text-slate-950 dark:hover:from-white dark:hover:to-slate-200`}
          >
            Detay
          </Link>
        </div>
      </div>
    </article>
  );
}

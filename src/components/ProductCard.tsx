import Link from "next/link";
import type { Product } from "@/types/product";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
  showDescription?: boolean;
};

export function ProductCard({
  product,
  showDescription = false,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <Image
        src={`${product.imageUrl}?auto=format&fit=crop&w=800&q=80`}
        alt={product.name}
        width={800}
        height={480}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <p className="text-sm text-emerald-700">{product.category}</p>
        <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>

        {showDescription ? (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {product.description}
          </p>
        ) : null}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold">
            {product.price.toLocaleString("tr-TR", {
              style: "currency",
              currency: "TRY",
            })}
          </p>

          <Link
            href={`/products/${product.id}`}
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Detay
          </Link>
        </div>
      </div>
    </article>
  );
}

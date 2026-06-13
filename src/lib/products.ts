import { db } from "@/lib/database";
import type { Product } from "@/types/product";

type ProductRow = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
  is_featured: number;
};

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    description: row.description,
    price: row.price,
    stock: row.stock,
    imageUrl: row.image_url,
    isFeatured: Boolean(row.is_featured),
  };
}

export function getProducts() {
  const rows = db
    .prepare(
      `
      SELECT
        products.id,
        products.name,
        products.slug,
        products.description,
        products.price,
        products.stock,
        products.image_url,
        products.is_featured,
        categories.name AS category
      FROM products
      JOIN categories ON categories.id = products.category_id
      ORDER BY products.id ASC
      `,
    )
    .all() as ProductRow[];

  return rows.map(mapProduct);
}

export function getFeaturedProducts() {
  return getProducts().filter((product) => product.isFeatured);
}

export function getProductById(id: number) {
  return getProducts().find((product) => product.id === id);
}

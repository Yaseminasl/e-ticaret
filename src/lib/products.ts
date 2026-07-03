import { db } from "@/lib/database";
import type {
  Product,
  ProductDetailInfo,
  ProductImage,
  ProductReview,
  ProductWithDetails,
} from "@/types/product";

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

type ProductDetailRow = {
  story: string;
  package_contents: string;
  materials: string;
  dimensions: string;
  usage_tips: string;
};

type ProductReviewRow = {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  photo_url: string | null;
  created_at: string;
};

type ProductImageRow = {
  id: number;
  color_name: string;
  image_url: string;
};

function splitList(value: string) {
  return value.split("|").filter(Boolean);
}

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

function mapDetail(
  row: ProductDetailRow | undefined,
): ProductDetailInfo | null {
  if (!row) {
    return null;
  }

  return {
    story: row.story,
    packageContents: splitList(row.package_contents),
    materials: splitList(row.materials),
    dimensions: splitList(row.dimensions),
    usageTips: splitList(row.usage_tips),
  };
}

function mapReview(row: ProductReviewRow): ProductReview {
  return {
    id: row.id,
    userName: row.user_name,
    rating: row.rating,
    comment: row.comment,
    photoUrl: row.photo_url,
    createdAt: row.created_at,
  };
}

function mapImage(row: ProductImageRow): ProductImage {
  return {
    id: row.id,
    colorName: row.color_name,
    imageUrl: row.image_url,
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

export function getProductWithDetailsById(
  id: number,
): ProductWithDetails | null {
  const product = getProductById(id);

  if (!product) {
    return null;
  }

  const detailRow = db
    .prepare(
      `
      SELECT story, package_contents, materials, dimensions, usage_tips
      FROM product_details
      WHERE product_id = ?
      `,
    )
    .get(id) as ProductDetailRow | undefined;

  const reviewRows = db
    .prepare(
      `
      SELECT id, user_name, rating, comment, photo_url, created_at
      FROM product_reviews
      WHERE product_id = ?
      ORDER BY created_at DESC
      `,
    )
    .all(id) as ProductReviewRow[];

  const imageRows = db
    .prepare(
      `
      SELECT id, color_name, image_url
      FROM product_images
      WHERE product_id = ?
      ORDER BY id ASC
      `,
    )
    .all(id) as ProductImageRow[];

  const reviews = reviewRows.map(mapReview);
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : 0;

  return {
    ...product,
    detailInfo: mapDetail(detailRow),
    reviews,
    images: imageRows.map(mapImage),
    averageRating,
  };
}

export type CreateProductReviewInput = {
  productId: number;
  userName: string;
  rating: number;
  comment: string;
};

export function createProductReview(
  input: CreateProductReviewInput,
): ProductReview {
  const createdAt = new Date().toISOString();

  const result = db
    .prepare(
      `
      INSERT INTO product_reviews
        (product_id, user_name, rating, comment, photo_url, created_at)
      VALUES
        (?, ?, ?, ?, ?, ?)
      `,
    )
    .run(
      input.productId,
      input.userName,
      input.rating,
      input.comment,
      null,
      createdAt,
    );

  return {
    id: Number(result.lastInsertRowid),
    userName: input.userName,
    rating: input.rating,
    comment: input.comment,
    photoUrl: null,
    createdAt,
  };
}

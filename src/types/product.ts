export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  isFeatured: boolean;
};

export type ProductDetailInfo = {
  story: string;
  packageContents: string[];
  materials: string[];
  dimensions: string[];
  usageTips: string[];
};

export type ProductReview = {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  photoUrl: string | null;
  createdAt: string;
};

export type ProductWithDetails = Product & {
  detailInfo: ProductDetailInfo | null;
  reviews: ProductReview[];
  images: ProductImage[];
  averageRating: number;
};

export type ProductImage = {
  id: number;
  colorName: string;
  imageUrl: string;
};

import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("data/ecommerce.db");

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    color_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

const productUpdates = [
  [2, "Spor Ayakkabı", "spor-ayakkabi", "/products/spor-ayakkabi.jpg"],
  [3, "Akıllı Saat", "akilli-saat", "/products/akilli-saat.png"],
  [
    6,
    "Oversize Tişört",
    "oversize-tisort",
    "/products/oversize-tisort-beyaz.png",
  ],
  [9, "Koşu Taytı", "kosu-tayti", "/products/kosu-tayti.png"],
  [13, "Tasarım Defteri", "tasarim-defteri", "/products/tasarim-defteri.png"],
  [14, "Yoga Matı", "yoga-mati", "/products/yoga-mati-lila.png"],
  [15, "Güneş Gözlüğü", "gunes-gozlugu", "/products/gunes-gozlugu.png"],
  [16, "Seramik Kupa", "seramik-kupa", "/products/seramik-kupa.png"],
  [19, "Bitki Saksısı", "bitki-saksisi", "/products/bitki-saksisi.png"],
  [
    20,
    "Fotoğraf Makinesi",
    "fotograf-makinesi",
    "/products/fotograf-makinesi.png",
  ],
];

const updateProduct = db.prepare(`
  UPDATE products
  SET name = ?, slug = ?, image_url = ?
  WHERE id = ?
`);

for (const [id, name, slug, imageUrl] of productUpdates) {
  updateProduct.run(name, slug, imageUrl, id);
}

const productImageGroups = [
  {
    productId: 6,
    images: [
      ["Beyaz", "/products/oversize-tisort-beyaz.png"],
      ["Mavi", "/products/oversize-tisort-mavi.png"],
      ["Siyah", "/products/oversize-tisort-siyah.png"],
    ],
  },
  {
    productId: 14,
    images: [
      ["Lila", "/products/yoga-mati-lila.png"],
      ["Mavi", "/products/yoga-mati-mavi.png"],
      ["Pembe", "/products/yoga-mati-pembe.png"],
      ["Yeşil", "/products/yoga-mati-yesil.png"],
    ],
  },
];

const insertImage = db.prepare(`
  INSERT INTO product_images (product_id, color_name, image_url)
  VALUES (?, ?, ?)
`);

for (const group of productImageGroups) {
  db.prepare("DELETE FROM product_images WHERE product_id = ?").run(
    group.productId,
  );

  for (const [colorName, imageUrl] of group.images) {
    insertImage.run(group.productId, colorName, imageUrl);
  }
}

db.close();

console.log("Mevcut ürün görselleri ve renk seçenekleri güncellendi.");

import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("data/ecommerce.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    color_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

db.prepare(
  `
  UPDATE products
  SET name = ?, slug = ?, description = ?, image_url = ?
  WHERE id = ?
  `,
).run(
  "Kadın Sırt Çantası",
  "kadin-sirt-cantasi",
  "Günlük kullanım, okul, ofis ve kısa geziler için tasarlanmış renkli kadın sırt çantası.",
  "/products/sirt-canta-pembe.png",
  8,
);

db.prepare("DELETE FROM product_images WHERE product_id = ?").run(8);

const insertImage = db.prepare(
  "INSERT INTO product_images (product_id, color_name, image_url) VALUES (?, ?, ?)",
);

insertImage.run(8, "Pembe", "/products/sirt-canta-pembe.png");
insertImage.run(8, "Mavi", "/products/sirt-canta-mavi.png");
insertImage.run(8, "Yeşil", "/products/sirt-canta-yesil.png");
insertImage.run(8, "Lila", "/products/sirt-canta-lila.png");

db.close();

console.log("Kadın sırt çantası ve renk görselleri güncellendi.");

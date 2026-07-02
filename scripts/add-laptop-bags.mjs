import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("data/ecommerce.db");

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS product_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER UNIQUE NOT NULL,
    story TEXT NOT NULL,
    package_contents TEXT NOT NULL,
    materials TEXT NOT NULL,
    dimensions TEXT NOT NULL,
    usage_tips TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS product_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    photo_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

db.prepare(
  `
  UPDATE products
  SET
    name = ?,
    slug = ?,
    description = ?,
    price = ?,
    stock = ?,
    image_url = ?,
    category_id = ?,
    is_featured = ?
  WHERE id = ?
`,
).run(
  "Laptop Omuz Çantası",
  "laptop-omuz-cantasi",
  "Günlük iş, okul ve kısa yolculuklar için şık, hafif ve korumalı laptop omuz çantası.",
  949.99,
  18,
  "/products/laptop-cantasi.png",
  3,
  0,
  4,
);

db.prepare(
  `
  INSERT OR IGNORE INTO products
    (id, name, slug, description, price, stock, image_url, category_id, is_featured)
  VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?)
`,
).run(
  21,
  "Laptop Sırt Çantası",
  "laptop-sirt-cantasi",
  "Laptopunu, defterlerini ve günlük eşyalarını düzenli taşımak isteyenler için modern laptop sırt çantası.",
  1199.99,
  16,
  "/products/laptop-cantasi-sirt.png",
  3,
  1,
);

db.prepare(
  `
  UPDATE products
  SET
    name = ?,
    description = ?,
    price = ?,
    stock = ?,
    image_url = ?,
    category_id = ?,
    is_featured = ?
  WHERE id = ?
`,
).run(
  "Laptop Sırt Çantası",
  "Laptopunu, defterlerini ve günlük eşyalarını düzenli taşımak isteyenler için modern laptop sırt çantası.",
  1199.99,
  16,
  "/products/laptop-cantasi-sirt.png",
  3,
  1,
  21,
);

const upsertDetail = db.prepare(`
  INSERT INTO product_details
    (product_id, story, package_contents, materials, dimensions, usage_tips)
  VALUES
    (?, ?, ?, ?, ?, ?)
  ON CONFLICT(product_id) DO UPDATE SET
    story = excluded.story,
    package_contents = excluded.package_contents,
    materials = excluded.materials,
    dimensions = excluded.dimensions,
    usage_tips = excluded.usage_tips
`);

upsertDetail.run(
  4,
  "Laptop Omuz Çantası, bilgisayarını sade ve zarif bir şekilde yanında taşımak isteyenler için tasarlandı. Ofise, okula ya da kafeye giderken hem düzenli hem de şık görünmeni sağlar. Hafif yapısı sayesinde gün içinde omzunu yormaz.",
  "1 adet laptop omuz çantası|Ayarlanabilir omuz askısı|Korumalı laptop bölmesi|Ön aksesuar cebi",
  "Suya dayanıklı dış kumaş|Yumuşak iç astar|Güçlendirilmiş fermuar|Dolgulu laptop koruma alanı",
  "13-15.6 inç laptoplarla uyumludur|Yaklaşık 40 x 30 x 7 cm|Hafif günlük taşıma formu",
  "Laptopu dolgulu bölmeye yerleştir|Şarj aleti ve küçük aksesuarları ön cebe koy|Nemli bezle silerek temizle|Aşırı ağır yükle uzun süre taşımaktan kaçın",
);

upsertDetail.run(
  21,
  "Laptop Sırt Çantası, yoğun günlerde bilgisayarını ve ihtiyaçlarını tek yerde toplamak isteyenler için hazırlandı. Ellerini serbest bırakır, ağırlığı iki omza dengeli dağıtır ve gün boyunca daha rahat hareket etmeni sağlar.",
  "1 adet laptop sırt çantası|Dolgulu laptop bölmesi|Geniş ana bölme|Küçük aksesuar cepleri|Ayarlanabilir sırt askıları",
  "Dayanıklı dokuma kumaş|Yumuşak iç astar|Dolgulu sırt paneli|Sağlam fermuar sistemi",
  "13-15.6 inç laptoplarla uyumludur|Yaklaşık 42 x 31 x 12 cm|Günlük kullanım için geniş hacim",
  "Laptopu arka korumalı bölmeye koy|Ağır eşyaları sırta yakın yerleştir|Askıları omuz hizana göre ayarla|Temizlik için nemli bez kullan",
);

db.prepare("DELETE FROM product_reviews WHERE product_id IN (?, ?)").run(4, 21);

const insertReview = db.prepare(`
  INSERT INTO product_reviews
    (product_id, user_name, rating, comment, photo_url, created_at)
  VALUES
    (?, ?, ?, ?, ?, ?)
`);

insertReview.run(
  4,
  "Elif K.",
  5,
  "Laptopum tam oturdu, omuzda hafif duruyor. Günlük kullanım için çok şık.",
  null,
  "2026-06-18",
);

insertReview.run(
  4,
  "Merve A.",
  4,
  "İç bölmesi korumalı ve düzenli. Rengi de görseldeki gibi geldi.",
  null,
  "2026-06-21",
);

insertReview.run(
  21,
  "Derya S.",
  5,
  "Hem laptopumu hem defterlerimi rahatça alıyor. Sırt askıları konforlu.",
  null,
  "2026-06-19",
);

insertReview.run(
  21,
  "İrem Y.",
  5,
  "Okul için aldım, çok kullanışlı. Ceplerinin ayrı olması büyük rahatlık.",
  null,
  "2026-06-24",
);

db.close();

console.log("Laptop omuz çantası ve laptop sırt çantası eklendi.");

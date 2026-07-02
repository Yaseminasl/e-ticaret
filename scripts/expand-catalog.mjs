import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("data/ecommerce.db");

db.exec(`
  INSERT OR IGNORE INTO categories (id, name, slug, description) VALUES
    (4, 'Kozmetik', 'kozmetik', 'Cilt bakımı ve kişisel bakım ürünleri'),
    (5, 'Ev & Yaşam', 'ev-yasam', 'Ev dekorasyonu ve günlük yaşam ürünleri'),
    (6, 'Kitap', 'kitap', 'Roman, kişisel gelişim ve tasarım kitapları'),
    (7, 'Spor', 'spor', 'Antrenman ve aktif yaşam ürünleri');

  INSERT OR IGNORE INTO products
    (id, name, slug, description, price, stock, image_url, category_id, is_featured)
  VALUES
    (11, 'Cilt Bakım Seti', 'cilt-bakim-seti', 'Nemlendirici, temizleyici ve serumdan oluşan bakım seti.', 749.99, 24, 'public/products/cilt-bakim-seti.png', 4, 1),
    (12, 'Doğal Mum', 'dogal-mum', 'Soya bazlı, vanilya kokulu dekoratif mum.', 249.99, 35, 'https://images.unsplash.com/photo-1603006905003-be475563bc59', 5, 0),
    (13, 'Tasarım Defteri', 'tasarim-defteri', 'Kalın kapaklı, çizgisiz premium not defteri.', 189.99, 50, 'https://images.unsplash.com/photo-1512820790803-83ca734da794', 6, 0),
    (14, 'Yoga Matı', 'yoga-mati', 'Kaymaz yüzeyli, hafif ve taşınabilir yoga matı.', 699.99, 19, 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0', 7, 1),
    (15, 'Güneş Gözlüğü', 'gunes-gozlugu', 'UV korumalı modern çerçeveli güneş gözlüğü.', 899.99, 16, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083', 3, 0),
    (16, 'Seramik Kupa', 'seramik-kupa', 'Renkli sırlı, el yapımı görünümlü seramik kupa.', 219.99, 42, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d', 5, 0),
    (17, 'Kablosuz Mouse', 'kablosuz-mouse', 'Sessiz tıklamalı ergonomik kablosuz mouse.', 549.99, 28, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46', 1, 0),
    (18, 'Renkli Sweatshirt', 'renkli-sweatshirt', 'Yumuşak dokulu, oversize kesim renkli sweatshirt.', 999.99, 21, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7', 2, 1),
    (19, 'Bitki Saksısı', 'bitki-saksisi', 'Minimal tasarımlı seramik bitki saksısı.', 329.99, 33, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411', 5, 0),
    (20, 'Fotoğraf Makinesi', 'fotograf-makinesi', 'Başlangıç seviyesi kompakt dijital fotoğraf makinesi.', 4999.99, 7, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32', 1, 1);
`);

db.close();

console.log("Yeni kategori ve ürünler eklendi.");

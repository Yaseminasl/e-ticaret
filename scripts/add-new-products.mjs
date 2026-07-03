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

const products = [
  {
    id: 22,
    name: "Kulak Üstü Kulaklık",
    slug: "kulak-ustu-kulaklik",
    description:
      "Müzik, ders ve günlük kullanım için konforlu kulak üstü kulaklık.",
    price: 2499.99,
    stock: 20,
    image: "/products/kulaklik-siyah.png",
    categoryId: 1,
    featured: 1,
    images: [
      ["Siyah", "/products/kulaklik-siyah.png"],
      ["Beyaz", "/products/kulaklik-beyaz.png"],
      ["Bordo", "/products/kulaklik-bordo.png"],
      ["Lacivert", "/products/kulaklik-lacivert.png"],
      ["Mor", "/products/kulaklik-mor.png"],
    ],
    detail: {
      story:
        "Kulak Üstü Kulaklık, uzun süreli dinleme deneyiminde konforu ve güçlü sesi bir araya getirir. Ders çalışırken, yürüyüşte ya da evde müzik dinlerken dış dünyadan uzaklaşıp kendi alanını oluşturmanı sağlar.",
      packageContents:
        "1 adet kulak üstü kulaklık|USB şarj kablosu|Kullanım kılavuzu",
      materials:
        "Yumuşak kulak pedleri|Ayarlanabilir kafa bandı|Dayanıklı plastik gövde",
      dimensions:
        "Ayarlanabilir baş ölçüsü|Katlanabilir taşıma formu|Günlük kullanıma uygun hafif yapı",
      usageTips:
        "İlk kullanım öncesi tam şarj et|Uzun süre kullanırken ses seviyesini dengeli tut|Nemli bezle temizle",
    },
  },
  {
    id: 23,
    name: "LED Masa Lambası",
    slug: "led-masa-lambasi",
    description:
      "Çalışma masası, kitap okuma ve gece kullanımı için modern LED masa lambası.",
    price: 699.99,
    stock: 26,
    image: "/products/led-lamba-beyaz.png",
    categoryId: 1,
    featured: 0,
    images: [
      ["Beyaz", "/products/led-lamba-beyaz.png"],
      ["Siyah", "/products/led-lamba-siyah.png"],
    ],
    detail: {
      story:
        "LED Masa Lambası, çalışma alanını daha düzenli ve rahat hale getirmek için tasarlandı. Yumuşak ışık etkisiyle ders çalışırken, kitap okurken veya bilgisayar başında odaklanmayı destekler.",
      packageContents:
        "1 adet LED masa lambası|USB güç kablosu|Kullanım kılavuzu",
      materials: "Mat plastik gövde|LED ışık paneli|Kaymaz taban",
      dimensions: "Kompakt masaüstü boyut|Ayarlanabilir açı|Kablo ile kullanım",
      usageTips:
        "Göz hizasına doğrudan tutma|Kuru bezle temizle|Uzun süre kullanılmayacaksa fişten çıkar",
    },
  },
  {
    id: 24,
    name: "Powerbank",
    slug: "powerbank",
    description:
      "Telefonunu, kulaklığını ve küçük cihazlarını gün içinde şarj etmek için taşınabilir güç kaynağı.",
    price: 899.99,
    stock: 18,
    image: "/products/powerbank.png",
    categoryId: 1,
    featured: 1,
    images: [],
    detail: {
      story:
        "Powerbank, yoğun günlerde şarj kaygısını azaltır. Okulda, seyahatte ya da dışarıdayken cihazlarını yanında güvenle şarj edebilmeni sağlar.",
      packageContents: "1 adet powerbank|USB şarj kablosu|Kullanım kılavuzu",
      materials: "Dayanıklı dış kasa|Lityum batarya|USB bağlantı portu",
      dimensions:
        "Çanta ve cepte taşımaya uygun kompakt tasarım|Günlük kullanım için hafif yapı",
      usageTips:
        "İlk kullanım öncesi tam şarj et|Aşırı sıcak ortamda bırakma|Uygun kablo ile kullan",
    },
  },
  {
    id: 25,
    name: "Oversize Hoodie",
    slug: "oversize-hoodie",
    description:
      "Rahat kesimi ve renk seçenekleriyle günlük kombinlere uygun oversize hoodie.",
    price: 1199.99,
    stock: 30,
    image: "/products/oversize-hoodie-bordo.png",
    categoryId: 2,
    featured: 1,
    images: [
      ["Bordo", "/products/oversize-hoodie-bordo.png"],
      ["Beyaz", "/products/oversize-hoodie-beyaz.png"],
      ["Siyah", "/products/oversize-hoodie-siyah.png"],
      ["Turuncu", "/products/oversize-hoodie-turuncu.png"],
      ["Yeşil", "/products/oversize-hoodie-yesil.png"],
    ],
    detail: {
      story:
        "Oversize Hoodie, gün boyu rahat hissetmek isteyenler için tasarlandı. Yumuşak dokusu ve geniş kesimiyle hem evde hem dışarıda kolayca kombinlenir.",
      packageContents:
        "1 adet oversize hoodie|Renk seçeneğine göre ürün etiketi",
      materials:
        "Pamuk karışımlı kumaş|Yumuşak iç yüzey|Rahat ribana bilek ve etek ucu",
      dimensions:
        "Oversize kalıp|Günlük kullanıma uygun geniş kesim|Standart beden aralığı",
      usageTips: "Benzer renklerle yıka|Düşük ısıda kurut|Ters çevirerek ütüle",
    },
  },
  {
    id: 26,
    name: "Pamuklu Pijama Takımı",
    slug: "pamuklu-pijama-takimi",
    description:
      "Evde konforlu vakit geçirmek ve rahat uyku için pamuklu pijama takımı.",
    price: 999.99,
    stock: 22,
    image: "/products/pijama-takimi-gri.png",
    categoryId: 2,
    featured: 0,
    images: [
      ["Gri", "/products/pijama-takimi-gri.png"],
      ["Siyah", "/products/pijama-takimi-siyah.png"],
    ],
    detail: {
      story:
        "Pamuklu Pijama Takımı, günün yorgunluğunu atarken rahatlığı ön plana çıkarır. Yumuşak kumaşıyla evde geçirilen zamanı daha konforlu hale getirir.",
      packageContents: "1 adet pijama üstü|1 adet pijama altı",
      materials: "Pamuklu kumaş|Esnek bel bandı|Yumuşak dikiş detayları",
      dimensions: "Standart rahat kalıp|Ev ve uyku kullanımına uygun",
      usageTips:
        "30 derecede yıka|Benzer renklerle yıka|Kurutma makinesinde düşük ısı tercih et",
    },
  },
  {
    id: 27,
    name: "Minimal Kartlık",
    slug: "minimal-kartlik",
    description: "Kartlarını düzenli taşımak için sade ve şık minimal kartlık.",
    price: 349.99,
    stock: 35,
    image: "/products/kartlik-krem.png",
    categoryId: 3,
    featured: 0,
    images: [
      ["Krem", "/products/kartlik-krem.png"],
      ["Siyah", "/products/kartlik-siyah.png"],
    ],
    detail: {
      story:
        "Minimal Kartlık, çantanda ya da cebinde fazla yer kaplamadan kartlarını düzenli tutar. Sade tasarımıyla günlük kullanıma şık bir dokunuş katar.",
      packageContents: "1 adet minimal kartlık",
      materials: "Suni deri yüzey|Güçlendirilmiş dikiş|Kart bölmeleri",
      dimensions: "Kart boyutlarına uygun kompakt tasarım|İnce taşıma formu",
      usageTips:
        "Aşırı doldurmaktan kaçın|Nemli bezle temizle|Direkt güneşte uzun süre bırakma",
    },
  },
  {
    id: 28,
    name: "Takı Seti",
    slug: "taki-seti",
    description:
      "Günlük kombinleri tamamlayan zarif üçgen ve yuvarlak formlu takı seti.",
    price: 599.99,
    stock: 19,
    image: "/products/taki-seti-yuvarlak.png",
    categoryId: 3,
    featured: 1,
    images: [
      ["Yuvarlak", "/products/taki-seti-yuvarlak.png"],
      ["Üçgen", "/products/taki-seti-ucgen.png"],
    ],
    detail: {
      story:
        "Takı Seti, sade kombinlere zarif bir detay eklemek için tasarlandı. Günlük kullanımda minimal ama dikkat çekici bir görünüm sağlar.",
      packageContents: "1 adet takı seti|Saklama kutusu",
      materials: "Metal alaşım|Parlak yüzey kaplama|Hafif kullanım formu",
      dimensions: "Günlük kullanıma uygun minimal ölçüler|Hafif yapı",
      usageTips:
        "Parfüm ve sudan uzak tut|Kullanmadığında kutusunda sakla|Yumuşak bezle temizle",
    },
  },
  {
    id: 29,
    name: "Güneş Kremi",
    slug: "gunes-kremi",
    description: "Günlük cilt bakım rutinine uygun, hafif yapılı güneş kremi.",
    price: 449.99,
    stock: 28,
    image: "/products/gunes-kremi.png",
    categoryId: 4,
    featured: 0,
    images: [],
    detail: {
      story:
        "Güneş Kremi, cildini günlük dış etkenlere karşı koruma rutinine destek olur. Hafif yapısıyla ciltte ağırlık hissi bırakmadan günlük kullanıma uyum sağlar.",
      packageContents: "1 adet güneş kremi",
      materials:
        "Hafif krem formül|Cilt bakım destekleyici içerik|Günlük kullanım dokusu",
      dimensions: "Çantada taşımaya uygun ambalaj|Günlük kullanım boyutu",
      usageTips:
        "Dışarı çıkmadan önce uygula|Gün içinde ihtiyaç oldukça yenile|Göz çevresinden uzak tut",
    },
  },
  {
    id: 30,
    name: "Parfüm",
    slug: "parfum",
    description:
      "Günlük kullanım ve özel anlar için kalıcı, zarif kokulu parfüm.",
    price: 1299.99,
    stock: 16,
    image: "/products/parfum.png",
    categoryId: 4,
    featured: 1,
    images: [],
    detail: {
      story:
        "Parfüm, tarzını tamamlayan görünmez bir imza gibidir. Günlük kullanımda ferah, özel anlarda ise daha akılda kalıcı bir etki bırakır.",
      packageContents: "1 adet parfüm şişesi|Koruyucu kutu",
      materials: "Cam şişe|Sprey başlık|Koku esansı",
      dimensions: "Çantada taşımaya uygun şişe formu|Günlük kullanım boyutu",
      usageTips:
        "Bilek ve boyun bölgesine uygula|Direkt güneş ışığından uzak sakla|Kıyafete çok yakından sıkma",
    },
  },
  {
    id: 31,
    name: "Dekoratif Vazo",
    slug: "dekoratif-vazo",
    description:
      "Yaşam alanlarına renk ve sıcaklık katan modern dekoratif vazo.",
    price: 549.99,
    stock: 17,
    image: "/products/vazo.png",
    categoryId: 5,
    featured: 0,
    images: [],
    detail: {
      story:
        "Dekoratif Vazo, bulunduğu alana sakin ve estetik bir dokunuş katar. Salon, çalışma masası ya da raf dekorasyonunda kolayca kullanılabilir.",
      packageContents: "1 adet dekoratif vazo",
      materials: "Seramik görünümlü gövde|Mat yüzey|Dekoratif form",
      dimensions: "Masa ve raf kullanımına uygun orta boy tasarım",
      usageTips:
        "Kuru veya yapay çiçeklerle kullan|Yumuşak bezle temizle|Düşmeye karşı sabit zemine yerleştir",
    },
  },
  {
    id: 32,
    name: "Su Matarası",
    slug: "su-matarasi",
    description: "Spor, okul ve günlük kullanım için taşınabilir su matarası.",
    price: 299.99,
    stock: 40,
    image: "/products/su-matarasi.png",
    categoryId: 7,
    featured: 0,
    images: [],
    detail: {
      story:
        "Su Matarası, gün içinde su içmeyi hatırlatan pratik bir yardımcıdır. Spor çantasında, okulda ya da ofiste kolayca yanında taşınır.",
      packageContents: "1 adet su matarası",
      materials: "Dayanıklı plastik gövde|Sızdırmaz kapak|Taşınabilir form",
      dimensions:
        "Günlük kullanıma uygun kapasite|Çanta bölmelerine uyumlu tasarım",
      usageTips:
        "İlk kullanımdan önce yıka|Sıcak içeceklerle kullanma|Kapak kısmını düzenli temizle",
    },
  },
  {
    id: 33,
    name: "Planlayıcı Ajanda",
    slug: "planlayici-ajanda",
    description:
      "Günlük hedeflerini, derslerini ve yapılacaklarını düzenlemek için planlayıcı ajanda.",
    price: 259.99,
    stock: 45,
    image: "/products/planlayici-ajanda.png",
    categoryId: 6,
    featured: 0,
    images: [],
    detail: {
      story:
        "Planlayıcı Ajanda, gününü daha düzenli yönetmek isteyenler için tasarlandı. Dersler, hedefler ve yapılacaklar tek yerde toplanır.",
      packageContents: "1 adet planlayıcı ajanda",
      materials: "Kalın kapak|Kaliteli kağıt|Dikişli veya spiralli cilt yapısı",
      dimensions: "Çantada taşımaya uygun boyut|Günlük planlama alanları",
      usageTips:
        "Güne başlamadan planını yaz|Öncelikleri işaretle|Haftalık hedeflerini düzenli takip et",
    },
  },
];

const insertProduct = db.prepare(`
  INSERT INTO products
    (id, name, slug, description, price, stock, image_url, category_id, is_featured)
  VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    name = excluded.name,
    slug = excluded.slug,
    description = excluded.description,
    price = excluded.price,
    stock = excluded.stock,
    image_url = excluded.image_url,
    category_id = excluded.category_id,
    is_featured = excluded.is_featured
`);

const insertImage = db.prepare(`
  INSERT INTO product_images (product_id, color_name, image_url)
  VALUES (?, ?, ?)
`);

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

const insertReview = db.prepare(`
  INSERT INTO product_reviews
    (product_id, user_name, rating, comment, photo_url, created_at)
  VALUES
    (?, ?, ?, ?, ?, ?)
`);

for (const product of products) {
  insertProduct.run(
    product.id,
    product.name,
    product.slug,
    product.description,
    product.price,
    product.stock,
    product.image,
    product.categoryId,
    product.featured,
  );

  db.prepare("DELETE FROM product_images WHERE product_id = ?").run(product.id);

  for (const [colorName, imageUrl] of product.images) {
    insertImage.run(product.id, colorName, imageUrl);
  }

  upsertDetail.run(
    product.id,
    product.detail.story,
    product.detail.packageContents,
    product.detail.materials,
    product.detail.dimensions,
    product.detail.usageTips,
  );

  db.prepare("DELETE FROM product_reviews WHERE product_id = ?").run(
    product.id,
  );

  insertReview.run(
    product.id,
    "Yasemin A.",
    5,
    "Ürün görseldeki gibi ve kullanımı çok rahat. Beklediğimden daha kaliteli duruyor.",
    null,
    "2026-07-03",
  );

  insertReview.run(
    product.id,
    "Elif K.",
    4,
    "Paketleme ve ürün detayları başarılı. Günlük kullanım için ideal.",
    null,
    "2026-07-03",
  );
}

db.close();

console.log("Yeni ürünler, renk seçenekleri, detaylar ve yorumlar eklendi.");

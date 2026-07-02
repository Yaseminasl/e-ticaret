import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("data/ecommerce.db");

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS product_details (
    product_id INTEGER PRIMARY KEY,
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

const details = [
  {
    productId: 1,
    story:
      "Kablosuz Kulaklık, gün içinde müziğe, toplantılara ve kısa molalara daha özgürce eşlik etsin diye seçildi. Kablo karmaşası olmadan hareket etmek isteyen kullanıcılar için rahat ve sade bir deneyim sunar.",
    packageContents:
      "1 adet kablosuz kulaklık|Şarj kutusu|USB şarj kablosu|Kullanım kılavuzu",
    materials: "ABS plastik gövde|Silikon kulak uçları|Manyetik şarj pinleri",
    dimensions:
      "Kulaklık: kompakt kulak içi tasarım|Şarj kutusu: cepte taşınabilir boyut|Ağırlık: hafif günlük kullanım",
    usageTips:
      "İlk kullanımdan önce tamamen şarj edin|Kulak uçlarını kulağınıza uygun seçin|Nemli bezle temizleyin",
  },
  {
    productId: 2,
    story:
      "Spor Ayakkabı, uzun yürüyüşlerde ve günlük tempoda ayağı yormayan hafif bir kullanım sunmak için tasarlandı. Kırmızı rengiyle sade kombinlere enerjik bir vurgu katar.",
    packageContents: "1 çift spor ayakkabı|Orijinal kutu|Yedek bağcık",
    materials:
      "Nefes alabilen tekstil yüzey|Esnek kauçuk taban|Yumuşak iç astar",
    dimensions:
      "Standart kalıp|Günlük kullanım için hafif yapı|Esnek taban yüksekliği",
    usageTips:
      "Kuru bezle temizleyin|Direkt ısıda kurutmayın|Spor ve günlük kullanım için uygundur",
  },
  {
    productId: 3,
    story:
      "Akıllı Saat, gün içindeki hareketini, bildirimlerini ve temel sağlık verilerini tek ekrandan takip etmek isteyenler için pratik bir yardımcıdır. Minimal tasarımıyla hem spor hem günlük stile uyum sağlar.",
    packageContents:
      "1 adet akıllı saat|Manyetik şarj kablosu|Kullanım kılavuzu",
    materials: "Silikon kayış|Alüminyum görünümlü kasa|Dayanıklı ekran yüzeyi",
    dimensions: "Ayarlanabilir kayış|Bileğe uygun kompakt ekran|Hafif gövde",
    usageTips:
      "İlk kurulumda telefonla eşleştirin|Şarj temas noktalarını kuru tutun|Su temasından sonra kurulayın",
  },
  {
    productId: 7,
    story:
      "Tablet Standı, çalışma masasını daha düzenli ve konforlu hale getirmek için seçildi. Video izlerken, ders çalışırken veya görüntülü görüşme yaparken tableti ideal açıya getirerek boyun ve bilek yorgunluğunu azaltır.",
    packageContents:
      "1 adet 360 derece dönebilen tablet standı|Kaymaz destek yüzeyi|Koruyucu kutu",
    materials:
      "Dayanıklı alüminyum alaşım|Kaymaz silikon pedler|Sağlam menteşe mekanizması",
    dimensions:
      "360 derece dönebilen başlık|Çift açılı ayarlanabilir gövde|Tablet ve telefon uyumlu masaüstü boyut",
    usageTips:
      "Cihazı standa ortalayarak yerleştirin|Açıyı ayarlarken menteşeden destek alın|Kaymaz yüzeyi kuru ve temiz tutun",
  },
  {
    productId: 9,
    story:
      "Koşu Taytı, hareket ederken rahat hissetmek ve antrenmana odaklanmak isteyen kullanıcılar için esnek bir deneyim sunar. Spor yaparken vücuda uyum sağlar ve enerjik bir görünüm verir.",
    packageContents: "1 adet koşu taytı|Bakım etiketi",
    materials: "Esnek spor kumaş|Nefes alabilen dokuma|Yumuşak bel bandı",
    dimensions:
      "Vücuda oturan esnek kalıp|Yüksek bel tasarım|Günlük spor kullanımına uygun",
    usageTips:
      "Benzer renklerle yıkayın|Düşük ısıda kurutun|Ağartıcı kullanmayın",
  },
  {
    productId: 10,
    story:
      "Mekanik Klavye, yazı yazarken ve oyun oynarken daha net, tok ve kontrollü bir his isteyen kullanıcılar için güçlü bir masaüstü tamamlayıcısıdır.",
    packageContents:
      "1 adet mekanik klavye|USB bağlantı kablosu|Tuş çıkarma aparatı|Kullanım kılavuzu",
    materials: "Dayanıklı plastik kasa|Mekanik switch yapısı|ABS tuş takımı",
    dimensions:
      "Kompakt masaüstü form|RGB aydınlatmalı tuş yapısı|Kablolu bağlantı",
    usageTips:
      "Tozu yumuşak fırçayla temizleyin|Sıvı temasından koruyun|RGB modlarını kullanım kılavuzundan değiştirin",
  },
];

const insertDetail = db.prepare(`
  INSERT OR REPLACE INTO product_details
    (product_id, story, package_contents, materials, dimensions, usage_tips)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const detail of details) {
  insertDetail.run(
    detail.productId,
    detail.story,
    detail.packageContents,
    detail.materials,
    detail.dimensions,
    detail.usageTips,
  );
}

db.exec(`
  DELETE FROM product_reviews;

  INSERT INTO product_reviews
    (product_id, user_name, rating, comment, photo_url)
  VALUES
    (1, 'Elif K.', 5, 'Ses kalitesi beklediğimden iyi çıktı. Toplantılarda da net kullanıyorum.', 'https://images.unsplash.com/photo-1512314889357-e157c22f938d'),
    (2, 'Mert A.', 5, 'Rengi çok canlı, uzun yürüyüşte ayağımı yormadı.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'),
    (3, 'Zeynep T.', 4, 'Bildirim takibi ve adım sayar günlük kullanımda çok pratik.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'),
    (7, 'Yasemin A.', 5, 'Ders çalışırken tableti göz hizasına almak çok rahat ettirdi. Masada sağlam duruyor.', 'https://kraftcover.shop/cdn/shop/files/1_45dbe657-b7a1-4d07-bb3c-88afa7e62ff9.png?v=1744119850&width=800'),
    (9, 'Dilan S.', 5, 'Kumaşı esnek ve rahat. Spor sırasında hareketi kısıtlamıyor.', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'),
    (10, 'Can B.', 4, 'Tuş hissi güzel, masa düzenini daha profesyonel gösterdi.', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3');
`);

db.close();

console.log("Ürün detay içerikleri ve yorumlar eklendi.");

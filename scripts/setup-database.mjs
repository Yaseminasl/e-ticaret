import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const databasePath = join(process.cwd(), "data", "ecommerce.db");

mkdirSync(dirname(databasePath), { recursive: true });

const db = new DatabaseSync(databasePath);

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    image_url TEXT,
    category_id INTEGER NOT NULL,
    is_featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    order_number TEXT UNIQUE NOT NULL,
    total_amount REAL NOT NULL,
    status TEXT NOT NULL,
    shipping_name TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_phone TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

db.exec(`
  INSERT OR IGNORE INTO categories (id, name, slug, description) VALUES
    (1, 'Elektronik', 'elektronik', 'Kulaklık, hoparlör ve teknoloji ürünleri'),
    (2, 'Giyim', 'giyim', 'Günlük giyim ve ayakkabı ürünleri'),
    (3, 'Aksesuar', 'aksesuar', 'Çanta, saat ve tamamlayıcı ürünler');

  INSERT OR IGNORE INTO products
    (id, name, slug, description, price, stock, image_url, category_id, is_featured)
  VALUES
    (1, 'Kablosuz Kulaklık', 'kablosuz-kulaklik', 'Gürültü azaltma özellikli, uzun pil ömürlü kablosuz kulaklık.', 1299.99, 18, 'https://cdn03.ciceksepeti.com/cicek/kc7213266-1/L/e6s-true-kablosuz-kulaklik-dijital-gostergeli-ekranli-bluetooth-5-0-kulaklik-kc7213266-1-dcc3057984294389ac5dd9e215ee1c7f.jpg', 1, 1),
    (2, 'Spor Ayakkabı', 'spor-ayakkabi', 'Günlük kullanım ve yürüyüş için hafif spor ayakkabı.', 2199.99, 12, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', 2, 1),
    (3, 'Akıllı Saat', 'akilli-saat', 'Adım, kalp ritmi ve bildirim takibi yapabilen akıllı saat.', 3499.99, 9, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', 3, 1),
    (4, 'Laptop Çantası', 'laptop-cantasi', 'Suya dayanıklı, çok bölmeli laptop taşıma çantası.', 799.99, 25, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', 3, 0),
    (5, 'Bluetooth Hoparlör', 'bluetooth-hoparlor', 'Taşınabilir, güçlü ses veren bluetooth hoparlör.', 999.99, 15, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1', 1, 0),
    (6, 'Basic Tişört', 'basic-tisort', 'Pamuklu kumaştan üretilmiş rahat kesim basic tişört.', 349.99, 40, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', 2, 0),
    (7, 'Tablet Standı', 'tablet-standi', 'Masaüstü kullanım için ayarlanabilir tablet ve telefon standı.', 449.99, 22, 'https://kraftcover.shop/cdn/shop/files/1_45dbe657-b7a1-4d07-bb3c-88afa7e62ff9.png?v=1744119850&width=800', 1, 0),    
    (8, 'Sırt Çantası', 'sirt-cantasi', 'Günlük kullanım için geniş hacimli sırt çantası.', 899.99, 17, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', 3, 0),
    (9, 'Koşu Taytı', 'kosu-tayti', 'Esnek kumaşlı spor ve koşu taytı.', 599.99, 30, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', 2, 0),    
    (10, 'Mekanik Klavye', 'mekanik-klavye', 'RGB aydınlatmalı kompakt mekanik klavye.', 1899.99, 11, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3', 1, 0);
`);

db.close();

console.log("SQLite veritabanı oluşturuldu: data/ecommerce.db");

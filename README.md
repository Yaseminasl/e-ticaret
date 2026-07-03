# Yasomanya

Yasomanya, Next.js, TypeScript, Tailwind CSS ve SQLite kullanılarak geliştirilmiş modern bir e-ticaret mezuniyet projesidir.

## Proje Özeti

Bu proje; kullanıcıların ürünleri inceleyebildiği, kategoriye göre filtreleyebildiği, sepete ürün ekleyebildiği, ödeme simülasyonu yapabildiği ve sipariş geçmişini takip edebildiği bir e-ticaret uygulamasıdır.

## Canlı Demo

Projeye aşağıdaki bağlantıdan ulaşabilirsiniz:

https://yasomanya.vercel.app/

## GitHub Repository

Proje kaynak kodlarına aşağıdaki bağlantıdan ulaşabilirsiniz:

https://github.com/Yaseminasl/e-ticaret

## Proje Tanıtım Videosu

Proje tanıtım videosu Google Drive üzerinden paylaşılacaktır.

Video linki:

```text
https://drive.google.com/file/d/18mhA3IinKdgxvgMNPR-NVWSblzU1yaA-/view?usp=sharing
```

## Demo Kullanım

Uygulamada kayıt ekranı üzerinden yeni kullanıcı hesabı oluşturulabilir. Bu nedenle sabit bir demo hesap paylaşılmamıştır.

Kullanıcı kayıt olduktan sonra giriş yapabilir, profil bilgilerini düzenleyebilir, ürünleri sepete ekleyebilir, ödeme simülasyonu yapabilir ve sipariş geçmişini görüntüleyebilir.

## Kullanılan Teknolojiler

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- SQLite
- React Context API
- LocalStorage
- Git ve GitHub
- Vercel

## Özellikler

- Ana sayfa banner slider
- Kategori vitrin alanı
- En beğenilen ürünler bölümü
- Ürün listeleme
- Ürün arama, kategori filtreleme ve sıralama
- Ürün detay sayfası
- Ürün renk seçenekleri
- Ürün hikayesi ve teknik detayları
- Ürün yorumları ve yıldızlı puanlama
- Sepete ürün ekleme
- Sepette miktar artırma, azaltma ve ürün silme
- Sepet toplamı hesaplama
- Sepet verisini localStorage ile koruma
- Checkout / ödeme simülasyonu
- Telefon, kart numarası ve son kullanma tarihi formatlama
- Sipariş oluşturma
- Sipariş geçmişi görüntüleme
- Sipariş detay sayfası
- Kullanıcı kayıt sistemi
- Kullanıcı giriş sistemi
- Oturum yönetimi
- Korumalı sayfalar
- Kullanıcı profil sayfası
- Profil bilgisi düzenleme
- Telefon ve adres kaydetme
- Light / Dark tema desteği
- SSS sayfası
- İletişim sayfası
- Kullanım şartları sayfası
- Responsive tasarım
- Vercel deployment

## Sayfalar

- `/` Ana sayfa
- `/products` Ürün listesi
- `/products/[id]` Ürün detay sayfası
- `/cart` Sepet
- `/checkout` Sipariş / ödeme sayfası
- `/orders` Sipariş geçmişi
- `/orders/[id]` Sipariş detay sayfası
- `/login` Giriş
- `/register` Kayıt
- `/profile` Profil
- `/faq` Sık sorulan sorular
- `/contact` İletişim
- `/terms` Kullanım şartları

## Veritabanı

Projede SQLite kullanılmıştır. Veritabanı dosyası:

```text
data/ecommerce.db
```

Kullanılan temel tablolar:

- users
- categories
- products
- orders
- order_items
- product_details
- product_images
- product_reviews

## Kurulum

Projeyi yerel ortamda çalıştırmak için önce bağımlılıkları yükleyin:

```bash
npm install
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Tarayıcıda açın:

```text
http://localhost:3000
```

## Veritabanını Yeniden Oluşturma

SQLite veritabanını yeniden oluşturmak için:

```bash
node scripts/setup-database.mjs
```

## Test ve Kontrol

Kod kalitesini kontrol etmek için:

```bash
npm run lint
```

Production build almak için:

```bash
npm run build
```

## Proje Yapısı

```text
src/
  app/
  components/
  context/
  hooks/
  lib/
  types/
public/
  products/
data/
scripts/
```

## Geliştirici

Yasemin Aslan

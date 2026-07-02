const sections = [
  {
    title: "Kullanım Koşulları",
    content:
      "Bu uygulama bir mezuniyet projesi kapsamında geliştirilmiş demo e-ticaret platformudur. Kullanıcılar ürünleri inceleyebilir, sepete ekleyebilir, hesap oluşturabilir ve sipariş akışını deneyimleyebilir.",
  },
  {
    title: "Üyelik ve Hesap Bilgileri",
    content:
      "Sipariş oluşturmak ve sipariş geçmişini görüntülemek için kullanıcı hesabı gereklidir. Kullanıcı bilgileri uygulama içindeki oturum ve sipariş süreçlerini yönetmek amacıyla kullanılır.",
  },
  {
    title: "Ödeme Simülasyonu",
    content:
      "Ödeme sayfası gerçek bir banka ya da ödeme kuruluşuna bağlı değildir. Kart bilgileri yalnızca demo akışını göstermek için girilir ve gerçek ödeme işlemi yapılmaz.",
  },
  {
    title: "Sipariş ve Teslimat",
    content:
      "Siparişler demo veritabanına kaydedilir ve kullanıcı sipariş geçmişi sayfasından görüntülenebilir. Teslimat bilgileri, sipariş detay ekranında örnek veri olarak gösterilir.",
  },
  {
    title: "İade ve Değişim",
    content:
      "Bu projede gerçek ürün satışı yapılmadığı için gerçek iade/değişim süreci bulunmaz. Ancak gerçek bir sistemde kullanıcıların sipariş detayından iade talebi oluşturması beklenir.",
  },
  {
    title: "Gizlilik",
    content:
      "Demo uygulamada kullanıcı deneyimini göstermek amacıyla temel hesap ve sipariş bilgileri tutulur. Gerçek bir projede parola güvenliği, veri saklama ve gizlilik politikaları daha kapsamlı yönetilmelidir.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#007ea8] dark:text-[#F5D0D8]">
            Yasal Bilgilendirme
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
            Sözleşme ve Şartlar
          </h1>
          <p className="mt-3 max-w-3xl text-[#6697a8] dark:text-[#D1D5DB]">
            Bu sayfa, demo e-ticaret uygulamasının kullanım koşullarını, ödeme
            simülasyonunu ve sipariş sürecini açıklar.
          </p>
        </div>

        <div className="rounded-lg border border-[#D7BDF8] bg-white/80 p-6 shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]">
          <div className="grid gap-4">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="rounded-md bg-gradient-to-r from-[#FADADD] via-[#FFF2D8] to-[#D7ECFF] p-5 dark:bg-none dark:bg-[#0B0B0C] dark:ring-1 dark:ring-[#5A1F2D]"
              >
                <div className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/80 text-sm font-extrabold text-[#338caa] dark:bg-[#2A1218] dark:text-[#F5D0D8]">
                    {index + 1}
                  </span>

                  <div>
                    <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">
                      {section.title}
                    </h2>
                    <p className="mt-2 leading-7 text-[#6A7F95] dark:text-[#D1D5DB]">
                      {section.content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

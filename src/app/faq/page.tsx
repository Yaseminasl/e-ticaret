const faqs = [
  {
    question: "Sipariş vermek için üye olmak zorunda mıyım?",
    answer:
      "Evet. Sipariş geçmişini takip edebilmek, sepetini korumak ve ödeme sonrası sipariş detaylarına ulaşmak için hesap oluşturman gerekir.",
  },
  {
    question: "Ödeme gerçek mi yapılıyor?",
    answer:
      "Hayır. Bu proje mezuniyet projesi olduğu için ödeme bölümü simüle edilmiştir. Kart bilgileri gerçek bir ödeme sistemine gönderilmez.",
  },
  {
    question: "Siparişlerimi nereden takip edebilirim?",
    answer:
      "Giriş yaptıktan sonra üst menüdeki Siparişlerim sayfasından tüm sipariş geçmişini ve sipariş detaylarını görebilirsin.",
  },
  {
    question: "Sepete eklenen ürünler kaybolur mu?",
    answer:
      "Sepet bilgileri tarayıcının localStorage alanında tutulur. Aynı tarayıcıdan devam ettiğinde ürünler sepetinde kalır.",
  },
  {
    question: "Ürün detaylarında neler bulunur?",
    answer:
      "Ürün hikayesi, teknik bilgiler, kullanım önerileri, ürün görselleri, renk seçenekleri, kullanıcı yorumları ve puanlama bilgileri bulunur.",
  },
  {
    question: "İade ve değişim süreci nasıl işler?",
    answer:
      "Bu demo projede gerçek iade süreci yoktur. Ancak gerçek bir e-ticaret sisteminde kullanıcı sipariş detayından iade talebi oluşturabilir.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#007ea8] dark:text-[#F5D0D8]">
            Yardım
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
            Sık Sorulan Sorular
          </h1>
          <p className="mt-3 max-w-2xl text-[#6697a8] dark:text-[#D1D5DB]">
            Alışveriş, üyelik, sepet, ödeme ve sipariş takibi hakkında merak
            edilenler.
          </p>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <article
              key={faq.question}
              className="rounded-lg border border-[#D7BDF8] bg-white/80 p-5 shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]"
            >
              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D7ECFF] text-sm font-extrabold text-[#338caa] dark:bg-[#2A1218] dark:text-[#F5D0D8]">
                  {index + 1}
                </span>

                <div>
                  <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">
                    {faq.question}
                  </h2>
                  <p className="mt-2 leading-7 text-[#6A7F95] dark:text-[#D1D5DB]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { BookMarked, Quote, ExternalLink, ChevronRight } from "lucide-react";

export default function ReferensiPage() {
  const references = [
    {
      title: "Al-Qur'an dan Terjemahannya",
      author: "Kementerian Agama Republik Indonesia",
      desc: "Sumber rujukan utama untuk ayat-ayat Al-Qur'an tentang ikhtiar dan tawakal.",
      year: "2019",
      url: "https://quran.kemenag.go.id/"
    },
    {
      title: "Computational Thinking",
      author: "Jeannette M. Wing",
      desc: "Artikel fundamental yang mempopulerkan istilah Computational Thinking dalam memecahkan masalah.",
      year: "2006",
      type: "Jurnal",
      url: "https://www.cs.cmu.edu/~15110-s13/Wing06-ct.pdf"
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      desc: "Referensi tentang bagaimana perubahan-perubahan kecil (dekomposisi) dapat menghasilkan hasil luar biasa dalam jangka panjang.",
      year: "2018",
      url: "https://jamesclear.com/atomic-habits"
    },
    {
      title: "Tafsir Al-Mishbah",
      author: "M. Quraish Shihab",
      desc: "Rujukan mendalam untuk memahami konteks dan makna ayat-ayat Al-Qur'an yang berkaitan dengan perencanaan hidup.",
      year: "2002",
      url: "https://id.wikipedia.org/wiki/Tafsir_Al-Mishbah"
    }
  ];

  return (
    <div className="bg-[var(--color-gray-50)] dark:bg-[#0f1419] min-h-screen">
      {/* Hero Section — consistent with site brand */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[var(--color-primary)] to-[var(--color-primary-dark)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 text-white/90 font-semibold text-sm backdrop-blur-sm">
            <BookMarked className="w-4 h-4 text-sky-300" /> Sumber Bacaan
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Daftar Referensi
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Bahan bacaan dan literatur yang menjadi landasan teoritis maupun spiritual dari kerangka kerja Algoritma Perencanaan Hidup.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-8">
          
          {/* Quote Card */}
          <div className="bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/10 p-8 rounded-3xl mb-12 border-l-4 border-[var(--color-primary)]">
            <Quote className="w-8 h-8 text-[var(--color-primary)] mb-4 opacity-50" />
            <p className="text-[var(--color-dark)] dark:text-white text-lg italic leading-relaxed">
              &ldquo;Ilmu itu ibarat buruan, dan tulisan adalah ikatannya. Maka ikatlah buruanmu dengan tali yang kuat.&rdquo;
            </p>
            <p className="mt-4 font-bold text-[var(--color-primary)]">— Imam as-Syafi&apos;i</p>
          </div>

          {/* Reference Cards */}
          <div className="grid gap-5">
            {references.map((ref, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1c2732] p-6 rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06] animate-fade-in-up hover:-translate-y-0.5 transition-transform duration-300 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-dark)] dark:text-white mb-1">
                    {ref.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-gray-500)] dark:text-[#8b98a5] mb-3">
                    <span className="font-medium text-[var(--color-primary)]">{ref.author}</span>
                    <span>•</span>
                    <span>{ref.year}</span>
                    {ref.type && (
                      <>
                        <span>•</span>
                        <span className="bg-[var(--color-gray-100)] dark:bg-white/10 px-2 py-0.5 rounded text-xs">{ref.type}</span>
                      </>
                    )}
                  </div>
                  <p className="text-[var(--color-gray-600)] dark:text-white/65 text-sm leading-relaxed max-w-2xl">
                    {ref.desc}
                  </p>
                </div>
                <a 
                  href={ref.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-gray-50)] dark:bg-white/5 text-[var(--color-gray-400)] dark:text-white/40 flex items-center justify-center hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-colors"
                  title={`Buka ${ref.title}`}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/" className="btn-primary">
              Kembali ke Beranda <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}

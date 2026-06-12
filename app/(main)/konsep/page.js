import Link from "next/link";
import { Lightbulb, BookOpen, Brain, Rocket, ChevronRight } from "lucide-react";

export default function KonsepPage() {
  return (
    <div className="bg-[var(--color-gray-50)] dark:bg-[#0f1419] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[var(--color-primary-dark)] to-[var(--color-primary)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 text-white/90 font-semibold text-sm">
            <Lightbulb className="w-4 h-4 text-amber-300" /> Pengenalan Konsep
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Menyelaraskan Logika dan Iman
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Memahami bagaimana kerangka berpikir sistematis (Computational Thinking) bisa menjadi wujud ikhtiar terbaik, sebelum kita bertawakal kepada-Nya.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-16">
          
          {/* CT Explanation Card */}
          <div className="bg-white dark:bg-[#1c2732] p-8 md:p-12 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06] animate-fade-in-up">
            <h2 className="text-3xl font-bold text-[var(--color-dark)] dark:text-white mb-6 font-heading flex items-center gap-3">
              <Brain className="w-8 h-8 text-[var(--color-primary)]" />
              Apa itu Computational Thinking?
            </h2>
            <div className="space-y-4 text-[var(--color-gray-600)] dark:text-white/65 leading-relaxed">
              <p>
                <strong>Computational Thinking (CT)</strong> adalah proses berpikir yang melibatkan perumusan masalah dan solusinya, sehingga solusi tersebut dapat dipresentasikan dalam bentuk yang dapat dilaksanakan secara efektif.
              </p>
              <p>
                Meskipun istilah ini berasal dari ilmu komputer, prinsipnya dapat diterapkan di hampir semua aspek kehidupan. Dalam konteks aplikasi ini, kita menggunakannya untuk merencanakan masa depan.
              </p>
            </div>
          </div>

          {/* Islam Perspective Card */}
          <div className="bg-white dark:bg-[#1c2732] p-8 md:p-12 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06] animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-3xl font-bold text-[var(--color-dark)] dark:text-white mb-6 font-heading flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[var(--color-secondary)]" />
              Perspektif Islam: Ikhtiar & Tawakal
            </h2>
            <div className="space-y-4 text-[var(--color-gray-600)] dark:text-white/65 leading-relaxed">
              <p>
                Dalam Islam, kita diwajibkan untuk berusaha (Ikhtiar) semaksimal mungkin sebelum menyerahkan segala urusan kepada Allah (Tawakal). Computational Thinking memberikan kerangka yang jelas tentang <em>bagaimana</em> cara kita berikhtiar secara maksimal.
              </p>
              <div className="bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/10 p-6 rounded-2xl border-l-4 border-[var(--color-primary)] my-6">
                <p className="italic text-[var(--color-dark)] dark:text-white font-medium mb-2">
                  &ldquo;Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sebelum mereka mengubah keadaan diri mereka sendiri.&rdquo;
                </p>
                <span className="text-sm font-bold text-[var(--color-primary)]">— QS. Ar-Ra&apos;d: 11</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/algoritma" className="btn-primary">
              Pelajari Algoritma <ChevronRight className="w-5 h-5 ml-2" />
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

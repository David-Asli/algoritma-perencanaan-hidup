import Link from "next/link";
import { HeartHandshake, ShieldCheck, RefreshCw, ChevronRight } from "lucide-react";

export default function IkhtiarPage() {
  return (
    <div className="bg-[var(--color-gray-50)] dark:bg-[#0f1419] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[var(--color-secondary-dark)] to-[var(--color-secondary)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 text-white/90 font-semibold text-sm backdrop-blur-sm">
            <HeartHandshake className="w-4 h-4 text-emerald-300" /> Sikap Batin
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Ikhtiar & Tawakal
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Menyatukan aksi nyata di dunia fisik dengan kepasrahan hati kepada Sang Pencipta.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-10">
          
          {/* Ikhtiar Card */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-[#1c2732] p-8 md:p-10 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06] animate-fade-in-up">
            <div className="flex-1">
              <h2 className="text-3xl font-bold font-heading text-[var(--color-dark)] dark:text-white mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
                Ikhtiar yang Optimal
              </h2>
              <p className="text-[var(--color-gray-600)] dark:text-white/65 leading-relaxed">
                Ikhtiar bukanlah sekadar &ldquo;mencoba&rdquo;, melainkan mengerahkan segala potensi akal (melalui pola pikir CT), fisik, dan sumber daya yang Allah titipkan untuk mencapai tujuan yang diridhai-Nya.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 text-center">
              <div className="text-4xl mb-2">💪</div>
              <div className="font-bold text-emerald-700 dark:text-emerald-400">Usaha Fisik & Mental</div>
            </div>
          </div>

          {/* Tawakal Card */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-[#1c2732] p-8 md:p-10 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06] animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div className="w-full md:w-1/3 p-6 bg-sky-50 dark:bg-sky-500/10 rounded-2xl border border-sky-200 dark:border-sky-500/20 text-center md:order-1 order-2">
              <div className="text-4xl mb-2">🤲</div>
              <div className="font-bold text-sky-700 dark:text-sky-400">Kepasrahan Hati</div>
            </div>
            <div className="flex-1 md:order-2 order-1">
              <h2 className="text-3xl font-bold font-heading text-[var(--color-dark)] dark:text-white mb-4 flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-sky-500 dark:text-sky-400" />
                Tawakal sebagai Benteng
              </h2>
              <p className="text-[var(--color-gray-600)] dark:text-white/65 leading-relaxed">
                Tawakal terjadi <strong>setelah</strong> ikhtiar maksimal. Ia membebaskan kita dari stres berlebih (decision fatigue) karena kita sadar bahwa hasil akhir adalah hak prerogatif Allah yang Maha Mengetahui yang terbaik untuk hamba-Nya.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/studi-kasus" className="btn-primary">
              Lihat Studi Kasus <ChevronRight className="w-5 h-5 ml-2" />
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

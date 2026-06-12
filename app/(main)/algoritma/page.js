import Link from "next/link";
import { GitBranch, Box, ZoomIn, ListTree, Repeat, ChevronRight } from "lucide-react";

export default function AlgoritmaPage() {
  const steps = [
    {
      id: "01",
      title: "Dekomposisi",
      icon: <Box className="w-6 h-6" />,
      accent: {
        iconBg: "bg-sky-100 dark:bg-sky-500/15",
        iconText: "text-sky-600 dark:text-sky-400",
        border: "border-t-sky-500",
        quoteBg: "bg-sky-50 dark:bg-sky-500/10",
        quoteBorder: "border-sky-200 dark:border-sky-500/20",
        quoteText: "text-sky-700 dark:text-sky-300",
        numColor: "text-sky-100 dark:text-sky-500/10",
      },
      desc: "Memecah masalah yang kompleks menjadi bagian-bagian yang lebih kecil dan mudah dikelola.",
      quran: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya. (Al-Baqarah: 286)"
    },
    {
      id: "02",
      title: "Pengenalan Pola",
      icon: <ZoomIn className="w-6 h-6" />,
      accent: {
        iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
        iconText: "text-emerald-600 dark:text-emerald-400",
        border: "border-t-emerald-500",
        quoteBg: "bg-emerald-50 dark:bg-emerald-500/10",
        quoteBorder: "border-emerald-200 dark:border-emerald-500/20",
        quoteText: "text-emerald-700 dark:text-emerald-300",
        numColor: "text-emerald-100 dark:text-emerald-500/10",
      },
      desc: "Mencari pola atau tren yang sama di dalam masalah untuk memprediksi hasil dan menemukan solusi yang pernah berhasil sebelumnya.",
      quran: "Maka apakah mereka tidak memperhatikan Al Quran ataukah hati mereka terkunci? (Muhammad: 24)"
    },
    {
      id: "03",
      title: "Abstraksi",
      icon: <ListTree className="w-6 h-6" />,
      accent: {
        iconBg: "bg-violet-100 dark:bg-violet-500/15",
        iconText: "text-violet-600 dark:text-violet-400",
        border: "border-t-violet-500",
        quoteBg: "bg-violet-50 dark:bg-violet-500/10",
        quoteBorder: "border-violet-200 dark:border-violet-500/20",
        quoteText: "text-violet-700 dark:text-violet-300",
        numColor: "text-violet-100 dark:text-violet-500/10",
      },
      desc: "Fokus pada informasi yang penting saja dan mengabaikan detail yang tidak relevan dengan solusi.",
      quran: "Jadikanlah sabar dan shalat sebagai penolongmu. (Al-Baqarah: 45) - Fokus pada hal esensial."
    },
    {
      id: "04",
      title: "Perancangan Algoritma",
      icon: <Repeat className="w-6 h-6" />,
      accent: {
        iconBg: "bg-amber-100 dark:bg-amber-500/15",
        iconText: "text-amber-600 dark:text-amber-400",
        border: "border-t-amber-500",
        quoteBg: "bg-amber-50 dark:bg-amber-500/10",
        quoteBorder: "border-amber-200 dark:border-amber-500/20",
        quoteText: "text-amber-700 dark:text-amber-300",
        numColor: "text-amber-100 dark:text-amber-500/10",
      },
      desc: "Membuat langkah-langkah sistematis (step-by-step) untuk menyelesaikan masalah.",
      quran: "Apabila telah ditunaikan shalat, maka bertebaranlah kamu di muka bumi; dan carilah karunia Allah. (Al-Jumu'ah: 10)"
    }
  ];

  return (
    <div className="bg-[var(--color-gray-50)] dark:bg-[#0f1419] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[var(--color-primary-dark)] to-[var(--color-primary)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 text-white/90 font-semibold text-sm backdrop-blur-sm">
            <GitBranch className="w-4 h-4 text-sky-300" /> Empat Pilar CT
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Algoritma Perencanaan
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Bagaimana menerjemahkan 4 teknik utama Computational Thinking ke dalam tahapan perencanaan hidup seorang muslim.
          </p>
        </div>
      </section>

      {/* Steps Grid */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-[#1c2732] rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06] border-t-4 ${step.accent.border} relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background number */}
                <div className={`absolute top-0 right-0 -mr-4 -mt-4 text-[9rem] font-black leading-none select-none transition-transform group-hover:scale-110 ${step.accent.numColor}`}>
                  {step.id}
                </div>

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${step.accent.iconBg} ${step.accent.iconText}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-[var(--color-dark)] dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-gray-600)] dark:text-white/65 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                  <div className={`p-4 rounded-xl border ${step.accent.quoteBg} ${step.accent.quoteBorder}`}>
                    <p className={`text-sm font-medium italic ${step.accent.quoteText}`}>
                      &ldquo;{step.quran}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/ikhtiar" className="btn-secondary">
              Selanjutnya: Ikhtiar & Tawakal <ChevronRight className="w-5 h-5 ml-2" />
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

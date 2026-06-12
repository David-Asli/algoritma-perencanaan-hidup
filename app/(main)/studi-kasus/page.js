import Link from "next/link";
import { BookOpen, GraduationCap, Briefcase, ChevronRight, Lightbulb, Target, Search, ListChecks } from "lucide-react";

export default function StudiKasusPage() {
  const stepIcons = [
    <Target key="0" className="w-3.5 h-3.5" />,
    <Search key="1" className="w-3.5 h-3.5" />,
    <Lightbulb key="2" className="w-3.5 h-3.5" />,
    <ListChecks key="3" className="w-3.5 h-3.5" />,
  ];

  const cases = [
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: "Pendidikan & Akademik",
      accent: {
        iconBg: "bg-sky-100 dark:bg-sky-500/15",
        iconText: "text-sky-600 dark:text-sky-400",
        numBg: "bg-sky-100 dark:bg-sky-500/20",
        numText: "text-sky-700 dark:text-sky-300",
        border: "border-sky-200/60 dark:border-sky-500/15",
        tagBg: "bg-sky-50 dark:bg-sky-500/10",
        tagText: "text-sky-700 dark:text-sky-300",
        tagBorder: "border-sky-200 dark:border-sky-500/20",
      },
      desc: "Menyusun target kelulusan tepat waktu dengan nilai yang baik.",
      steps: [
        { name: "Dekomposisi", detail: "Membagi beban SKS ke dalam 8 semester, memilah mata kuliah wajib dan pilihan." },
        { name: "Pengenalan Pola", detail: "Mengamati kebiasaan belajar diri sendiri dan jadwal dosen pembimbing." },
        { name: "Abstraksi", detail: "Fokus pada materi utama yang diujikan, mengabaikan kegiatan non-akademik yang tidak mendukung." },
        { name: "Algoritma", detail: "Membuat jadwal harian: jam belajar, jam ibadah, waktu istirahat yang teratur." },
      ]
    },
    {
      icon: <Briefcase className="w-7 h-7" />,
      title: "Karir & Pekerjaan",
      accent: {
        iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
        iconText: "text-emerald-600 dark:text-emerald-400",
        numBg: "bg-emerald-100 dark:bg-emerald-500/20",
        numText: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200/60 dark:border-emerald-500/15",
        tagBg: "bg-emerald-50 dark:bg-emerald-500/10",
        tagText: "text-emerald-700 dark:text-emerald-300",
        tagBorder: "border-emerald-200 dark:border-emerald-500/20",
      },
      desc: "Mencari pekerjaan impian atau membangun bisnis sendiri.",
      steps: [
        { name: "Dekomposisi", detail: "Membagi target: riset industri, perbaikan CV, peningkatan skill spesifik." },
        { name: "Pengenalan Pola", detail: "Mempelajari kualifikasi yang sering diminta oleh perusahaan impian." },
        { name: "Abstraksi", detail: "Menyesuaikan isi CV hanya dengan pengalaman yang relevan untuk posisi yang dilamar." },
        { name: "Algoritma", detail: "Rutinitas melamar pekerjaan: 2 lamaran sehari, 1 jam belajar skill baru setiap malam." },
      ]
    }
  ];

  return (
    <div className="bg-[var(--color-gray-50)] dark:bg-[#0f1419] min-h-screen">
      {/* Hero Section — uses site primary/secondary gradient */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[var(--color-primary)] to-[var(--color-secondary)]">
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 text-white/90 font-semibold text-sm backdrop-blur-sm">
            <BookOpen className="w-4 h-4 text-emerald-300" /> Penerapan Nyata
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Studi Kasus
          </h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Melihat bagaimana Algoritma Perencanaan Hidup diterapkan dalam berbagai skenario kehidupan nyata.
          </p>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 space-y-10">
          
          {cases.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1c2732] rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Card Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.accent.iconBg} ${item.accent.iconText}`}>
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-heading text-[var(--color-dark)] dark:text-white mb-1">
                    {item.title}
                  </h2>
                  <p className="text-[var(--color-gray-500)] dark:text-[#8b98a5] text-sm md:text-base">{item.desc}</p>
                </div>
              </div>

              {/* Steps Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {item.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border bg-[var(--color-gray-50)] dark:bg-white/[0.03] ${item.accent.border} transition-all duration-200 hover:shadow-sm`}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${item.accent.numBg} ${item.accent.numText}`}>
                        {stepIcons[idx]}
                      </span>
                      <h4 className="font-bold text-[var(--color-dark)] dark:text-white text-sm uppercase tracking-wider">
                        {step.name}
                      </h4>
                    </div>
                    <p className="text-[var(--color-gray-600)] dark:text-white/65 text-sm leading-relaxed pl-[38px]">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Doa reminder */}
              <div className="mt-6 p-4 rounded-xl bg-[var(--color-gray-50)] dark:bg-white/[0.03] border border-dashed border-[var(--color-gray-200)] dark:border-white/10 text-center">
                <p className="italic text-sm text-[var(--color-gray-500)] dark:text-white/50 leading-relaxed">
                  🤲 Langkah terakhir dari semua skenario di atas adalah <span className="font-medium text-[var(--color-gray-700)] dark:text-white/70">berdoa memohon kemudahan</span>, dan bertawakal atas apapun hasilnya.
                </p>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="text-center mt-12">
            <Link href="/referensi" className="btn-primary">
              Lihat Referensi <ChevronRight className="w-5 h-5 ml-2" />
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

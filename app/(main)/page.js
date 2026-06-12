import Link from "next/link";
import { Rocket, BookOpen, Layers, Cpu, CheckCircle, HelpingHand, Heart, BarChart3, Compass, Search, Zap, Sun, Info, HelpCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-[#0f2027] via-[var(--color-primary)] to-[var(--color-secondary)]">
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle" style={{ top: "15%", left: "10%", animationDelay: "0s" }}></div>
          <div className="particle" style={{ top: "30%", left: "80%", animationDelay: "1s", width: "8px", height: "8px" }}></div>
          <div className="particle" style={{ top: "60%", left: "20%", animationDelay: "2s", width: "4px", height: "4px" }}></div>
          <div className="particle" style={{ top: "70%", left: "70%", animationDelay: "0.5s" }}></div>
          <div className="particle" style={{ top: "45%", left: "50%", animationDelay: "1.5s", width: "10px", height: "10px" }}></div>
          <div className="particle" style={{ top: "80%", left: "90%", animationDelay: "3s", width: "5px", height: "5px" }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"></span>
                <span className="text-white/80 text-sm font-medium">Computational Thinking × Islam</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Rencanakan Hidupmu
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 drop-shadow-sm">Seperti Algoritma,</span>
                <span className="block text-white/90 text-3xl md:text-4xl lg:text-5xl mt-2">Serahkan Hasilnya kepada Allah</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Gabungan logika berpikir sistematis dan nilai-nilai keimanan. Pelajari bagaimana{" "}
                <strong className="text-white">Computational Thinking</strong> bisa menjadi alat{" "}
                <strong className="text-white">ikhtiar</strong> terbaik dalam merencanakan hidup yang bermakna.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/planner" className="btn-primary">
                  <Rocket className="w-5 h-5" /> Mulai Perencanaanku
                </Link>
                <Link href="/konsep" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-xl font-heading font-semibold text-[15px] transition-all duration-300 hover:bg-white/10 active:bg-white/20 focus:outline-none">
                  <BookOpen className="w-5 h-5" /> Pelajari Konsep
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:flex justify-center animate-fade-in-right">
              <div className="relative">
                {/* Main Visual Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-96 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">🧠</div>
                    <h3 className="font-heading text-xl font-bold text-white">Algoritma Hidup</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white text-sm font-bold">1</div>
                      <span className="text-white/90 text-sm">Input & Kenali Diri</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white text-sm font-bold">2</div>
                      <span className="text-white/90 text-sm">Dekomposisi Masalah</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary)] flex items-center justify-center text-white text-sm font-bold">3</div>
                      <span className="text-white/90 text-sm">Ikhtiar Maksimal</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold">4</div>
                      <span className="text-white/90 text-sm">Tawakal kepada Allah</span>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2 shadow-lg animate-float">
                  <span className="text-sm font-semibold text-[var(--color-secondary)]">✓ Terstruktur</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                  <span className="text-sm font-semibold text-[var(--color-primary)]">☪ Berbasis Iman</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path d="M0 50L48 45C96 40 192 30 288 25C384 20 480 20 576 30C672 40 768 60 864 65C960 70 1056 60 1152 50C1248 40 1344 30 1392 25L1440 20V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" className="fill-white dark:fill-[#0f1419]" />
          </svg>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 bg-white dark:bg-[#0f1419]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 scroll-animate visible">
            <span className="section-badge badge-primary">
              <Layers className="w-4 h-4 inline mr-1" /> Fondasi Utama
            </span>
            <h2 className="font-heading text-3xl font-bold text-[var(--color-dark)] dark:text-white mb-4">Tiga Pilar Perencanaan Hidup</h2>
            <p className="text-[var(--color-gray-600)] dark:text-white/70 max-w-2xl mx-auto">Kombinasi sempurna antara pemikiran sistematis, usaha nyata, dan penyerahan diri kepada Allah SWT</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="card p-8 border-t-4 border-t-[var(--color-primary)] scroll-animate visible">
              <div className="icon-circle icon-primary mb-5">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white mb-3">Computational Thinking</h3>
              <p className="text-[var(--color-gray-600)] dark:text-white/70 leading-relaxed mb-4">
                Metode berpikir sistematis yang membantu memecahkan masalah kompleks menjadi langkah-langkah terstruktur dan terukur.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[var(--color-gray-700)] dark:text-white/80">
                  <CheckCircle className="w-4 h-4 text-[var(--color-primary)]" /> Dekomposisi masalah
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-gray-700)] dark:text-white/80">
                  <CheckCircle className="w-4 h-4 text-[var(--color-primary)]" /> Pengenalan pola
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-gray-700)] dark:text-white/80">
                  <CheckCircle className="w-4 h-4 text-[var(--color-primary)]" /> Abstraksi & Algoritma
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="card p-8 border-t-4 border-t-[var(--color-secondary)] scroll-animate visible">
              <div className="icon-circle icon-secondary mb-5">
                <HelpingHand className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white mb-3">Ikhtiar</h3>
              <p className="text-[var(--color-gray-600)] dark:text-white/70 leading-relaxed mb-4">
                Usaha maksimal yang terencana dan terstruktur sebagai bentuk tanggung jawab seorang hamba sebelum menyerahkan hasil kepada Allah.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[var(--color-gray-700)] dark:text-white/80">
                  <CheckCircle className="w-4 h-4 text-[var(--color-secondary)]" /> Usaha terencana
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-gray-700)] dark:text-white/80">
                  <CheckCircle className="w-4 h-4 text-[var(--color-secondary)]" /> Kerja keras & cerdas
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-gray-700)] dark:text-white/80">
                  <CheckCircle className="w-4 h-4 text-[var(--color-secondary)]" /> Memanfaatkan potensi
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="card p-8 border-t-4 border-t-[var(--color-accent)] scroll-animate visible">
              <div className="icon-circle icon-accent mb-5">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white mb-3">Tawakal</h3>
              <p className="text-[var(--color-gray-600)] dark:text-white/70 leading-relaxed mb-4">
                Menyerahkan hasil sepenuhnya kepada Allah SWT setelah berikhtiar secara maksimal. Ketenangan hati dalam menjalani proses.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[var(--color-gray-700)] dark:text-white/80">
                  <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" /> Pasrah setelah berusaha
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-gray-700)] dark:text-white/80">
                  <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" /> Ridha terhadap takdir
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-gray-700)] dark:text-white/80">
                  <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" /> Ketenangan batin
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-[var(--color-gray-50)] dark:bg-[#151c23]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 scroll-animate visible">
            <span className="section-badge badge-accent">
              <BarChart3 className="w-4 h-4 inline mr-1" /> Fakta & Statistik
            </span>
            <h2 className="font-heading text-3xl font-bold text-[var(--color-dark)] dark:text-white mb-4">Mengapa Perencanaan Hidup Penting?</h2>
            <p className="text-[var(--color-gray-600)] dark:text-white/70 max-w-2xl mx-auto">Data menunjukkan bahwa orang yang merencanakan hidupnya lebih produktif dan memiliki tingkat stres yang lebih rendah</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center scroll-animate visible">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] font-heading mb-2">35.000+</div>
              <p className="text-sm text-[var(--color-gray-600)] dark:text-white/70 font-medium">Keputusan per hari yang dibuat rata-rata orang dewasa</p>
            </div>
            <div className="card p-6 text-center scroll-animate visible">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] font-heading mb-2">73%</div>
              <p className="text-sm text-[var(--color-gray-600)] dark:text-white/70 font-medium">Orang mengalami decision fatigue setiap harinya</p>
            </div>
            <div className="card p-6 text-center scroll-animate visible">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] font-heading mb-2">42%</div>
              <p className="text-sm text-[var(--color-gray-600)] dark:text-white/70 font-medium">Lebih produktif dengan perencanaan terstruktur</p>
            </div>
            <div className="card p-6 text-center scroll-animate visible">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] font-heading mb-2">89%</div>
              <p className="text-sm text-[var(--color-gray-600)] dark:text-white/70 font-medium">Merasa lebih tenang setelah menerapkan tawakal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-white dark:bg-[#0f1419]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-animate visible">
              <span className="section-badge badge-secondary">
                <Compass className="w-4 h-4 inline mr-1" /> Alur Perencanaan
              </span>
              <h2 className="font-heading text-3xl font-bold text-[var(--color-dark)] dark:text-white mb-4">Dari Masalah Menuju Solusi yang Bermakna</h2>
              <p className="text-[var(--color-gray-600)] dark:text-white/70 leading-relaxed mb-8">
                Algoritma Perencanaan Hidup menggabungkan pendekatan ilmiah Computational Thinking dengan kebijaksanaan spiritual Islam. Setiap langkah dirancang agar ikhtiarmu terstruktur dan hasilnya diserahkan kepada Yang Maha Kuasa.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-primary-light)] text-[var(--color-primary)] flex-shrink-0 mt-1">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-[var(--color-dark)] dark:text-white">Identifikasi & Dekomposisi</h4>
                    <p className="text-sm text-[var(--color-gray-600)] dark:text-white/70">Pecah masalah besar menjadi bagian-bagian kecil yang bisa ditangani</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-secondary-light)] text-[var(--color-secondary)] flex-shrink-0 mt-1">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-[var(--color-dark)] dark:text-white">Aksi & Ikhtiar</h4>
                    <p className="text-sm text-[var(--color-gray-600)] dark:text-white/70">Jalankan rencana dengan penuh semangat dan disiplin</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-accent-light)] text-[#b8960b] flex-shrink-0 mt-1">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-[var(--color-dark)] dark:text-white">Evaluasi & Tawakal</h4>
                    <p className="text-sm text-[var(--color-gray-600)] dark:text-white/70">Evaluasi hasil, perbaiki, dan serahkan kepada Allah</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ayat Card */}
            <div className="scroll-animate visible">
              <div className="card p-6 border-l-4 border-l-[var(--color-primary)] mb-6">
                <p className="text-right text-2xl mb-4 leading-relaxed text-[var(--color-dark)] dark:text-white" style={{ fontFamily: "Amiri, serif" }} dir="rtl">
                  يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱتَّقُوا۟ ٱللَّهَ وَلْتَنظُرْ نَفْسٌ مَّا قَدَّمَتْ لِغَدٍ ۖ وَٱتَّقُوا۟ ٱللَّهَ ۚ إِنَّ ٱللَّهَ خَبِيرٌۢ بِمَا تَعْمَلُونَ
                </p>
                <p className="text-[var(--color-gray-700)] dark:text-white/80 italic leading-relaxed text-sm">
                  "Wahai orang-orang yang beriman, bertakwalah kepada Allah dan hendaklah setiap orang memperhatikan apa yang telah diperbuatnya untuk hari esok; dan bertakwalah kepada Allah. Sungguh, Allah Mahateliti terhadap apa yang kamu kerjakan."
                </p>
                <p className="text-[var(--color-primary)] font-semibold text-sm mt-3">— QS. Al-Hasyr: 18</p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-semibold text-[var(--color-dark)] dark:text-white">Hikmah Ayat</h4>
                </div>
                <p className="text-sm text-[var(--color-gray-600)] dark:text-white/70 leading-relaxed">
                  Ayat ini mengajarkan kita untuk selalu merencanakan masa depan (<em>maa qaddamat lighad</em>) dengan penuh kesadaran dan pertanggungjawaban. Ini adalah inti dari Computational Thinking dalam perspektif Islam — berpikir sistematis sebagai bentuk takwa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0f2027] via-[var(--color-primary)] to-[var(--color-secondary)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="particle" style={{ top: "20%", left: "15%", animationDelay: "0s" }}></div>
          <div className="particle" style={{ top: "50%", left: "75%", animationDelay: "1.5s", width: "8px", height: "8px" }}></div>
          <div className="particle" style={{ top: "70%", left: "30%", animationDelay: "2.5s" }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10 scroll-animate visible">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Merencanakan Hidupmu?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Gunakan Life Planner kami untuk membuat perencanaan hidup yang terstruktur, bermakna, dan berlandaskan nilai-nilai keimanan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/planner" className="btn-primary !bg-none !bg-white !text-[var(--color-primary)] hover:!bg-gray-100">
              <Rocket className="w-5 h-5" /> Mulai Life Planner
            </Link>
            <Link href="/kuis" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-xl font-heading font-semibold text-[15px] transition-all duration-300 hover:bg-white/10 active:bg-white/20 focus:outline-none">
              <HelpCircle className="w-5 h-5" /> Ikuti Kuis Refleksi
            </Link>
          </div>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .particle {
          position: absolute;
          width: 6px; height: 6px;
          background: rgba(212,172,13,.5);
          border-radius: 50%;
          animation: floatP 6s ease-in-out infinite;
        }
        @keyframes floatP {
          0%,100% { transform: translateY(0) scale(1); opacity:.5; }
          50% { transform: translateY(-20px) scale(1.3); opacity:1; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}} />
    </>
  );
}

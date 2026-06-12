import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-dark)] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold text-lg">
                ﷲ
              </div>
              <div>
                <span className="font-heading font-bold text-lg">Algoritma Perencanaan Hidup</span>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed max-w-md text-sm">
              Implementasi Computational Thinking dalam Konsep Ikhtiar dan Tawakal Berbasis Al-Qur'an.
              Menggabungkan logika berpikir sistematis dengan nilai-nilai keimanan untuk merencanakan hidup yang bermakna.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-white/50 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/konsep" className="text-white/50 hover:text-white transition-colors text-sm">Tentang Konsep</Link></li>
              <li><Link href="/algoritma" className="text-white/50 hover:text-white transition-colors text-sm">Algoritma Hidup</Link></li>
              <li><Link href="/ikhtiar" className="text-white/50 hover:text-white transition-colors text-sm">Ikhtiar & Tawakal</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/80 mb-4">Fitur</h4>
            <ul className="space-y-2.5">
              <li><Link href="/planner" className="text-white/50 hover:text-white transition-colors text-sm">Life Planner</Link></li>
              <li><Link href="/studi-kasus" className="text-white/50 hover:text-white transition-colors text-sm">Studi Kasus</Link></li>
              <li><Link href="/kuis" className="text-white/50 hover:text-white transition-colors text-sm">Kuis Refleksi</Link></li>
              <li><Link href="/referensi" className="text-white/50 hover:text-white transition-colors text-sm">Referensi</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© {currentYear} Algoritma Perencanaan Hidup. Dibuat dengan ☪ dan 💻</p>
          <p className="text-white/40 text-sm">
            <span className="italic">"Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lain."</span> — HR. Ahmad
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, RefreshCw, Rocket } from "lucide-react";
import { useSession } from "next-auth/react";

const questions = [
  { q: "Apa langkah pertama dalam Computational Thinking?", o: ["Membuat algoritma","Dekomposisi masalah","Menjalankan program","Evaluasi hasil"], c: 1, f: "Dekomposisi adalah memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah ditangani." },
  { q: "Dalam Islam, tawakal yang benar adalah...", o: ["Tidak berusaha dan pasrah saja","Berusaha maksimal lalu menyerahkan hasil kepada Allah","Hanya berdoa tanpa bertindak","Menyalahkan takdir saat gagal"], c: 1, f: "Tawakal adalah menyerahkan hasil kepada Allah SETELAH berikhtiar secara maksimal." },
  { q: "QS. Al-Hasyr: 18 mengajarkan kita untuk...", o: ["Bersabar dalam ujian","Memperhatikan apa yang diperbuat untuk hari esok","Bersyukur atas nikmat","Bertaubat dari dosa"], c: 1, f: "Ayat ini memerintahkan kita untuk merencanakan masa depan (waltanzhur nafsun maa qaddamat lighad)." },
  { q: "Pattern Recognition dalam kehidupan sehari-hari contohnya adalah...", o: ["Membuat jadwal baru setiap hari","Mengenali bahwa belajar rutin selalu meningkatkan nilai","Mengabaikan pengalaman masa lalu","Mengikuti tren terbaru"], c: 1, f: "Pattern Recognition adalah mengenali pola berulang dari pengalaman untuk diterapkan pada situasi baru." },
  { q: "Hadits 'Ikat dulu untamu, lalu bertawakallah' mengajarkan...", o: ["Tawakal saja sudah cukup","Ikhtiar tidak perlu jika sudah berdoa","Ikhtiar dulu baru tawakal","Takdir tidak bisa diubah"], c: 2, f: "Hadits ini menunjukkan bahwa ikhtiar (usaha nyata) harus dilakukan terlebih dahulu sebelum bertawakal." },
  { q: "Abstraksi dalam CT bertujuan untuk...", o: ["Menambah kerumitan masalah","Fokus pada detail yang tidak penting","Menyaring informasi penting dan mengabaikan yang tidak relevan","Menghindari masalah"], c: 2, f: "Abstraksi membantu kita fokus pada apa yang benar-benar penting dan mengabaikan distraksi." },
  { q: "Eisenhower Matrix membagi tugas berdasarkan...", o: ["Waktu dan biaya","Urgensi dan kepentingan","Kesulitan dan kemudahan","Jangka pendek dan jangka panjang"], c: 1, f: "Eisenhower Matrix mengkategorikan tugas berdasarkan tingkat urgensi dan kepentingannya." },
  { q: "Contoh ikhtiar yang terstruktur dalam mencari kerja adalah...", o: ["Menunggu lowongan datang sendiri","Melamar asal-asalan ke banyak tempat","Riset perusahaan → siapkan CV → latihan interview → lamar → evaluasi","Hanya berdoa dan menunggu"], c: 2, f: "Ikhtiar terstruktur berarti mengikuti langkah-langkah yang terencana, bukan asal bertindak." },
  { q: "Dalam algoritma perencanaan hidup, evaluasi dilakukan untuk...", o: ["Menyalahkan diri sendiri","Berhenti berusaha","Melakukan muhasabah dan perbaikan berkelanjutan","Membandingkan diri dengan orang lain"], c: 2, f: "Evaluasi adalah muhasabah (introspeksi) untuk memperbaiki rencana dan meningkatkan kualitas ikhtiar." },
  { q: "Formula kehidupan bermakna menurut website ini adalah...", o: ["Bakat + Keberuntungan + Koneksi","CT + Ikhtiar + Tawakal","Uang + Kekuasaan + Popularitas","Pendidikan + Kerja Keras + Waktu"], c: 1, f: "Computational Thinking + Ikhtiar + Tawakal = Hidup yang terencana, bermakna, dan penuh berkah." }
];

export default function KuisPage() {
  const { data: session } = useSession();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [insight, setInsight] = useState({ level: "", message: "", color: "" });

  const getInsight = (pct) => {
    if (pct >= 80) return { level: 'Pakar Algoritma Hidup', message: 'Luar biasa! Pemahamanmu sangat mendalam.', color: 'secondary' };
    if (pct >= 60) return { level: 'Perencana yang Baik', message: 'Bagus! Kamu sudah memahami konsep dasarnya.', color: 'primary' };
    if (pct >= 40) return { level: 'Pembelajar Aktif', message: 'Lumayan! Perlu sedikit pendalaman lagi.', color: 'accent' };
    return { level: 'Pemula', message: 'Tidak apa-apa, mari pelajari kembali konsepnya.', color: 'primary' };
  };

  const handleSelectAnswer = (idx) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOpt(idx);
    
    if (idx === questions[currentQ].c) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQ >= questions.length - 1) {
      const pct = Math.round((score + (selectedOpt === questions[currentQ].c ? 1 : 0)) / questions.length * 100);
      const resInsight = getInsight(pct);
      setInsight(resInsight);
      setShowResult(true);

      if (session?.user) {
        fetch('/api/quiz/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            score: score + (selectedOpt === questions[currentQ].c ? 1 : 0),
            total_questions: questions.length,
            percentage: pct,
            level: resInsight.level,
            message: resInsight.message
          })
        }).catch(err => console.error(err));
      }
    } else {
      setCurrentQ(prev => prev + 1);
      setAnswered(false);
      setSelectedOpt(null);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswered(false);
    setSelectedOpt(null);
    setShowResult(false);
  };

  const q = questions[currentQ];
  const isCorrect = selectedOpt === q?.c;

  // Insight color mapping for result card
  const insightColorMap = {
    secondary: 'bg-[var(--color-secondary-light)] dark:bg-[var(--color-secondary)]/10 text-[var(--color-secondary-dark)] dark:text-[var(--color-secondary)]',
    primary: 'bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]',
    accent: 'bg-[var(--color-accent-light)] dark:bg-[#D4AC0D]/10 text-[#8B7500] dark:text-[#D4AC0D]',
  };

  return (
    <div className="bg-[var(--color-gray-50)] dark:bg-[#0f1419] min-h-screen">
      {/* Hero Section — uses site brand gradient */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[var(--color-primary)] to-[var(--color-secondary)]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.04] blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 border border-white/20 rounded-full px-5 py-2 text-sm font-semibold mb-5 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4 text-emerald-300" /> Evaluasi Diri
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Kuis Refleksi</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">Uji pemahamanmu tentang perencanaan hidup berbasis CT dan nilai Islam</p>
        </div>
      </section>

      {/* Quiz Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          
          {!showResult ? (
            <div className="bg-white dark:bg-[#1c2732] rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06] animate-fade-in-up">
              
              {/* Progress Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="section-badge badge-primary m-0">Soal {currentQ + 1} / {questions.length}</span>
              </div>
              <div className="w-full h-2.5 bg-[var(--color-gray-100)] dark:bg-white/10 rounded-full overflow-hidden mb-8">
                <div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-500" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}></div>
              </div>

              {/* Question */}
              <h3 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white mb-6 leading-relaxed">
                {q.q}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {q.o.map((opt, i) => {
                  let optClass = "p-4 rounded-xl border-2 border-transparent bg-[var(--color-gray-50)] dark:bg-white/[0.04] text-[var(--color-gray-700)] dark:text-white/80 font-medium cursor-pointer transition-all hover:bg-[var(--color-gray-100)] dark:hover:bg-white/[0.08] hover:border-[var(--color-primary)]/30";
                  
                  if (answered) {
                    optClass = "p-4 rounded-xl border-2 border-transparent bg-[var(--color-gray-50)] dark:bg-white/[0.04] text-[var(--color-gray-700)] dark:text-white/80 font-medium transition-all opacity-50 cursor-default";
                    if (i === q.c) {
                      optClass = "p-4 rounded-xl border-2 border-[var(--color-secondary)] bg-[var(--color-secondary-light)] dark:bg-[var(--color-secondary)]/10 text-[var(--color-secondary-dark)] dark:text-[var(--color-secondary)] font-bold cursor-default shadow-sm";
                    } else if (i === selectedOpt && !isCorrect) {
                      optClass = "p-4 rounded-xl border-2 border-red-400 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 font-bold cursor-default";
                    }
                  }

                  return (
                    <div key={i} className={optClass} onClick={() => handleSelectAnswer(i)}>
                      {opt}
                    </div>
                  );
                })}
              </div>

              {/* Feedback */}
              {answered && (
                <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-[var(--color-secondary-light)] dark:bg-[var(--color-secondary)]/10' : 'bg-red-50 dark:bg-red-500/10'} animate-fade-in-up`}>
                  <p className={`text-sm font-semibold ${isCorrect ? 'text-[var(--color-secondary)]' : 'text-red-600 dark:text-red-400'}`}>
                    {isCorrect ? '✅ Benar!' : '❌ Kurang tepat'}
                  </p>
                  <p className="text-sm mt-1 text-[var(--color-gray-700)] dark:text-white/70">
                    {q.f}
                  </p>
                </div>
              )}

              {/* Next Button */}
              <div className="flex justify-between mt-8 min-h-[48px]">
                <div></div>
                {answered && (
                  <button onClick={handleNextQuestion} className="btn-primary animate-fade-in-up">
                    {currentQ < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'} <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Card */
            <div className="bg-white dark:bg-[#1c2732] rounded-3xl p-10 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-none border border-black/[0.04] dark:border-white/[0.06] animate-fade-in-up">
              <div className="text-6xl mb-6">
                {Math.round(score / questions.length * 100) >= 80 ? '🏆' : Math.round(score / questions.length * 100) >= 60 ? '👍' : Math.round(score / questions.length * 100) >= 40 ? '📚' : '💪'}
              </div>
              <h2 className="font-heading text-3xl font-bold text-[var(--color-dark)] dark:text-white mb-2">
                {insight.level}
              </h2>
              <div className="text-5xl font-black text-[var(--color-primary)] font-heading mb-3">
                {score} <span className="text-2xl text-[var(--color-gray-400)]">/ {questions.length}</span>
              </div>
              <p className="text-[var(--color-gray-600)] dark:text-white/70 mb-8 text-lg">
                Kamu menjawab {score} dari {questions.length} soal dengan benar ({Math.round(score / questions.length * 100)}%).
              </p>
              
              <div className={`p-6 rounded-2xl mb-8 ${insightColorMap[insight.color] || insightColorMap.primary}`}>
                <p className="font-medium text-lg">{insight.message}</p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={restartQuiz} className="btn-outline">
                  <RefreshCw className="w-5 h-5 mr-2" /> Ulangi Kuis
                </button>
                <Link href="/planner" className="btn-primary">
                  <Rocket className="w-5 h-5 mr-2" /> Mulai Life Planner
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}

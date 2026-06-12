"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { 
  Rocket, User, Target, Puzzle, LayoutGrid, Calendar, 
  ClipboardCheck, Sparkles, ArrowRight, ArrowLeft, PlusCircle, Trash2, Pencil, FileText, Download 
} from "lucide-react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function PlannerPage() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const [toast, setToast] = useState(null);

  const showToast = (icon, message, bgClass = 'bg-[var(--color-primary)]') => {
    setToast({ icon, message, bgClass });
    setTimeout(() => setToast(null), 3000);
  };

  // Step 1
  const [nama, setNama] = useState("");
  const [kekuatan, setKekuatan] = useState("");
  const [kelemahan, setKelemahan] = useState("");
  const [minat, setMinat] = useState("");

  // Step 2
  const [visi, setVisi] = useState("");
  const [target5, setTarget5] = useState("");
  const [target1, setTarget1] = useState("");
  const [niat, setNiat] = useState("");

  // Step 3
  const [subgoals, setSubgoals] = useState([""]);

  // Step 4
  const [ui, setUi] = useState("");
  const [nui, setNui] = useState("");
  const [uni, setUni] = useState("");
  const [nuni, setNuni] = useState("");

  // Step 5
  const [jadwal, setJadwal] = useState({
    senin: "", selasa: "", rabu: "", kamis: "", jumat: "", sabtu: "", ahad: ""
  });

  // Step 6
  const [baik, setBaik] = useState("");
  const [perbaiki, setPerbaiki] = useState("");
  const [doa, setDoa] = useState("");
  const [wheelScores, setWheelScores] = useState([5, 5, 5, 5, 5, 5, 5, 5]);

  useEffect(() => {
    // Load all data from local storage on mount
    try {
      const data = JSON.parse(localStorage.getItem('life-planner')) || {};
      
      if (data.step1) {
        setNama(data.step1.nama || ""); setKekuatan(data.step1.kekuatan || "");
        setKelemahan(data.step1.kelemahan || ""); setMinat(data.step1.minat || "");
      }
      if (data.step2) {
        setVisi(data.step2.visi || ""); setTarget5(data.step2.target5 || "");
        setTarget1(data.step2.target1 || ""); setNiat(data.step2.niat || "");
      }
      if (data.step3 && data.step3.subgoals?.length > 0) {
        setSubgoals(data.step3.subgoals);
      }
      if (data.step4) {
        setUi(data.step4.ui || ""); setNui(data.step4.nui || "");
        setUni(data.step4.uni || ""); setNuni(data.step4.nuni || "");
      }
      if (data.step5) {
        setJadwal({
          senin: data.step5.senin || "", selasa: data.step5.selasa || "",
          rabu: data.step5.rabu || "", kamis: data.step5.kamis || "",
          jumat: data.step5.jumat || "", sabtu: data.step5.sabtu || "",
          ahad: data.step5.ahad || ""
        });
      }
      if (data.step6) {
        setBaik(data.step6.baik || ""); setPerbaiki(data.step6.perbaiki || "");
        setDoa(data.step6.doa || "");
      }
      
      const savedWheel = JSON.parse(localStorage.getItem('wheel-of-life'));
      if (savedWheel && savedWheel.length === 8) {
        setWheelScores(savedWheel);
      }
    } catch (e) {
      console.error("Error loading data from localStorage", e);
    }
  }, []);

  const saveCurrentStepData = () => {
    try {
      const currentData = JSON.parse(localStorage.getItem('life-planner')) || {};
      
      currentData.step1 = { nama, kekuatan, kelemahan, minat };
      currentData.step2 = { visi, target5, target1, niat };
      currentData.step3 = { subgoals: subgoals.filter(s => s.trim() !== "") };
      currentData.step4 = { ui, nui, uni, nuni };
      currentData.step5 = jadwal;
      currentData.step6 = { baik, perbaiki, doa };
      
      localStorage.setItem('life-planner', JSON.stringify(currentData));
      localStorage.setItem('wheel-of-life', JSON.stringify(wheelScores));
      return currentData;
    } catch(e) {
      console.error(e);
      return {};
    }
  };

  const handleNext = () => {
    saveCurrentStepData();
    if (currentStep === 6) {
      saveToDatabase();
    }
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    saveCurrentStepData();
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const saveToDatabase = async () => {
    if (!session?.user) return;
    const allData = saveCurrentStepData();
    allData.wheel_scores = wheelScores;
    
    try {
      const res = await fetch('/api/planner/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('✅', 'Alhamdulillah! Rencana tersimpan ke database.', 'bg-[var(--color-secondary)]');
      } else {
        showToast('❌', 'Gagal menyimpan ke database.', 'bg-red-500');
      }
    } catch (error) {
      showToast('⚠️', 'Gagal terhubung ke server.', 'bg-yellow-500');
    }
  };

  const handleWheelChange = (index, value) => {
    const newScores = [...wheelScores];
    newScores[index] = parseInt(value);
    setWheelScores(newScores);
  };

  const addSubgoal = () => {
    setSubgoals([...subgoals, ""]);
  };

  const updateSubgoal = (index, value) => {
    const newSubgoals = [...subgoals];
    newSubgoals[index] = value;
    setSubgoals(newSubgoals);
  };

  const removeSubgoal = (index) => {
    const newSubgoals = subgoals.filter((_, i) => i !== index);
    setSubgoals(newSubgoals.length ? newSubgoals : [""]);
  };

  const resetAll = () => {
    if (confirm("Apakah Anda yakin ingin mereset semua data? Tindakan ini tidak dapat dibatalkan.")) {
      localStorage.removeItem('life-planner');
      localStorage.removeItem('wheel-of-life');
      window.location.reload();
    }
  };

  const exportJSON = () => {
    const data = saveCurrentStepData();
    data.wheel_scores = wheelScores;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `life-planner-${nama ? nama.replace(/\s+/g, '-') : 'data'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = async () => {
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('summary-content-to-print');
      
      const opt = {
        margin: 10,
        filename: `Life-Plan-${nama || 'User'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Export failed", error);
      alert("Gagal mengekspor PDF.");
    }
  };

  const isDark = typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false;

  const chartData = {
    labels: ['Ibadah', 'Kesehatan', 'Karir/Pendidikan', 'Keuangan', 'Keluarga', 'Sosial', 'Pengembangan Diri', 'Kebahagiaan'],
    datasets: [{
      label: 'Skor Kehidupan',
      data: wheelScores,
      fill: true,
      backgroundColor: 'rgba(27, 108, 168, 0.15)',
      borderColor: '#1B6CA8',
      pointBackgroundColor: '#1B6CA8',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#1B6CA8',
      borderWidth: 2
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        min: 0,
        ticks: { stepSize: 2, color: isDark ? '#8b98a5' : '#666', backdropColor: 'transparent' },
        grid: { color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' },
        pointLabels: { color: isDark ? '#e1e8ed' : '#333', font: { size: 11, family: 'var(--font-poppins)' } }
      }
    },
    plugins: { legend: { display: false } }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0f1419] min-h-screen">
      <section className="page-header py-16 bg-[var(--color-dark)] text-white relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 rounded-full px-4 py-1.5 text-sm mb-4">
            <Rocket className="w-4 h-4" /> Fitur Utama
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Life Planner</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Buat rencana hidupmu secara terstruktur dengan panduan step-by-step</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4]">Tahap {currentStep} dari {totalSteps}</span>
              <span className="text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar Wizard Nav */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#1c2732] rounded-2xl p-4 shadow-sm border border-black/[0.04] dark:border-white/5 sticky top-24">
                <h3 className="font-heading font-bold text-sm text-[var(--color-dark)] dark:text-white mb-4">Langkah-langkah</h3>
                <div className="space-y-1">
                  {[
                    { s: 1, label: "Kenali Diri" },
                    { s: 2, label: "Tujuan Hidup" },
                    { s: 3, label: "Dekomposisi" },
                    { s: 4, label: "Prioritas" },
                    { s: 5, label: "Jadwal" },
                    { s: 6, label: "Evaluasi" },
                    { s: 7, label: "Ringkasan", icon: "✦" }
                  ].map(item => (
                    <div 
                      key={item.s} 
                      onClick={() => { saveCurrentStepData(); setCurrentStep(item.s); }}
                      className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${currentStep === item.s ? 'bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold' : currentStep > item.s ? 'text-[var(--color-gray-500)] dark:text-[#8b98a5] hover:bg-gray-100 dark:hover:bg-white/5' : 'text-[var(--color-gray-400)] dark:text-[#6e7a85] hover:bg-gray-50 dark:hover:bg-white/5'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${currentStep === item.s ? 'bg-[var(--color-primary)] text-white' : currentStep > item.s ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-white/10'}`}>
                        {currentStep > item.s && item.s !== 7 ? '✓' : item.icon || item.s}
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--color-gray-200)] dark:border-white/10">
                  <button onClick={resetAll} className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 w-full justify-center p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Reset Semua Data
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-[#1c2732] rounded-[20px] p-6 md:p-8 shadow-sm border border-black/[0.04] dark:border-white/5 animate-fade-in-up">
                
                {/* STEP 1 */}
                {currentStep === 1 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white">Kenali Diri</h2>
                        <p className="text-sm text-[var(--color-gray-600)] dark:text-[#8b98a5]">Pahami siapa dirimu sebelum merencanakan</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Nama Lengkap</label><input type="text" value={nama} onChange={e => setNama(e.target.value)} className="form-input" placeholder="Masukkan nama lengkap..." /></div>
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Kekuatan / Kelebihan</label><textarea value={kekuatan} onChange={e => setKekuatan(e.target.value)} rows="3" className="form-input" placeholder="Apa saja kelebihan yang kamu miliki?"></textarea></div>
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Kelemahan / Tantangan</label><textarea value={kelemahan} onChange={e => setKelemahan(e.target.value)} rows="3" className="form-input" placeholder="Apa yang perlu kamu perbaiki?"></textarea></div>
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Minat & Bakat</label><textarea value={minat} onChange={e => setMinat(e.target.value)} rows="3" className="form-input" placeholder="Apa yang paling kamu sukai dan kuasai?"></textarea></div>
                    </div>
                    <div className="flex justify-end mt-8"><button onClick={handleNext} className="btn-primary">Selanjutnya <ArrowRight className="w-4 h-4 ml-2" /></button></div>
                  </div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-secondary-light)] dark:bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] flex items-center justify-center">
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white">Tentukan Tujuan</h2>
                        <p className="text-sm text-[var(--color-gray-600)] dark:text-[#8b98a5]">Tetapkan visi dan misi hidupmu</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Visi Hidup (10+ tahun)</label><textarea value={visi} onChange={e => setVisi(e.target.value)} rows="3" className="form-input" placeholder="Ingin menjadi apa di masa depan?"></textarea></div>
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Target 5 Tahun</label><textarea value={target5} onChange={e => setTarget5(e.target.value)} rows="3" className="form-input" placeholder="Apa yang ingin dicapai dalam 5 tahun?"></textarea></div>
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Target 1 Tahun</label><textarea value={target1} onChange={e => setTarget1(e.target.value)} rows="3" className="form-input" placeholder="Apa yang ingin dicapai tahun ini?"></textarea></div>
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Niat (Karena Allah)</label><textarea value={niat} onChange={e => setNiat(e.target.value)} rows="2" className="form-input" placeholder="Niatkan semua karena Allah..."></textarea></div>
                    </div>
                    <div className="flex justify-between mt-8"><button onClick={handlePrev} className="btn-outline"><ArrowLeft className="w-4 h-4 mr-2" /> Kembali</button><button onClick={handleNext} className="btn-primary">Selanjutnya <ArrowRight className="w-4 h-4 ml-2" /></button></div>
                  </div>
                )}

                {/* STEP 3 */}
                {currentStep === 3 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent-light)] dark:bg-[#D4AC0D]/20 text-[#8B7500] dark:text-[#D4AC0D] flex items-center justify-center">
                        <Puzzle className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white">Dekomposisi</h2>
                        <p className="text-sm text-[var(--color-gray-600)] dark:text-[#8b98a5]">Pecah tujuanmu menjadi langkah-langkah kecil</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-gray-600)] dark:text-[#a0aab4] mb-4">Tambahkan sub-goals untuk mencapai target 1 tahunmu:</p>
                    <div className="space-y-3 mb-4">
                      {subgoals.map((sg, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input type="text" value={sg} onChange={e => updateSubgoal(i, e.target.value)} className="form-input flex-grow" placeholder="Sub-goal..." />
                          <button onClick={() => removeSubgoal(i)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors dark:bg-red-500/10 dark:hover:bg-red-500/20"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                    <button onClick={addSubgoal} className="text-sm text-[var(--color-primary)] font-semibold hover:underline flex items-center gap-1"><PlusCircle className="w-4 h-4" /> Tambah Sub-Goal</button>
                    <div className="flex justify-between mt-8"><button onClick={handlePrev} className="btn-outline"><ArrowLeft className="w-4 h-4 mr-2" /> Kembali</button><button onClick={handleNext} className="btn-primary">Selanjutnya <ArrowRight className="w-4 h-4 ml-2" /></button></div>
                  </div>
                )}

                {/* STEP 4 */}
                {currentStep === 4 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#f0e6f6] dark:bg-[#8e44ad]/20 text-[#8e44ad] dark:text-[#c39bd3] flex items-center justify-center">
                        <LayoutGrid className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white">Prioritas — Eisenhower Matrix</h2>
                        <p className="text-sm text-[var(--color-gray-600)] dark:text-[#8b98a5]">Kategorikan sub-goals berdasarkan urgensi dan kepentingan</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50/50 dark:bg-red-500/5">
                        <h4 className="font-heading font-bold text-sm text-red-600 dark:text-red-400 mb-2">🔴 Urgent & Important</h4>
                        <p className="text-xs text-[var(--color-gray-600)] dark:text-[#8b98a5] mb-2">Kerjakan segera</p>
                        <textarea value={ui} onChange={e => setUi(e.target.value)} rows="3" className="w-full px-3 py-2 rounded-lg border border-red-200 dark:border-red-500/30 text-sm focus:outline-none focus:border-red-400 bg-white dark:bg-[#1c2732] dark:text-white" placeholder="Tulis di sini..."></textarea>
                      </div>
                      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/5">
                        <h4 className="font-heading font-bold text-sm text-[var(--color-primary)] dark:text-blue-400 mb-2">🔵 Not Urgent & Important</h4>
                        <p className="text-xs text-[var(--color-gray-600)] dark:text-[#8b98a5] mb-2">Jadwalkan</p>
                        <textarea value={nui} onChange={e => setNui(e.target.value)} rows="3" className="w-full px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-500/30 text-sm focus:outline-none focus:border-blue-400 bg-white dark:bg-[#1c2732] dark:text-white" placeholder="Tulis di sini..."></textarea>
                      </div>
                      <div className="p-4 rounded-xl border border-yellow-200 dark:border-yellow-500/20 bg-yellow-50/50 dark:bg-yellow-500/5">
                        <h4 className="font-heading font-bold text-sm text-[#b8960b] dark:text-yellow-400 mb-2">🟡 Urgent & Not Important</h4>
                        <p className="text-xs text-[var(--color-gray-600)] dark:text-[#8b98a5] mb-2">Delegasikan</p>
                        <textarea value={uni} onChange={e => setUni(e.target.value)} rows="3" className="w-full px-3 py-2 rounded-lg border border-yellow-300 dark:border-yellow-500/30 text-sm focus:outline-none focus:border-yellow-500 bg-white dark:bg-[#1c2732] dark:text-white" placeholder="Tulis di sini..."></textarea>
                      </div>
                      <div className="p-4 rounded-xl border border-[var(--color-gray-200)] dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                        <h4 className="font-heading font-bold text-sm text-[var(--color-gray-600)] dark:text-gray-400 mb-2">⚪ Not Urgent & Not Important</h4>
                        <p className="text-xs text-[var(--color-gray-600)] dark:text-[#8b98a5] mb-2">Eliminasi</p>
                        <textarea value={nuni} onChange={e => setNuni(e.target.value)} rows="3" className="w-full px-3 py-2 rounded-lg border border-[var(--color-gray-300)] dark:border-white/20 text-sm focus:outline-none focus:border-[var(--color-gray-400)] bg-white dark:bg-[#1c2732] dark:text-white" placeholder="Tulis di sini..."></textarea>
                      </div>
                    </div>
                    <div className="flex justify-between mt-8"><button onClick={handlePrev} className="btn-outline"><ArrowLeft className="w-4 h-4 mr-2" /> Kembali</button><button onClick={handleNext} className="btn-primary">Selanjutnya <ArrowRight className="w-4 h-4 ml-2" /></button></div>
                  </div>
                )}

                {/* STEP 5 */}
                {currentStep === 5 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white">Jadwal Aksi</h2>
                        <p className="text-sm text-[var(--color-gray-600)] dark:text-[#8b98a5]">Buat jadwal mingguan untuk menjalankan rencanamu</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {['senin','selasa','rabu','kamis','jumat','sabtu','ahad'].map(day => (
                        <div key={day} className="flex items-start gap-3">
                          <span className="text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] w-16 pt-3 flex-shrink-0 capitalize">{day}</span>
                          <input type="text" value={jadwal[day]} onChange={e => setJadwal({...jadwal, [day]: e.target.value})} className="form-input flex-grow" placeholder={`Rencana kegiatan hari ${day.charAt(0).toUpperCase() + day.slice(1)}...`} />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-8"><button onClick={handlePrev} className="btn-outline"><ArrowLeft className="w-4 h-4 mr-2" /> Kembali</button><button onClick={handleNext} className="btn-primary">Selanjutnya <ArrowRight className="w-4 h-4 ml-2" /></button></div>
                  </div>
                )}

                {/* STEP 6 */}
                {currentStep === 6 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--color-secondary-light)] dark:bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] flex items-center justify-center">
                        <ClipboardCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] dark:text-white">Evaluasi & Tawakal</h2>
                        <p className="text-sm text-[var(--color-gray-600)] dark:text-[#8b98a5]">Refleksi dan serahkan kepada Allah</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Apa yang sudah berjalan baik?</label><textarea value={baik} onChange={e => setBaik(e.target.value)} rows="3" className="form-input" placeholder="Syukuri pencapaianmu..."></textarea></div>
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Apa yang perlu diperbaiki?</label><textarea value={perbaiki} onChange={e => setPerbaiki(e.target.value)} rows="3" className="form-input" placeholder="Evaluasi dengan jujur..."></textarea></div>
                      <div><label className="block text-sm font-semibold text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-2">Doa & Harapan</label><textarea value={doa} onChange={e => setDoa(e.target.value)} rows="3" className="form-input" placeholder="Serahkan kepada Allah..."></textarea></div>
                    </div>

                    <div className="mt-8 p-6 rounded-xl border border-[var(--color-gray-200)] dark:border-white/10 bg-[var(--color-gray-50)] dark:bg-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center"><i data-lucide="pie-chart" className="w-5 h-5"></i></div>
                        <div>
                          <h3 className="font-heading font-bold text-[var(--color-dark)] dark:text-white text-sm">Roda Kehidupan</h3>
                          <p className="text-xs text-[var(--color-gray-600)] dark:text-[#8b98a5]">Nilai setiap aspek hidupmu (1-10)</p>
                        </div>
                      </div>
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          {['Ibadah 🕌', 'Kesehatan 💪', 'Karir/Pend. 💼', 'Keuangan 💰', 'Keluarga 👨‍👩‍👧‍👦', 'Sosial 🤝', 'Peng. Diri 📚', 'Kebahagiaan 😊'].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <span className="text-xs font-medium text-[var(--color-gray-700)] dark:text-[#a0aab4] w-28 truncate">{item}</span>
                              <input type="range" min="0" max="10" value={wheelScores[idx]} onChange={e => handleWheelChange(idx, e.target.value)} className="flex-grow accent-[var(--color-primary)] h-2" />
                              <span className="text-sm font-bold text-[var(--color-primary)] w-6 text-right">{wheelScores[idx]}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-center min-h-[200px]">
                          <Radar data={chartData} options={chartOptions} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-[var(--color-accent-light)] dark:bg-[#D4AC0D]/10 rounded-xl text-center">
                      <p className="text-sm text-[#8B7500] dark:text-[#D4AC0D] italic">"Ya Allah, aku telah berikhtiar semaksimal mungkin. Aku serahkan hasilnya kepada-Mu. Engkau sebaik-baik Penolong dan Pelindung."</p>
                    </div>
                    <div className="flex justify-between mt-8"><button onClick={handlePrev} className="btn-outline"><ArrowLeft className="w-4 h-4 mr-2" /> Kembali</button><button onClick={handleNext} className="btn-primary"><Sparkles className="w-4 h-4 mr-2" /> Lihat Ringkasan</button></div>
                  </div>
                )}

                {/* STEP 7 */}
                {currentStep === 7 && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="text-5xl mb-3">🎉</div>
                      <h2 className="font-heading text-2xl font-bold text-[var(--color-dark)] dark:text-white">Alhamdulillah!</h2>
                      <p className="text-[var(--color-gray-600)] dark:text-[#8b98a5] text-sm mt-1">Rencana hidupmu telah tersimpan. Berikut ringkasannya:</p>
                    </div>

                    <div id="summary-content-to-print" className="bg-white dark:bg-[#0f1419] p-2">
                      <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary-light)] dark:from-[var(--color-primary)]/20 dark:to-[var(--color-secondary)]/20">
                        <h3 className="font-heading font-bold text-sm text-[var(--color-primary)] dark:text-blue-400 mb-3"><User className="w-4 h-4 inline mr-1" /> Profil</h3>
                        <p className="text-lg font-bold text-[var(--color-dark)] dark:text-white">{nama || '-'}</p>
                        <div className="grid grid-cols-3 gap-3 mt-3">
                          <div><p className="text-[10px] uppercase tracking-wider text-[var(--color-gray-500)] dark:text-[#6e7a85] mb-0.5">Kekuatan</p><p className="text-xs text-[var(--color-gray-700)] dark:text-[#a0aab4]">{kekuatan || '-'}</p></div>
                          <div><p className="text-[10px] uppercase tracking-wider text-[var(--color-gray-500)] dark:text-[#6e7a85] mb-0.5">Kelemahan</p><p className="text-xs text-[var(--color-gray-700)] dark:text-[#a0aab4]">{kelemahan || '-'}</p></div>
                          <div><p className="text-[10px] uppercase tracking-wider text-[var(--color-gray-500)] dark:text-[#6e7a85] mb-0.5">Minat</p><p className="text-xs text-[var(--color-gray-700)] dark:text-[#a0aab4]">{minat || '-'}</p></div>
                        </div>
                      </div>

                      <div className="mb-6 p-5 rounded-xl border border-[var(--color-gray-200)] dark:border-white/10">
                        <h3 className="font-heading font-bold text-sm text-[var(--color-secondary)] dark:text-green-400 mb-3"><Target className="w-4 h-4 inline mr-1" /> Visi & Target</h3>
                        <div className="space-y-3">
                          <div><p className="text-[10px] uppercase tracking-wider text-[var(--color-gray-500)] dark:text-[#6e7a85] mb-0.5">Visi Hidup (10+ Tahun)</p><p className="text-sm text-[var(--color-dark)] dark:text-white font-medium">{visi || '-'}</p></div>
                          <div className="grid grid-cols-2 gap-3">
                            <div><p className="text-[10px] uppercase tracking-wider text-[var(--color-gray-500)] dark:text-[#6e7a85] mb-0.5">Target 5 Tahun</p><p className="text-xs text-[var(--color-gray-700)] dark:text-[#a0aab4]">{target5 || '-'}</p></div>
                            <div><p className="text-[10px] uppercase tracking-wider text-[var(--color-gray-500)] dark:text-[#6e7a85] mb-0.5">Target 1 Tahun</p><p className="text-xs text-[var(--color-gray-700)] dark:text-[#a0aab4]">{target1 || '-'}</p></div>
                          </div>
                          <div className="p-3 bg-[var(--color-accent-light)] dark:bg-[#D4AC0D]/10 rounded-lg"><p className="text-xs text-[var(--color-gray-700)] dark:text-[#D4AC0D] italic">"Niat: {niat || '-'}"</p></div>
                        </div>
                      </div>

                      <div className="mb-6 p-5 rounded-xl border border-[var(--color-gray-200)] dark:border-white/10">
                        <h3 className="font-heading font-bold text-sm text-[#D4AC0D] mb-3"><Puzzle className="w-4 h-4 inline mr-1" /> Sub-Goals</h3>
                        <ul className="space-y-1.5">
                          {subgoals.filter(sg => sg.trim() !== "").length > 0 ? subgoals.filter(sg => sg.trim() !== "").map((sg, i) => (
                            <li key={i} className="flex items-start gap-2"><span className="text-[var(--color-secondary)] dark:text-green-400 mt-0.5">✓</span><span className="text-xs text-[var(--color-gray-700)] dark:text-[#a0aab4]">{sg}</span></li>
                          )) : <li className="text-xs text-[var(--color-gray-500)] dark:text-[#6e7a85]">-</li>}
                        </ul>
                      </div>

                      {/* We omit full print details for brevity in UI, user can download PDF */}

                      <div className="text-center mb-6">
                        <p className="text-[10px] text-[var(--color-gray-400)] dark:text-[#6e7a85]">Tersimpan di perangkat Anda • {new Date().toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center">
                      <button onClick={() => { setCurrentStep(1); window.scrollTo(0,0); }} className="btn-outline">
                        <Pencil className="w-4 h-4 mr-2" /> Edit Rencana
                      </button>
                      <button onClick={exportPDF} className="btn-primary">
                        <FileText className="w-4 h-4 mr-2" /> Download PDF
                      </button>
                      <button onClick={exportJSON} className="btn-outline p-3" title="Export JSON">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[999] px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-medium animate-fade-in-up flex items-center gap-2 ${toast.bgClass}`}>
          <span>{toast.icon}</span>
          <span>{toast.message}</span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .form-input {
          width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; border: 1px solid var(--color-gray-300);
          outline: none; transition: all 0.2s; font-size: 0.875rem; background-color: transparent;
        }
        .dark .form-input {
          border-color: rgba(255,255,255,0.1); color: white;
        }
        .form-input:focus {
          border-color: var(--color-primary); box-shadow: 0 0 0 4px rgba(27,108,168,0.1);
        }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}

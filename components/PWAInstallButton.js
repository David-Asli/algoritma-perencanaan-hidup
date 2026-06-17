"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone, X, Share, MoreVertical, CheckCircle2 } from "lucide-react";

// Deteksi platform
function getPlatform() {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isAndroid = /android/i.test(ua);
  const isChrome = /chrome/i.test(ua) && !/edge/i.test(ua);
  const isEdge = /edg/i.test(ua);
  if (isIOS) return "ios";
  if (isAndroid && (isChrome || isEdge)) return "android";
  if (isChrome || isEdge) return "desktop-chrome";
  return "other";
}

export default function PWAInstallButton({ variant = "navbar" }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled]       = useState(false);
  const [platform, setPlatform]             = useState("unknown");
  const [showGuide, setShowGuide]           = useState(false);
  const [showBanner, setShowBanner]         = useState(false);
  const [installing, setInstalling]         = useState(false);

  useEffect(() => {
    const p = getPlatform();
    setPlatform(p);

    // Sudah terinstall (standalone)?
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (isStandalone) { setIsInstalled(true); return; }

    // Chrome/Edge: tangkap beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = sessionStorage.getItem("pwa-banner-dismissed");
      if (!dismissed) setTimeout(() => setShowBanner(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowBanner(false);
    });
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    // Chrome/Edge — native prompt
    if (deferredPrompt) {
      setInstalling(true);
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") { setIsInstalled(true); setShowBanner(false); }
      setDeferredPrompt(null);
      setInstalling(false);
      return;
    }
    // iOS / lainnya — tampilkan panduan
    setShowGuide(true);
  };

  const dismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("pwa-banner-dismissed", "true");
  };

  // Sudah install — tampilkan badge
  if (isInstalled) {
    if (variant === "navbar") {
      return (
        <span className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4" /> Terinstall
        </span>
      );
    }
    return null;
  }

  // ── Tombol Navbar ───────────────────────────────────────
  if (variant === "navbar") {
    return (
      <>
        <button
          onClick={handleInstall}
          disabled={installing}
          title="Install aplikasi ke perangkat"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
                     bg-emerald-500/10 text-emerald-600 dark:text-emerald-400
                     border border-emerald-500/30
                     hover:bg-emerald-500/20 active:scale-95 transition-all
                     disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          <span className="hidden xl:inline">Install App</span>
        </button>

        {showBanner && (
          <PWABanner
            platform={platform}
            onInstall={handleInstall}
            onDismiss={dismissBanner}
            installing={installing}
          />
        )}

        {showGuide && (
          <InstallGuide platform={platform} onClose={() => setShowGuide(false)} />
        )}
      </>
    );
  }

  // ── Tombol Mobile Menu ──────────────────────────────────
  if (variant === "mobile") {
    return (
      <>
        <button
          onClick={handleInstall}
          disabled={installing}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full
                     bg-emerald-500/10 text-emerald-600 dark:text-emerald-400
                     border border-emerald-500/20
                     hover:bg-emerald-500/20 active:scale-95 transition-all
                     disabled:opacity-60"
        >
          <Smartphone className="w-5 h-5" />
          <div className="text-left">
            <p className="text-sm font-semibold leading-none">
              {installing ? "Menginstall..." : "Install Aplikasi"}
            </p>
            <p className="text-xs opacity-60 mt-0.5">Tambahkan ke layar utama</p>
          </div>
          <Download className="w-4 h-4 ml-auto opacity-60" />
        </button>

        {showGuide && (
          <InstallGuide platform={platform} onClose={() => setShowGuide(false)} />
        )}
      </>
    );
  }

  return null;
}

// ── Banner otomatis di bagian bawah layar ───────────────────
function PWABanner({ platform, onInstall, onDismiss, installing }) {
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:w-[360px] z-[300]
                    bg-[#0F172A] border border-emerald-500/40 rounded-2xl
                    shadow-2xl shadow-black/50 p-4"
      style={{ animation: "slideUp .3s ease-out" }}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-md">
          <img src="/icon-192.png" alt="App Icon" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">Install AlgoPlan</p>
          <p className="text-white/55 text-xs mt-0.5 leading-relaxed">
            {platform === "ios"
              ? "Tambahkan ke Home Screen untuk akses offline."
              : "Install gratis — akses cepat tanpa buka browser."}
          </p>
        </div>
        <button onClick={onDismiss} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
          <X className="w-4 h-4 text-white/40" />
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={onDismiss}
          className="flex-1 py-2.5 rounded-xl text-sm text-white/50 hover:text-white
                     border border-white/10 hover:bg-white/5 transition-colors"
        >
          Nanti
        </button>
        <button
          onClick={onInstall}
          disabled={installing}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold
                     bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white
                     flex items-center justify-center gap-1.5 transition-all
                     disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          {installing ? "Memproses..." : platform === "ios" ? "Cara Install" : "Install"}
        </button>
      </div>
      <style>{`@keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  );
}

// ── Panduan install per platform ────────────────────────────
function InstallGuide({ platform, onClose }) {
  const steps = platform === "ios"
    ? [
        { icon: <Share className="w-5 h-5 text-blue-400" />, text: 'Tap tombol Share (kotak dengan panah atas) di toolbar Safari' },
        { icon: <span className="text-lg">📋</span>,          text: 'Scroll ke bawah dan pilih "Add to Home Screen"' },
        { icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, text: 'Tap "Add" — ikon app muncul di Home Screen!' },
      ]
    : [
        { icon: <MoreVertical className="w-5 h-5 text-gray-400" />, text: 'Tap menu ⋮ (tiga titik) di pojok kanan atas browser' },
        { icon: <Download className="w-5 h-5 text-emerald-400" />,  text: 'Pilih "Install App" atau "Add to Home Screen"' },
        { icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, text: 'Konfirmasi install — app siap digunakan!' },
      ];

  return (
    <div className="fixed inset-0 z-[400] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm bg-[#0F172A] border border-white/10 rounded-2xl p-6 shadow-2xl"
        style={{ animation: "slideUp .3s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
            <img src="/icon-192.png" alt="App Icon" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white font-bold text-base">Install AlgoPlan</p>
            <p className="text-white/50 text-xs">
              {platform === "ios" ? "Panduan untuk Safari / iOS" : "Panduan untuk Android / Browser"}
            </p>
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3 mb-5">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Catatan */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mb-4">
          <p className="text-emerald-400 text-xs leading-relaxed">
            💡 Setelah install, app bisa diakses seperti aplikasi native — tanpa buka browser, bisa offline.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400
                     text-white font-semibold text-sm transition-colors active:scale-95"
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}

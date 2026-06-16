"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone, X, CheckCircle } from "lucide-react";

export default function PWAInstallButton({ variant = "navbar" }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled]     = useState(false);
  const [showBanner, setShowBanner]       = useState(false);
  const [installing, setInstalling]       = useState(false);

  useEffect(() => {
    // Cek apakah sudah terinstall (standalone mode)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Tangkap event beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);

      // Tampilkan banner otomatis setelah 3 detik (hanya sekali)
      const dismissed = sessionStorage.getItem("pwa-banner-dismissed");
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Deteksi setelah berhasil install
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowBanner(false);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowBanner(false);
    }
    setDeferredPrompt(null);
    setInstalling(false);
  };

  const dismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("pwa-banner-dismissed", "true");
  };

  // Tidak tampilkan apa pun kalau sudah install atau tidak support
  if (isInstalled || !isInstallable) return null;

  // ── Variant: tombol di Navbar ───────────────────────────
  if (variant === "navbar") {
    return (
      <>
        <button
          onClick={handleInstall}
          disabled={installing}
          title="Install aplikasi"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
                     bg-emerald-500/10 text-emerald-600 dark:text-emerald-400
                     border border-emerald-500/30
                     hover:bg-emerald-500/20 transition-colors disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          <span className="hidden xl:inline">Install App</span>
        </button>

        {/* Bottom banner */}
        {showBanner && (
          <PWABanner onInstall={handleInstall} onDismiss={dismissBanner} installing={installing} />
        )}
      </>
    );
  }

  // ── Variant: item di Mobile Menu ───────────────────────
  if (variant === "mobile") {
    return (
      <button
        onClick={handleInstall}
        disabled={installing}
        className="flex items-center gap-3 px-4 py-3 rounded-xl w-full
                   bg-emerald-500/10 text-emerald-600 dark:text-emerald-400
                   border border-emerald-500/20
                   hover:bg-emerald-500/20 transition-colors disabled:opacity-60"
      >
        <Smartphone className="w-5 h-5" />
        <span className="text-sm font-medium">
          {installing ? "Menginstall..." : "Install Aplikasi"}
        </span>
      </button>
    );
  }

  return null;
}

// ── Banner popup bawah layar ────────────────────────────────
function PWABanner({ onInstall, onDismiss, installing }) {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[360px] z-[200]
                    bg-[#0F172A] border border-emerald-500/30
                    rounded-2xl shadow-2xl shadow-black/40 p-4
                    animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700
                        flex items-center justify-center shrink-0">
          <img src="/icon-192.png" alt="App Icon" className="w-10 h-10 rounded-lg" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm">Install AlgoPlan</p>
          <p className="text-white/60 text-xs mt-0.5 leading-relaxed">
            Tambahkan ke layar utama untuk akses cepat tanpa browser.
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onDismiss}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
        >
          <X className="w-4 h-4 text-white/50" />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={onDismiss}
          className="flex-1 py-2 rounded-lg text-sm text-white/60 hover:text-white
                     border border-white/10 hover:bg-white/5 transition-colors"
        >
          Nanti
        </button>
        <button
          onClick={onInstall}
          disabled={installing}
          className="flex-1 py-2 rounded-lg text-sm font-semibold
                     bg-emerald-500 hover:bg-emerald-400 text-white
                     transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          {installing ? "Memproses..." : "Install"}
        </button>
      </div>
    </div>
  );
}

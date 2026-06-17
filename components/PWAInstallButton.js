"use client";

import { useState, useEffect } from "react";
import { Download, Smartphone, CheckCircle2 } from "lucide-react";

export default function PWAInstallButton({ variant = "navbar" }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled]       = useState(false);
  const [ready, setReady]                   = useState(false);
  const [installing, setInstalling]         = useState(false);

  useEffect(() => {
    // Sudah standalone (terinstall)?
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (standalone) { setIsInstalled(true); return; }

    // Tangkap event install dari browser
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setReady(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setIsInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt || installing) return;
    setInstalling(true);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setDeferredPrompt(null);
    setReady(false);
    setInstalling(false);
  };

  // Sudah terinstall — sembunyikan
  if (isInstalled) return null;

  // ── Mobile Topbar (ikon saja, langsung di navbar HP) ────
  if (variant === "mobile-topbar") {
    return (
      <button
        onClick={handleInstall}
        disabled={!ready || installing}
        title={ready ? "Install aplikasi" : "Gunakan Chrome/Edge untuk install"}
        className={`p-2 rounded-lg transition-all
          ${ready
            ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 active:scale-95"
            : "text-gray-300 dark:text-white/20 cursor-not-allowed"
          }`}
      >
        {installing
          ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          : <Download className="w-5 h-5" />
        }
      </button>
    );
  }

  // ── Navbar variant ──────────────────────────────────────
  if (variant === "navbar") {
    return (
      <button
        onClick={handleInstall}
        disabled={!ready || installing}
        title={ready ? "Install aplikasi ke perangkat" : "Buka di browser Chrome/Edge untuk install"}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-all
          ${ready
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 active:scale-95 cursor-pointer"
            : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/30 border-gray-200 dark:border-white/10 cursor-not-allowed opacity-50"
          }`}
      >
        {installing
          ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          : <Download className="w-4 h-4" />
        }
        <span className="hidden xl:inline">
          {installing ? "Installing..." : "Install App"}
        </span>
      </button>
    );
  }

  // ── Mobile Menu variant ─────────────────────────────────
  if (variant === "mobile") {
    return (
      <button
        onClick={handleInstall}
        disabled={!ready || installing}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full border transition-all
          ${ready
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95"
            : "bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-white/30 border-gray-200 dark:border-white/10 opacity-50"
          }`}
      >
        {installing
          ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          : <Smartphone className="w-5 h-5" />
        }
        <div className="text-left">
          <p className="text-sm font-semibold leading-none">
            {installing ? "Menginstall..." : "Install Aplikasi"}
          </p>
          <p className="text-xs opacity-60 mt-0.5">
            {ready ? "Tambahkan ke layar utama" : "Gunakan Chrome/Edge untuk install"}
          </p>
        </div>
        {ready && !installing && <Download className="w-4 h-4 ml-auto opacity-60" />}
      </button>
    );
  }

  return null;
}

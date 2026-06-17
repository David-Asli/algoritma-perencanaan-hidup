"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye, EyeOff, Mail, Lock, AlertCircle,
  LogIn, Zap, BookOpen, BarChart3
} from "lucide-react";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [emailError, setEmailError]     = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  const validateEmail = (val) => {
    if (!val) { setEmailError("Email wajib diisi"); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setEmailError("Format email tidak valid"); return false; }
    setEmailError(""); return true;
  };

  const validatePassword = (val) => {
    if (!val) { setPasswordError("Password wajib diisi"); return false; }
    setPasswordError(""); return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email) | !validatePassword(password)) return;
    setLoading(true);
    const res = await signIn("credentials", { redirect: false, email, password });
    if (res.error) { setError("Email atau password salah."); setLoading(false); }
    else { router.push("/dashboard"); router.refresh(); }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-[#0f1419]">

      {/* ── HERO PANEL ── hidden on mobile, show on lg+ ─────── */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] bg-gradient-to-br from-[#0f2027] via-[var(--color-primary)] to-[var(--color-secondary)] items-center justify-center relative overflow-hidden p-12 xl:p-16 min-h-screen">
        {/* pattern */}
        <div className="absolute inset-0 opacity-50 pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        {/* particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: "15%", left: "20%", delay: "0s", size: 6 },
            { top: "60%", left: "75%", delay: "1s", size: 8 },
            { top: "80%", left: "30%", delay: "2s", size: 5 },
            { top: "25%", left: "65%", delay: "1.5s", size: 6 },
            { top: "50%", left: "10%", delay: "3s", size: 7 },
          ].map((p, i) => (
            <span key={i} className="particle absolute rounded-full"
              style={{ top: p.top, left: p.left, animationDelay: p.delay, width: p.size, height: p.size }}
            />
          ))}
        </div>

        <div className="relative z-10 text-white max-w-md animate-fade-in-up">
          {/* Logo */}
          <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-2xl overflow-hidden mb-7 shadow-xl">
            <img src="/icon-192.png" alt="Logo" className="w-full h-full object-cover" />
          </div>

          <h1 className="text-3xl xl:text-5xl font-bold mb-4 leading-tight font-heading">
            Algoritma<br />Perencanaan Hidup
          </h1>
          <p className="text-sm xl:text-base leading-relaxed text-white/85 mb-8">
            Implementasi Computational Thinking dalam Konsep Ikhtiar dan Tawakal Berbasis Al-Qur'an
          </p>

          <div className="flex flex-col gap-3">
            {[
              { icon: <Zap className="w-4 h-4 xl:w-5 xl:h-5 flex-shrink-0 text-yellow-300" />, text: "Perencanaan hidup berbasis algoritma" },
              { icon: <BookOpen className="w-4 h-4 xl:w-5 xl:h-5 flex-shrink-0 text-yellow-300" />, text: "Berlandaskan nilai-nilai Al-Qur'an" },
              { icon: <BarChart3 className="w-4 h-4 xl:w-5 xl:h-5 flex-shrink-0 text-yellow-300" />, text: "Evaluasi dan refleksi diri interaktif" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 hover:bg-white/15 transition-colors">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FORM PANEL ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-8 lg:px-12 min-h-screen">

        {/* Mobile logo — only on small screens */}
        <div className="flex lg:hidden flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg mb-3">
            <img src="/icon-192.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-center text-[var(--color-gray-500)] dark:text-white/50 font-medium">
            Algoritma Perencanaan Hidup
          </p>
        </div>

        {/* Card */}
        <div className="w-full max-w-[440px]">
          <div className="bg-white dark:bg-[#1c2732] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg dark:shadow-black/30 border border-black/[0.04] dark:border-white/5 animate-fade-in-up">

            {/* Header */}
            <div className="text-center mb-7">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-dark)] dark:text-[#e1e8ed] mb-1 font-heading">
                Selamat Datang!
              </h2>
              <p className="text-[var(--color-gray-600)] dark:text-[#8b98a5] text-sm">
                Masuk ke akun Anda untuk melanjutkan
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full mx-auto mt-3" />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm mb-5 flex items-center gap-2 border border-red-100 dark:border-red-800/30">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Email */}
              <div>
                <label className="block font-semibold text-sm text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-1.5">
                  Email
                </label>
                <div className={`flex items-center bg-[var(--color-gray-100)] dark:bg-[#253341] border-2 rounded-xl transition-all overflow-hidden
                  ${emailError
                    ? "border-red-400 dark:border-red-600"
                    : "border-transparent focus-within:border-[var(--color-primary)] focus-within:bg-white dark:focus-within:bg-[#1c2732] focus-within:shadow-[0_0_0_4px_rgba(27,108,168,0.1)]"}`}
                >
                  <span className="px-3 text-[var(--color-gray-500)] dark:text-[#6e7a85]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }}
                    onBlur={(e) => validateEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="flex-1 min-w-0 border-none outline-none bg-transparent py-3 pr-3 text-sm text-[var(--color-gray-800)] dark:text-[#e1e8ed] placeholder-[var(--color-gray-400)] dark:placeholder-[#6e7a85]"
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {emailError}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block font-semibold text-sm text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-1.5">
                  Password
                </label>
                <div className={`flex items-center bg-[var(--color-gray-100)] dark:bg-[#253341] border-2 rounded-xl transition-all overflow-hidden
                  ${passwordError
                    ? "border-red-400 dark:border-red-600"
                    : "border-transparent focus-within:border-[var(--color-primary)] focus-within:bg-white dark:focus-within:bg-[#1c2732] focus-within:shadow-[0_0_0_4px_rgba(27,108,168,0.1)]"}`}
                >
                  <span className="px-3 text-[var(--color-gray-500)] dark:text-[#6e7a85]">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (passwordError) validatePassword(e.target.value); }}
                    onBlur={(e) => validatePassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="flex-1 min-w-0 border-none outline-none bg-transparent py-3 text-sm text-[var(--color-gray-800)] dark:text-[#e1e8ed] placeholder-[var(--color-gray-400)] dark:placeholder-[#6e7a85]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 text-[var(--color-gray-500)] dark:text-[#6e7a85] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {passwordError}
                  </p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--color-gray-700)] dark:text-[#a0aab4]">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer rounded" />
                  Ingat Saya
                </label>
                <Link href="#" className="text-sm text-[var(--color-primary)] font-medium hover:underline">
                  Lupa Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]
                           text-white font-semibold text-sm sm:text-base
                           flex items-center justify-center gap-2
                           shadow-[0_4px_15px_rgba(27,108,168,0.3)]
                           hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(27,108,168,0.4)]
                           active:translate-y-0 transition-all
                           disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><LogIn className="w-4 h-4" /> Masuk</>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5 text-[var(--color-gray-400)] dark:text-[#6e7a85] text-xs">
              <div className="flex-1 h-px bg-[var(--color-gray-200)] dark:bg-white/10" />
              atau masuk dengan
              <div className="flex-1 h-px bg-[var(--color-gray-200)] dark:bg-white/10" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 border-2 border-[var(--color-gray-200)] dark:border-white/10 rounded-xl bg-white dark:bg-[#253341] text-sm font-medium text-[var(--color-gray-700)] dark:text-[#a0aab4] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:hover:text-white dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border-2 border-[var(--color-gray-200)] dark:border-white/10 rounded-xl bg-white dark:bg-[#253341] text-sm font-medium text-[var(--color-gray-700)] dark:text-[#a0aab4] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:hover:text-white dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Register link */}
            <p className="text-center mt-6 text-sm text-[var(--color-gray-600)] dark:text-[#8b98a5]">
              Belum punya akun?{" "}
              <Link href="/register" className="text-[var(--color-primary)] font-semibold hover:underline transition-colors">
                Daftar Sekarang
              </Link>
            </p>
          </div>

          {/* Footer note */}
          <p className="text-center mt-5 text-xs text-[var(--color-gray-400)] dark:text-white/30">
            © {new Date().getFullYear()} Algoritma Perencanaan Hidup
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .particle {
          background: rgba(212,172,13,.5);
          animation: floatP 6s ease-in-out infinite;
        }
        @keyframes floatP {
          0%,100% { transform: translateY(0) scale(1); opacity:.5; }
          50% { transform: translateY(-20px) scale(1.3); opacity:1; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}} />
    </div>
  );
}

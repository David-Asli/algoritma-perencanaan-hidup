"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, BoxSelect, UserPlus } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

  const validateName = (val) => {
    if (!val) {
      setNameError("Nama lengkap wajib diisi");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (val) => {
    if (!val) {
      setEmailError("Email wajib diisi");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Format email tidak valid");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (val) => {
    if (!val) {
      setPasswordError("Password wajib diisi");
      return false;
    } else if (val.length < 8) {
      setPasswordError("Password minimal 8 karakter");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validatePasswordConfirmation = (val) => {
    if (val !== password) {
      setPasswordConfirmationError("Konfirmasi password tidak cocok");
      return false;
    }
    setPasswordConfirmationError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPasswordConfirmationValid = validatePasswordConfirmation(passwordConfirmation);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isPasswordConfirmationValid) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else {
        setError(data.message || "Gagal melakukan registrasi.");
        setLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-wrap">
      {/* HERO (LEFT) */}
      <div className="flex-1 basis-[50%] max-w-[700px] bg-gradient-to-br from-[#0f2027] via-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center relative overflow-hidden p-16 hidden md:flex">
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle" style={{ top: "15%", left: "20%", animationDelay: "0s" }}></div>
          <div className="particle" style={{ top: "60%", left: "75%", animationDelay: "1s", width: "8px", height: "8px" }}></div>
          <div className="particle" style={{ top: "80%", left: "30%", animationDelay: "2s", width: "5px", height: "5px" }}></div>
        </div>

        <div className="relative z-10 text-white w-full flex flex-col justify-center animate-fade-in-up">
          <div className="w-16 lg:w-20 h-16 lg:h-20 rounded-[18px] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] inline-flex items-center justify-center text-3xl lg:text-4xl font-bold text-white shadow-[0_8px_30px_rgba(27,108,168,0.4)] mb-6">
            ﷲ
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 leading-[1.3] font-heading">Mari Bergabung</h1>
          <p className="text-base leading-[1.7] text-white/90 mb-8 max-w-[500px]">
            Mulailah perjalanan Anda dalam merencanakan hidup yang bermakna dan terarah bersama kami.
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
             <blockquote className="text-white text-base italic leading-relaxed">
               "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lain."
             </blockquote>
             <div className="mt-4 text-white/80 text-sm font-semibold">— HR. Ahmad</div>
          </div>
        </div>
      </div>

      {/* FORM (RIGHT) */}
      <div className="flex-1 basis-[50%] flex items-center justify-center p-12 bg-gray-50 dark:bg-[#0f1419] relative">
        <div className="w-full max-w-[460px]">
          <div className="bg-white dark:bg-[#1c2732] rounded-[20px] p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-black/[0.04] dark:border-white/5 animate-fade-in-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-dark)] dark:text-[#e1e8ed] mb-1 font-heading">Daftar Akun Baru</h2>
              <p className="text-[var(--color-gray-600)] dark:text-[#8b98a5] text-sm">Lengkapi data di bawah untuk melanjutkan</p>
              <div className="w-[60px] h-[4px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-[2px] mx-auto mt-3"></div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4 relative">
                <label className="block font-semibold text-sm text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-1.5">
                  <User className="w-4 h-4 inline mr-1" /> Nama Lengkap
                </label>
                <div className={`flex items-center bg-[var(--color-gray-100)] dark:bg-[#253341] border-2 rounded-xl transition-all overflow-hidden ${nameError ? 'border-red-500 bg-white dark:bg-[#1c2732]' : 'border-transparent focus-within:border-[var(--color-primary)] focus-within:bg-white dark:focus-within:bg-[#1c2732] focus-within:shadow-[0_0_0_4px_rgba(27,108,168,0.1)]'}`}>
                  <span className={`px-3.5 text-[1.1rem] transition-colors ${nameError ? 'text-red-500' : 'text-[var(--color-gray-500)] dark:text-[#6e7a85]'}`}><User className="w-5 h-5" /></span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (nameError) validateName(e.target.value); }}
                    onBlur={(e) => validateName(e.target.value)}
                    placeholder="Contoh: Fulan bin Fulan"
                    className="flex-1 border-none outline-none bg-transparent py-3 pr-2 text-sm text-[var(--color-gray-800)] dark:text-[#e1e8ed] placeholder-[var(--color-gray-500)] dark:placeholder-[#6e7a85]"
                    required
                  />
                </div>
                {nameError && <div className="text-red-500 text-[0.8rem] mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {nameError}</div>}
              </div>

              <div className="mb-4 relative">
                <label className="block font-semibold text-sm text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-1.5">
                  <Mail className="w-4 h-4 inline mr-1" /> Email
                </label>
                <div className={`flex items-center bg-[var(--color-gray-100)] dark:bg-[#253341] border-2 rounded-xl transition-all overflow-hidden ${emailError ? 'border-red-500 bg-white dark:bg-[#1c2732]' : 'border-transparent focus-within:border-[var(--color-primary)] focus-within:bg-white dark:focus-within:bg-[#1c2732] focus-within:shadow-[0_0_0_4px_rgba(27,108,168,0.1)]'}`}>
                  <span className={`px-3.5 text-[1.1rem] transition-colors ${emailError ? 'text-red-500' : 'text-[var(--color-gray-500)] dark:text-[#6e7a85]'}`}><Mail className="w-5 h-5" /></span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }}
                    onBlur={(e) => validateEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="flex-1 border-none outline-none bg-transparent py-3 pr-2 text-sm text-[var(--color-gray-800)] dark:text-[#e1e8ed] placeholder-[var(--color-gray-500)] dark:placeholder-[#6e7a85]"
                    required
                  />
                </div>
                {emailError && <div className="text-red-500 text-[0.8rem] mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {emailError}</div>}
              </div>

              <div className="mb-4 relative">
                <label className="block font-semibold text-sm text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-1.5">
                  <Lock className="w-4 h-4 inline mr-1" /> Password
                </label>
                <div className={`flex items-center bg-[var(--color-gray-100)] dark:bg-[#253341] border-2 rounded-xl transition-all overflow-hidden ${passwordError ? 'border-red-500 bg-white dark:bg-[#1c2732]' : 'border-transparent focus-within:border-[var(--color-primary)] focus-within:bg-white dark:focus-within:bg-[#1c2732] focus-within:shadow-[0_0_0_4px_rgba(27,108,168,0.1)]'}`}>
                  <span className={`px-3.5 text-[1.1rem] transition-colors ${passwordError ? 'text-red-500' : 'text-[var(--color-gray-500)] dark:text-[#6e7a85]'}`}><Lock className="w-5 h-5" /></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (passwordError) validatePassword(e.target.value); }}
                    onBlur={(e) => validatePassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="flex-1 border-none outline-none bg-transparent py-3 pr-2 text-sm text-[var(--color-gray-800)] dark:text-[#e1e8ed] placeholder-[var(--color-gray-500)] dark:placeholder-[#6e7a85]"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-3.5 text-[var(--color-gray-500)] dark:text-[#6e7a85] hover:text-[var(--color-primary)] transition-colors">
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
                {passwordError && <div className="text-red-500 text-[0.8rem] mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {passwordError}</div>}
              </div>

              <div className="mb-6 relative">
                <label className="block font-semibold text-sm text-[var(--color-gray-700)] dark:text-[#a0aab4] mb-1.5">
                  <Lock className="w-4 h-4 inline mr-1" /> Konfirmasi Password
                </label>
                <div className={`flex items-center bg-[var(--color-gray-100)] dark:bg-[#253341] border-2 rounded-xl transition-all overflow-hidden ${passwordConfirmationError ? 'border-red-500 bg-white dark:bg-[#1c2732]' : 'border-transparent focus-within:border-[var(--color-primary)] focus-within:bg-white dark:focus-within:bg-[#1c2732] focus-within:shadow-[0_0_0_4px_rgba(27,108,168,0.1)]'}`}>
                  <span className={`px-3.5 text-[1.1rem] transition-colors ${passwordConfirmationError ? 'text-red-500' : 'text-[var(--color-gray-500)] dark:text-[#6e7a85]'}`}><Lock className="w-5 h-5" /></span>
                  <input
                    type={showPasswordConfirmation ? "text" : "password"}
                    value={passwordConfirmation}
                    onChange={(e) => { setPasswordConfirmation(e.target.value); if (passwordConfirmationError) validatePasswordConfirmation(e.target.value); }}
                    onBlur={(e) => validatePasswordConfirmation(e.target.value)}
                    placeholder="Ulangi password"
                    className="flex-1 border-none outline-none bg-transparent py-3 pr-2 text-sm text-[var(--color-gray-800)] dark:text-[#e1e8ed] placeholder-[var(--color-gray-500)] dark:placeholder-[#6e7a85]"
                    required
                  />
                  <button type="button" onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} className="px-3.5 text-[var(--color-gray-500)] dark:text-[#6e7a85] hover:text-[var(--color-primary)] transition-colors">
                    {showPasswordConfirmation ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
                {passwordConfirmationError && <div className="text-red-500 text-[0.8rem] mt-1.5 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {passwordConfirmationError}</div>}
              </div>

              <button type="submit" disabled={loading} className="w-full p-3 lg:p-4 border-none rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white font-heading text-base font-semibold cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(27,108,168,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(27,108,168,0.4)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <><UserPlus className="w-5 h-5" /> Daftar Akun</>
                )}
              </button>
            </form>

            <div className="flex items-center gap-4 my-6 text-[var(--color-gray-500)] dark:text-[#6e7a85] text-[0.85rem] before:content-[''] before:flex-1 before:h-[1px] before:bg-[var(--color-gray-200)] dark:before:bg-white/10 after:content-[''] after:flex-1 after:h-[1px] after:bg-[var(--color-gray-200)] dark:after:bg-white/10">
              atau daftar dengan
            </div>

            <div className="flex gap-3 mb-6 flex-wrap">
              <button className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-[var(--color-gray-200)] dark:border-white/10 rounded-xl bg-white dark:bg-[#253341] text-sm font-medium text-[var(--color-gray-700)] dark:text-[#a0aab4] transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] dark:hover:bg-white/10 hover:text-[var(--color-primary)] dark:hover:text-white hover:-translate-y-0.5 min-w-[120px]">
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-[var(--color-gray-200)] dark:border-white/10 rounded-xl bg-white dark:bg-[#253341] text-sm font-medium text-[var(--color-gray-700)] dark:text-[#a0aab4] transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] dark:hover:bg-white/10 hover:text-[var(--color-primary)] dark:hover:text-white hover:-translate-y-0.5 min-w-[120px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> GitHub
              </button>
            </div>

            <div className="text-center mt-6 text-sm text-[var(--color-gray-600)] dark:text-[#8b98a5]">
              Sudah punya akun? <Link href="/login" className="text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-dark)] hover:underline transition-colors">Masuk Sekarang</Link>
            </div>
          </div>
          
          <div className="text-center p-6 text-xs text-[var(--color-gray-500)] dark:text-[#6e7a85] w-full mt-4">
            © {new Date().getFullYear()} Algoritma Perencanaan Hidup
          </div>
        </div>
      </div>
      
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
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}

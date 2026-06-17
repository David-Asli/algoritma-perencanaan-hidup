"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Moon, Sun, Menu, X, LayoutDashboard, LogIn, LogOut, Rocket, Home, Lightbulb, GitBranch, HeartHandshake, BookOpen, HelpCircle, BookMarked } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode from local storage or media query
    const saved = localStorage.getItem("dark-mode");
    if (saved === "true" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newVal = !isDarkMode;
    setIsDarkMode(newVal);
    localStorage.setItem("dark-mode", newVal.toString());
    if (newVal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Konsep", href: "/konsep", icon: <Lightbulb className="w-5 h-5" /> },
    { name: "Algoritma", href: "/algoritma", icon: <GitBranch className="w-5 h-5" /> },
    { name: "Ikhtiar & Tawakal", href: "/ikhtiar", icon: <HeartHandshake className="w-5 h-5" /> },
    { name: "Studi Kasus", href: "/studi-kasus", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Kuis", href: "/kuis", icon: <HelpCircle className="w-5 h-5" /> },
    { name: "Referensi", href: "/referensi", icon: <BookMarked className="w-5 h-5" /> },
  ];

  return (
    <>
      <nav className="navbar sticky top-0 left-0 right-0 z-[100] w-full px-4 lg:px-8 py-3 bg-white/90 dark:bg-[#0f1419]/90 backdrop-blur-md border-b border-black/[0.04] dark:border-white/10" style={{ top: '0px' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold text-lg shadow-md">
              ﷲ
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-sm font-bold text-[var(--color-dark)] dark:text-white">Algoritma</span>
              <span className="block text-xs text-[var(--color-gray-600)] dark:text-white/70 -mt-0.5">Perencanaan Hidup</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`nav-link dark:text-white/70 dark:hover:text-white ${pathname === link.href ? "active" : ""}`}>
                {link.name}
              </Link>
            ))}
            <Link href="/planner" className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg">
              <Rocket className="w-4 h-4" /> Life Planner
            </Link>

            {session ? (
              <div className="flex items-center gap-2">
                <Link href={session.user.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg !bg-none" style={{ backgroundColor: "var(--color-dark)" }}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={() => signOut({ callbackUrl: '/login' })} className="btn-outline !py-2.5 !px-3 !text-sm !rounded-lg" style={{ borderColor: "var(--color-gray-300)", color: "var(--color-gray-700)" }}>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg !bg-none" style={{ backgroundColor: "var(--color-dark)" }}>
                <LogIn className="w-4 h-4" /> Login
              </Link>
            )}

            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-[var(--color-gray-100)] dark:hover:bg-white/10 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-[var(--color-gray-600)]" />}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-1 lg:hidden">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-[var(--color-gray-100)] dark:hover:bg-white/10 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-[var(--color-gray-600)] dark:text-white/70" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-[var(--color-gray-100)] dark:hover:bg-white/10 transition-colors">
              <Menu className="w-6 h-6 text-[var(--color-gray-700)] dark:text-white/70" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-[55]" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-72 h-full bg-white dark:bg-[#0f1419] z-[60] shadow-2xl p-6 flex flex-col gap-2 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between mb-6">
          <span className="font-heading font-bold text-lg text-[var(--color-dark)] dark:text-white">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[var(--color-gray-100)] dark:hover:bg-white/10 dark:text-white/70">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === link.href ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] dark:bg-white/10 dark:text-white" : "text-[var(--color-gray-700)] hover:bg-[var(--color-primary-light)] dark:text-white/70 dark:hover:bg-white/5"}`}>
            {link.icon} {link.name}
          </Link>
        ))}

        <div className="mt-auto flex flex-col gap-2">
          <Link href="/planner" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full justify-center !text-sm">
            <Rocket className="w-4 h-4" /> Life Planner
          </Link>
          {session ? (
            <>
              <Link href={session.user.role === "admin" ? "/admin/dashboard" : "/dashboard"} onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full justify-center !text-sm !bg-none" style={{ backgroundColor: "var(--color-dark)" }}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button onClick={() => { setIsMobileMenuOpen(false); signOut({ callbackUrl: '/login' }); }} className="btn-outline w-full justify-center !text-sm !border-red-500 !text-red-500 hover:!bg-red-50">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full justify-center !text-sm !bg-none" style={{ backgroundColor: "var(--color-dark)" }}>
              <LogIn className="w-4 h-4" /> Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

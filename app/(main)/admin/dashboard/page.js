import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, Settings, Database, Activity } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1419] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-[var(--color-dark)] to-[#2d3748] rounded-2xl p-8 shadow-lg border border-white/10 text-white flex justify-between items-center flex-wrap gap-4">
          <div>
            <h4 className="text-2xl font-bold mb-2 font-heading">
              Dashboard Administrator
            </h4>
            <p className="text-gray-300">
              Selamat datang, {user.name}. Anda memiliki akses penuh ke sistem.
            </p>
          </div>
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-5 py-2 rounded-xl text-sm font-bold uppercase tracking-widest">
            {user.role}
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white dark:bg-[#1c2732] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-[var(--color-primary)]/50 group">
            <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h5 className="font-heading font-bold text-gray-800 dark:text-white mb-1">Manajemen User</h5>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Kelola akun pengguna</p>
          </div>

          <div className="bg-white dark:bg-[#1c2732] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-purple-500/50 group">
            <div className="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-7 h-7" />
            </div>
            <h5 className="font-heading font-bold text-gray-800 dark:text-white mb-1">Data Master</h5>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Kelola data referensi</p>
          </div>

          <div className="bg-white dark:bg-[#1c2732] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-green-500/50 group">
            <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-7 h-7" />
            </div>
            <h5 className="font-heading font-bold text-gray-800 dark:text-white mb-1">Log Sistem</h5>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Pantau aktivitas sistem</p>
          </div>
          
          <div className="bg-white dark:bg-[#1c2732] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col items-center text-center transition-all hover:shadow-md hover:border-orange-500/50 group">
            <div className="w-14 h-14 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Settings className="w-7 h-7" />
            </div>
            <h5 className="font-heading font-bold text-gray-800 dark:text-white mb-1">Pengaturan</h5>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Konfigurasi aplikasi</p>
          </div>

        </div>
        
        {/* Recent Activity Placeholder */}
        <div className="bg-white dark:bg-[#1c2732] rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white font-heading">Aktivitas Terkini</h3>
            <button className="text-sm text-[var(--color-primary)] hover:underline">Lihat Semua</button>
          </div>
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">Belum ada aktivitas yang tercatat</p>
          </div>
        </div>

      </div>
    </div>
  );
}

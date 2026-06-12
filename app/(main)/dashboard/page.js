import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserCircle, ShieldCheck, Bell } from "lucide-react";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1419] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Welcome Card */}
        <div className="bg-white dark:bg-[#1c2732] rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/5 transition-transform hover:-translate-y-1 duration-300">
          <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 font-heading">
            Selamat Datang, {user.name}!
          </h4>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Ini adalah halaman dashboard untuk role User.
          </p>
          <hr className="border-gray-200 dark:border-white/10 mb-6" />
          <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            Role Anda saat ini: 
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider">
              {user.role}
            </span>
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-md transition-transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
            <UserCircle className="w-16 h-16 mb-4 opacity-90" />
            <h5 className="font-heading font-bold text-lg mb-1">Profil Saya</h5>
            <p className="text-blue-100 text-sm">Kelola informasi profil Anda</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-md transition-transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
            <ShieldCheck className="w-16 h-16 mb-4 opacity-90" />
            <h5 className="font-heading font-bold text-lg mb-1">Keamanan</h5>
            <p className="text-green-100 text-sm">Atur password dan privasi</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 text-white shadow-md transition-transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
            <Bell className="w-16 h-16 mb-4 opacity-90" />
            <h5 className="font-heading font-bold text-lg mb-1">Notifikasi</h5>
            <p className="text-cyan-100 text-sm">Lihat pemberitahuan terbaru</p>
          </div>

        </div>

      </div>
    </div>
  );
}

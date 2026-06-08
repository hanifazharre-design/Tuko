import { useState } from "react";
import { User, Mail, Lock, Save, Camera, Shield, Bell, Key } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const [loading, setLoading] = useState(false);

  const displayUser = user?.toLowerCase() === "muchammadmachayanut@gmail.com" ? "Machayanut" : (user?.split('@')[0] || "User");
  const displayRole = role === "admin" ? "Administrator" : "Pengguna Biasa";
  const userInitials = displayUser.charAt(0).toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Profil berhasil diperbarui!");
    }, 1500);
  };

  return (
    <div className="px-4 py-8 md:px-10 max-w-6xl mx-auto animate-in fade-in duration-500">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pengaturan Profil</h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">Kelola informasi publik dan keamanan akun Anda.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
        
        {/* BANNER SECTION */}
        <div className="h-40 md:h-52 w-full bg-gradient-to-r from-[#6A112A] via-[#8a1435] to-[#3a0815] relative overflow-hidden">
          {/* Decorative Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs font-bold border border-white/20">
            <Shield size={14} />
            Akses: {displayRole}
          </div>
        </div>

        <div className="flex flex-col md:flex-row px-6 md:px-10 pb-10">
          
          {/* AVATAR & QUICK INFO */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start -mt-16 md:-mt-20 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr from-[#ff3366] to-[#ff7b9a] rounded-full flex items-center justify-center font-extrabold text-5xl md:text-6xl text-white shadow-xl border-4 md:border-8 border-white transition-transform duration-300 group-hover:scale-105">
                {userInitials}
              </div>
              <button 
                type="button"
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 p-3 bg-white text-[#6A112A] rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.15)] border border-gray-50 hover:bg-gray-50 transition-all hover:scale-110 active:scale-95"
                title="Ganti Foto Profil"
              >
                <Camera size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="text-center md:text-left mt-5 w-full">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">{displayUser}</h2>
              <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-widest">{user || "User@Email.com"}</p>
              
              <div className="mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">Status Akun</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-extrabold rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">Terdaftar Sejak</span>
                  <span className="text-xs font-bold text-gray-900">12 Agt 2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* EDIT FORM */}
          <div className="w-full md:w-2/3 mt-10 md:mt-8 md:pl-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* SECTION: BASIC INFO */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#6A112A] flex items-center justify-center">
                    <User size={18} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Informasi Dasar</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nama Lengkap</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue={displayUser}
                        placeholder="Masukkan nama lengkap"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#6A112A]/10 focus:border-[#6A112A] focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 group">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Alamat Email</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        defaultValue={user || ""}
                        placeholder="Masukkan email aktif"
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#6A112A]/10 focus:border-[#6A112A] focus:bg-white transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* SECTION: SECURITY */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#6A112A] flex items-center justify-center">
                    <Key size={18} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Keamanan</h3>
                </div>
                
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Kata Sandi Lama</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="Masukkan kata sandi lama untuk otorisasi"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#6A112A]/10 focus:border-[#6A112A] focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-red-50/30 p-5 rounded-2xl border border-red-50">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#6A112A] uppercase tracking-wider">Kata Sandi Baru</label>
                    <input 
                      type="password" 
                      placeholder="Buat kata sandi baru"
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#6A112A]/10 focus:border-[#6A112A] transition-all shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#6A112A] uppercase tracking-wider">Konfirmasi Sandi Baru</label>
                    <input 
                      type="password" 
                      placeholder="Ulangi kata sandi baru"
                      className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#6A112A]/10 focus:border-[#6A112A] transition-all shadow-sm"
                    />
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-400 mt-3 flex items-center gap-1.5">
                  <Shield size={12} />
                  Biarkan kosong jika Anda tidak ingin mengubah kata sandi.
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3 border-t border-gray-100 mt-8">
                <button
                  type="button"
                  className="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-[#6A112A] hover:bg-[#851635] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(106,17,42,0.39)] hover:shadow-[0_6px_20px_rgba(106,17,42,0.23)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={18} strokeWidth={2.5} />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

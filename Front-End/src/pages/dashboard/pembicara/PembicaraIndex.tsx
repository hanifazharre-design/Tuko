import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search, Filter, Users } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";

// ===== SERVICE =====
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = `${API_URL}/speakers`;

type Pembicara = {
  id: number;
  name: string;
  role: string;
  email: string;
  photo?: string;
  bio: string;
  status: string;
};

const deletePembicara = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Gagal menghapus pembicara");
  return res.json();
};

const TABLE_HEADERS = ["ID", "Pembicara", "Pekerjaan", "Status", "Aksi"];

// ===== AVATAR =====
function Avatar({ name, size = "md" }: { name: string, size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dimensions = size === "sm" ? "w-8 h-8 text-[10px]" : "w-10 h-10 text-xs";

  return (
    <div className={`${dimensions} rounded-xl bg-gradient-to-br from-[#6A112A] to-[#a81c44] text-white font-extrabold flex items-center justify-center shadow-sm`}>
      {initials}
    </div>
  );
}

// ===== COMPONENT =====
export default function PembicaraIndex() {
  const role = useAuthStore((state) => state.role);
  const isAdmin = role === "admin";
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(BASE_URL, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Gagal mengambil data speakers");
      
      const result = await res.json();
      setPembicara(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      console.warn("Menggunakan data dummy karena backend offline.");
      setPembicara([
        { id: 1, name: "Sandhika Galih", role: "Web Developer", email: "sandhika@wpu.com", bio: "Dosen & YouTuber", status: "active" },
        { id: 2, name: "Gita Wirjawan", role: "Entrepreneur", email: "gita@wirjawan.com", bio: "Endgame Podcast", status: "active" },
        { id: 3, name: "Eko Kurniawan", role: "Tech Lead", email: "eko@khannedy.com", bio: "Programmer Zaman Now", status: "inactive" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pembicara ini?")) return;
    try {
      await deletePembicara(id);
      setPembicara((prev) => prev.filter((p) => p.id !== id));
      alert("Pembicara berhasil dihapus!");
    } catch {
      alert("Gagal menghapus pembicara (atau sedang dalam mode demo).");
    }
  };

  return (
    <div className="px-8 py-10 max-w-6xl mx-auto animate-in fade-in duration-500">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#6A112A] to-[#ff3366]" />
            <span className="text-xs font-bold text-[#6A112A] tracking-widest uppercase">
              Manajemen Data
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Daftar Pembicara</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Kelola narasumber dan bintang tamu untuk event Invofest</p>
        </div>

        {isAdmin && (
          <Link
            to="/dashboard/pembicara/create"
            className="flex items-center gap-2 bg-[#6A112A] hover:bg-[#851635] text-white text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(106,17,42,0.39)] hover:shadow-[0_6px_20px_rgba(106,17,42,0.23)] hover:-translate-y-0.5"
          >
            <Plus size={18} strokeWidth={3} />
            Tambah Pembicara
          </Link>
        )}
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari pembicara..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6A112A]/20 focus:border-[#6A112A] transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {TABLE_HEADERS.map((h, i) => (
                  <th
                    key={h}
                    className={`text-xs font-bold uppercase tracking-wider text-gray-500 px-6 py-4 text-left whitespace-nowrap ${i === 0 ? 'w-20' : ''} ${i === TABLE_HEADERS.length - 1 ? 'text-right' : ''}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-8 h-8 border-4 border-[#6A112A]/20 border-t-[#6A112A] rounded-full animate-spin"></div>
                      <p className="text-sm text-gray-500 font-medium">Memuat data pembicara...</p>
                    </div>
                  </td>
                </tr>
              )}

              {!loading && pembicara.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-20">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Users size={40} className="text-gray-300" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Belum ada pembicara</h3>
                      <p className="text-sm text-gray-500 max-w-xs mx-auto">Klik tombol 'Tambah Pembicara' di atas untuk mendaftarkan narasumber.</p>
                    </div>
                  </td>
                </tr>
              )}

              {!loading && pembicara.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-rose-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md group-hover:bg-white group-hover:text-[#6A112A] transition-colors">
                      #{item.id}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={item.name} size="md" />
                      <div>
                        <span className="text-sm font-bold text-gray-900 block">{item.name}</span>
                        <span className="text-xs font-medium text-gray-500">{item.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-[#6A112A] bg-[#6A112A]/10 px-2.5 py-1 rounded-lg">
                      {item.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                        item.status === "active"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }`}
                    >
                      {item.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {isAdmin ? (
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/dashboard/pembicara/edit/${item.id}`}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors tooltip"
                          title="Edit Pembicara"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors tooltip"
                          title="Hapus Pembicara"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end text-gray-400 text-xs font-medium italic">
                        No Access
                      </div>
                    )}
                    {/* Fallback for touch devices */}
                    {isAdmin && (
                      <div className="flex items-center justify-end gap-2 lg:hidden">
                        <Link to={`/dashboard/pembicara/edit/${item.id}`} className="p-2 rounded-lg text-blue-600 bg-blue-50">
                          <Edit2 size={16} />
                        </Link>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-red-500 bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500">
            Menampilkan <strong className="text-gray-900">{pembicara.length}</strong> pembicara
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 text-xs font-semibold text-gray-400 cursor-not-allowed">Prev</button>
            <button className="w-7 h-7 rounded bg-white border border-gray-200 text-xs font-bold text-[#6A112A] shadow-sm">1</button>
            <button className="px-3 py-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
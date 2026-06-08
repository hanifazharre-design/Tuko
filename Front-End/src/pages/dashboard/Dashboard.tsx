import { useEffect, useState } from "react";
import { Users, CalendarDays, Mic2, Activity, ArrowUpRight, Clock } from "lucide-react";

// ===== ENDPOINTS =====
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const EVENTS_URL = `${API_URL}/events`;
const CATEGORIES_URL = `${API_URL}/categories`;
const PEMBICARA_URL = `${API_URL}/speakers`;

// ===== TYPES =====
type Stat = {
  title: string;
  value: number | string;
  icon: JSX.Element;
  trend?: string;
  color: string;
};

type EventItem = {
  id: number;
  title: string;
  name?: string;
  dateEvent: string;
  category?: { name: string };
};

type SpeakerItem = {
  id: number;
  name: string;
  role: string;
};

// ===== COMPONENTS =====
function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className={`bg-white rounded-2xl p-6 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group`}>
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${stat.color}`}></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-xl text-white shadow-md ${stat.color}`}>
          {stat.icon}
        </div>
        {stat.trend && (
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">
            <ArrowUpRight size={14} />
            {stat.trend}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
        <h3 className="text-3xl font-extrabold text-gray-900">{stat.value}</h3>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon }: { title: string, icon: JSX.Element }) {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#6A112A]/10 text-[#6A112A] rounded-lg">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      </div>
      <button className="text-sm font-semibold text-[#6A112A] hover:text-[#ff3366] transition-colors">
        View All
      </button>
    </div>
  );
}

// ===== MAIN DASHBOARD =====
export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([
    { title: "Kategori Event", value: "-", icon: <CalendarDays size={24} />, color: "bg-gradient-to-br from-blue-500 to-blue-700" },
    { title: "Total Event", value: "-", icon: <Activity size={24} />, color: "bg-gradient-to-br from-purple-500 to-purple-700" },
    { title: "Pembicara", value: "-", icon: <Mic2 size={24} />, color: "bg-gradient-to-br from-orange-500 to-orange-700" },
    { title: "Total Data Modul", value: "-", icon: <Users size={24} />, trend: "+12%", color: "bg-gradient-to-br from-[#6A112A] to-[#ff3366]" },
  ]);

  const [latestEvents, setLatestEvents] = useState<EventItem[]>([]);
  const [latestSpeakers, setLatestSpeakers] = useState<SpeakerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Timeout 3 detik agar tidak stuck loading jika DB mati
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const fetchOptions = { signal: controller.signal };

        let eventsData: EventItem[] = [];
        let categoriesData: any[] = [];
        let speakersData: SpeakerItem[] = [];

        try {
          const [resEvents, resCategories, resSpeakers] = await Promise.all([
            fetch(EVENTS_URL, fetchOptions).catch(() => ({ json: () => [] })),
            fetch(CATEGORIES_URL, fetchOptions).catch(() => ({ json: () => [] })),
            fetch(PEMBICARA_URL, fetchOptions).catch(() => ({ json: () => [] })),
          ]);

          const eventsRaw = await (resEvents as any).json();
          const categoriesRaw = await (resCategories as any).json();
          const speakersRaw = await (resSpeakers as any).json();

          eventsData = Array.isArray(eventsRaw) ? eventsRaw : eventsRaw.data || [];
          categoriesData = Array.isArray(categoriesRaw) ? categoriesRaw : categoriesRaw.data || [];
          speakersData = Array.isArray(speakersRaw) ? speakersRaw : speakersRaw.data || [];
        } catch (e) {
          console.warn("Backend timeout atau error, menggunakan data fallback sementara.");
        } finally {
          clearTimeout(timeoutId);
        }

        // Fallback data jika backend gagal mengembalikan array
        if (eventsData.length === 0) {
          eventsData = [
            { id: 1, title: "Web Development Masterclass", dateEvent: new Date().toISOString(), category: { name: "Workshop" } },
            { id: 2, title: "AI in Modern Business", dateEvent: new Date(Date.now() + 86400000).toISOString(), category: { name: "Seminar" } },
          ];
          categoriesData = [{}, {}, {}];
          speakersData = [
            { id: 1, name: "Sandhika Galih", role: "Web Developer" },
            { id: 2, name: "Giri Kuncoro", role: "DevOps Engineer" },
          ];
        }

        setStats([
          { title: "Kategori Event", value: categoriesData.length, icon: <CalendarDays size={24} />, color: "bg-gradient-to-br from-blue-500 to-blue-700" },
          { title: "Total Event", value: eventsData.length, icon: <Activity size={24} />, color: "bg-gradient-to-br from-purple-500 to-purple-700" },
          { title: "Pembicara", value: speakersData.length, icon: <Mic2 size={24} />, color: "bg-gradient-to-br from-orange-500 to-orange-700" },
          { title: "Total Data Modul", value: categoriesData.length + eventsData.length + speakersData.length, icon: <Users size={24} />, trend: "Aktif", color: "bg-gradient-to-br from-[#6A112A] to-[#ff3366]" },
        ]);

        setLatestEvents(eventsData.slice(0, 4));
        setLatestSpeakers(speakersData.slice(0, 4));

      } catch (error) {
        console.error("Gagal memuat statistik dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
        <div className="w-12 h-12 border-4 border-[#6A112A]/20 border-t-[#6A112A] rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Memuat ringkasan dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 rounded-full bg-gradient-to-r from-[#6A112A] to-[#ff3366]" />
            <span className="text-xs font-bold text-[#6A112A] uppercase tracking-widest">
              Overview
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard Utama</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">Pantau ringkasan data Invofest secara real-time</p>
        </div>
        
        <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <Clock className="text-[#6A112A]" size={20} />
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Waktu Sistem</p>
            <p className="text-sm font-bold text-gray-800">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* STATS COUNTER BOX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}>
            <StatCard stat={stat} />
          </div>
        ))}
      </div>

      {/* BOTTOM CONTENT LIST */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* LATEST EVENTS COLUMN */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
          <SectionHeader title="Event Terbaru" icon={<CalendarDays size={20} />} />
          
          <div className="space-y-4">
            {latestEvents.map((item, i) => (
              <div key={item.id} className="group flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:border-[#6A112A]/20 hover:bg-[#6A112A]/[0.02] transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-[#6A112A] border border-gray-100 group-hover:bg-white group-hover:shadow-sm transition-colors">
                    <span className="text-xs font-bold leading-none">{new Date(item.dateEvent).getDate()}</span>
                    <span className="text-[10px] font-semibold uppercase">{new Date(item.dateEvent).toLocaleString('id-ID', { month: 'short' })}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-[#6A112A] transition-colors">{item.title || item.name}</h4>
                    <span className="text-xs font-semibold text-[#6A112A] bg-[#6A112A]/10 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {item.category?.name || "Umum"}
                    </span>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#6A112A] group-hover:text-white transition-all">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* LATEST SPEAKERS COLUMN */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
          <SectionHeader title="Pembicara Terbaru" icon={<Mic2 size={20} />} />
          
          <div className="space-y-4">
            {latestSpeakers.map((item, i) => {
              const initials = item.name.split(" ").map(n => n[0]).slice(0, 2).join("");
              const colors = [
                "from-blue-500 to-blue-600",
                "from-purple-500 to-purple-600",
                "from-emerald-500 to-emerald-600",
                "from-orange-500 to-orange-600"
              ];
              const color = colors[i % colors.length];

              return (
                <div key={item.id} className="group flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} text-white flex items-center justify-center font-bold shadow-sm`}>
                      {initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">{item.role}</p>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-gray-400 hover:text-gray-900 transition-colors">
                    Detail
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
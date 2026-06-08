import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LayoutDashboard, Calendar, Users, Mic2, LogOut, ChevronRight, Menu, X, UserCog, Ticket } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Helper variables for UI
  const displayUser = user?.toLowerCase() === "muchammadmachayanut@gmail.com" ? "Machayanut" : (user?.split('@')[0] || "User");
  const displayRole = role === "admin" ? "Admin" : "User Biasa";
  const userInitials = displayUser.charAt(0).toUpperCase();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    ...(role === "user" ? [{ name: "Beli Tiket", path: "/dashboard/tiket", icon: <Ticket size={20} /> }] : []),
    { name: "Kategori Event", path: "/dashboard/kategori", icon: <Calendar size={20} /> },
    { name: "Event", path: "/dashboard/event", icon: <LayoutDashboard size={20} /> },
    { name: "Pembicara", path: "/dashboard/pembicara", icon: <Mic2 size={20} /> },
    { name: "Edit Profil", path: "/dashboard/profile", icon: <UserCog size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">

      {/* MOBILE HEADER (Visible only on small screens) */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-[#6A112A] text-white flex items-center justify-between px-4 z-40 shadow-md">
        <img
          src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
          alt="Invofest Logo"
          className="h-8 object-contain bg-white px-2 py-1 rounded"
        />
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={`fixed lg:static top-0 left-0 h-full w-[280px] bg-gradient-to-b from-[#6A112A] to-[#3a0815] text-white flex flex-col shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        
        {/* Decorative Top Blur */}
        <div className="absolute top-0 left-0 w-full h-32 bg-white/5 blur-2xl pointer-events-none"></div>

        <div className="bg-white h-24 flex justify-center items-center px-4 w-full relative z-10 hidden lg:flex">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
            alt="Invofest Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Mobile Header Inside Sidebar */}
        <div className="h-16 flex items-center justify-between px-4 lg:hidden border-b border-white/10">
          <span className="font-bold text-lg tracking-wide">Menu Invofest</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4 mt-2 flex-1 relative z-10 overflow-y-auto">
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 px-4">Main Menu</span>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/dashboard"}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on mobile when link clicked
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="group-hover:scale-110 transition-transform duration-200">{link.icon}</span>
                {link.name}
              </div>
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3 mb-3 relative group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#ff3366] to-[#ff7b9a] rounded-full flex items-center justify-center font-bold shadow-lg">
                {userInitials}
              </div>
              <div>
                <p className="text-sm font-bold truncate max-w-[100px]">{displayUser}</p>
                <p className="text-xs text-white/60">{displayRole}</p>
              </div>
            </div>
            <Link 
              to="/dashboard/profile" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100"
              title="Edit Profil"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-cog"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><circle cx="19" cy="11" r="2"/><path d="M19 8v1"/><path d="M19 13v1"/><path d="M21.6 9.5l-.87.5"/><path d="M17.27 12l-.87.5"/><path d="M21.6 12.5l-.87-.5"/><path d="M17.27 10l-.87-.5"/></svg>
            </Link>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white/10 px-4 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold border border-transparent hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden pt-16 lg:pt-0">
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#6A112A]/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 min-h-full">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
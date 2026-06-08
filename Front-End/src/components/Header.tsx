import { Home, Info, Users, HelpCircle } from "lucide-react";
import { NavLink } from "./ui/NavLink";
import { useLocation, Link } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const menuItems = [
    { label: "Beranda", href: "/", icon: <Home size={18} /> },
    { label: "Competition", href: "/competition", icon: <Info size={18} /> },
    { label: "Seminar", href: "/seminar", icon: <Users size={18} /> },
    { label: "Workshop", href: "/workshop", icon: <HelpCircle size={18} /> },
    { label: "Talkshow", href: "/talkshow", icon: <HelpCircle size={18} /> },
  ];

  return (
    <header className="bg-white shadow-sm px-12 py-2 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        
        {/* Logo */}
        <div className="logo">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png"
            alt="logo"
            className="h-16"
          />
        </div>

        {/* Menu */}
        <div className="flex items-center gap-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
              isActive={location.pathname === item.href}
            />
          ))}
        </div>

        {/* LOGIN BUTTON */}
        <Link
          to="/login"
          className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
        >
          Login
        </Link>

      </div>
    </header>
  );
}
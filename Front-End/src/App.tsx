import { Routes, Route } from "react-router-dom";

// LAYOUT
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayouts from "./layouts/AuthLayout";

// PAGES
import Beranda from "./pages/Beranda";
import Competition from "./pages/Competition";
import Seminar from "./pages/Seminar";
import Workshop from "./pages/Workshop";
import Talkshow from "./pages/Talkshow";
import Login from "./pages/Login";
import Register from "./pages/Register";

// DASHBOARD PAGES
import Dashboard from "./pages/dashboard/Dashboard";
import CategoryIndex from "./pages/dashboard/kategori/CategoryIndex";
import CategoryCreate from "./pages/dashboard/kategori/CategoryCreate";
import CategoryEdit from "./pages/dashboard/kategori/CategoryEdit";
import PembicaraIndex from "./pages/dashboard/pembicara/PembicaraIndex";
import PembicaraCreate from "./pages/dashboard/pembicara/PembicaraCreate";
import PembicaraEdit from "./pages/dashboard/pembicara/PembicaraEdit";
import EventIndex from "./pages/dashboard/event/EventIndex";
import EventCreate from "./pages/dashboard/event/EventCreate";
import EventEdit from "./pages/dashboard/event/EventEdit";
// import Biodata from "./pages/dashboard/kategori/Biodata"; // ✅ Import Biodata kamu
import Profile from "./pages/dashboard/profile/Profile";
import TiketIndex from "./pages/dashboard/tiket/TiketIndex";

// ROUTE PROTECT
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* 🌐 HALAMAN UTAMA (PAKAI HEADER) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Beranda />} />
        <Route path="/competition" element={<Competition />} />
        <Route path="/seminar" element={<Seminar />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/talkshow" element={<Talkshow />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 🔐 PROTECTED ROUTE */}
      <Route element={<ProtectedRoute />}>
        
        {/* 📊 DASHBOARD (TANPA HEADER ATAS) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          
          {/* 🧑‍💻 RUTE PROFIL */}
          <Route path="profile" element={<Profile />} />

          {/* 🎟️ RUTE TIKET (USER) */}
          <Route path="tiket" element={<TiketIndex />} />

          {/* 🗂️ RUTE KATEGORI */}
          <Route path="kategori" element={<CategoryIndex />} />
          <Route path="kategori/create" element={<CategoryCreate />} />
          <Route path="kategori/edit/:id" element={<CategoryEdit />} />

          {/* 👥 RUTE PEMBICARA */}
          <Route path="pembicara" element={<PembicaraIndex />} />
          <Route path="pembicara/create" element={<PembicaraCreate />} />
          <Route path="pembicara/edit/:id" element={<PembicaraEdit />} />

          {/* 📅 RUTE EVENT */}
          <Route path="event" element={<EventIndex />} />
          <Route path="event/create" element={<EventCreate />} />
          <Route path="event/edit/:id" element={<EventEdit />} />
        </Route>

      </Route>

    </Routes>
  );
}

export default App;
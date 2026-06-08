import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main className="py-24 container mx-auto">
        <Outlet />
      </main>

      <footer>
        <div>&copy; 2026 Universitas Harkat Negeri</div>
      </footer>
    </>
  );
}
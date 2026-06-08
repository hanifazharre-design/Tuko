import { Outlet } from "react-router-dom";

export default function AuthLayouts() {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Pane - Image and Branding */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-[#6A112A] to-[#3a0815] text-white p-12 justify-between relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-5 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ff3366] opacity-10 rounded-full blur-3xl mix-blend-overlay"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <img
              src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
              alt="Invofest Logo"
              className="h-10 object-contain drop-shadow-md"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-6 mt-10">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
            Informatics <br /> Vocational Festival
          </h1>
          <p className="text-lg text-white/80 max-w-md font-medium">
            Join the most exciting technology festival of the year. Connect, learn, and grow with top experts.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-white/60">
          <p>&copy; 2026 Universitas Harkat Negeri</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Pane - Form Outlet */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#f8fafc] relative">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
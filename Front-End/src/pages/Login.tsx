import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import InputText from "../components/ui/Input";
import InputPassword from "../components/ui/InputPassword";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  password: z.string().min(3, "Minimal 3 Karakter"),
});

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const email = data.username.toLowerCase();
    
    // Admin Credential
    if (email === "muchammadmachayanut@gmail.com" && data.password === "24090022") {
      login(data.username, "admin");
      navigate("/dashboard");
    } 
    // User Credential
    else if (email === "user1@gmail.com" && data.password === "456") {
      login(data.username, "user");
      navigate("/dashboard");
    } 
    // Failed Login
    else {
      alert("Login Gagal: Username atau Password salah");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[60vh] px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.1)] overflow-hidden w-full max-w-5xl border border-gray-100">
        
        {/* Left Side: Logo/Branding */}
        <div className="hidden md:flex flex-col w-1/2 bg-gradient-to-br from-[#6A112A] to-[#3a0815] text-white p-12 justify-center items-center relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-white opacity-5 rounded-full blur-3xl mix-blend-overlay"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-[#ff3366] opacity-10 rounded-full blur-3xl mix-blend-overlay"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-2xl shadow-xl mb-8 transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
                alt="Invofest Logo"
                className="w-64 object-contain drop-shadow-sm"
              />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-4 drop-shadow-md">
              Informatics Vocational Festival
            </h2>
            <p className="text-white/80 font-medium max-w-sm leading-relaxed">
              Connect, learn, and grow with top experts in the most exciting technology festival of the year.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
          {/* Decorative accent for mobile */}
          <div className="md:hidden absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6A112A] to-[#ff3366]"></div>

          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-gray-500 text-sm">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <InputText
              label="Username"
              name="username"
              register={register}
              error={errors.username?.message}
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-transparent select-none hidden">Forgot?</span>
                <a href="#" className="text-sm text-[#6A112A] hover:text-[#ff3366] font-medium transition-colors">Forgot password?</a>
              </div>
              <InputPassword
                label="Password"
                name="password"
                register={register}
                error={errors.password?.message}
              />
            </div>

            <div className="mt-2">
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-[#6A112A] hover:bg-[#851635] text-white py-4 px-4 rounded-xl font-bold transition-all shadow-[0_4px_14px_0_rgba(106,17,42,0.39)] hover:shadow-[0_6px_20px_rgba(106,17,42,0.23)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-[#6A112A] font-bold hover:text-[#ff3366] transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
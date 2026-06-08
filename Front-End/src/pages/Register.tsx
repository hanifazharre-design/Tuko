import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import InputText from "../components/ui/Input";
import InputPassword from "../components/ui/InputPassword";
import { Link, useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const schema = z.object({
  name: z.string().min(1, "Name harus diisi"),
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
  password: z.string().min(8, "Minimal 8 Karakter"),
  password_confirm: z.string().min(8, "Minimal 8 Karakter"),
}).refine((data) => data.password === data.password_confirm, {
  message: "Password tidak cocok",
  path: ["password_confirm"],
});

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Register Berhasil (Simulasi)");
    navigate("/login");
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
              Join us to experience the best technology event and connect with thousands of enthusiasts.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative">
          {/* Decorative accent for mobile */}
          <div className="md:hidden absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6A112A] to-[#ff3366]"></div>

          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">Join us and experience the best festival.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <InputText
              label="Name"
              name="name"
              register={register}
              error={errors.name?.message}
            />

            <InputText
              label="Email"
              name="email"
              register={register}
              error={errors.email?.message}
            />

            <InputPassword
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />

            <InputPassword
              label="Confirm Password"
              name="password_confirm"
              register={register}
              error={errors.password_confirm?.message}
            />

            <div className="mt-4">
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-[#6A112A] hover:bg-[#851635] text-white py-4 px-4 rounded-xl font-bold transition-all shadow-[0_4px_14px_0_rgba(106,17,42,0.39)] hover:shadow-[0_6px_20px_rgba(106,17,42,0.23)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-[#6A112A] font-bold hover:text-[#ff3366] transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
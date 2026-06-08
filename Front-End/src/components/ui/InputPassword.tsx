import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputPasswordProps {
  label: string;
  name: string;
  register: any;
  error?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({
  label,
  name,
  register,
  error,
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={label} className="text-sm font-semibold text-gray-700">{label}</label>

      <div className="relative group">
        <input
          type={show ? "text" : "password"}
          {...register(name)}
          placeholder="••••••••"
          className={`border w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff3366]/50 focus:border-[#ff3366] ${
            error ? "bg-red-50 border-red-300 text-red-900 placeholder-red-300" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 hover:bg-gray-100/50"
          }`}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {error && <p className="text-xs font-medium text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default InputPassword;
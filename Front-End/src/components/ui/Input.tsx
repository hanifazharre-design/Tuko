interface InputProps {
  label: string;
  name: string;
  register: any;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, register, error }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={label} className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type="text"
        {...register(name)}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`border w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff3366]/50 focus:border-[#ff3366] ${
          error ? "bg-red-50 border-red-300 text-red-900 placeholder-red-300" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 hover:bg-gray-100/50"
        }`}
      />

      {error && <p className="text-xs font-medium text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default Input;
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// ===== PERBAIKAN 1: Gunakan domain "-six" dan rute yang aktif di Vercel yaitu "/speakers"
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = `${API_URL}/speakers`;

type PembicaraPayload = {
  name: string;
  role: string;
  email: string;
  photo?: string;
  bio: string;
  status: string;
};

const createPembicara = async (data: PembicaraPayload) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal menyimpan pembicara");
  return res.json();
};

const schema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  role: z.string().min(3, "Role minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  photo: z.string().optional(),
  bio: z.string().min(5, "Bio minimal 5 karakter"),
  status: z.string().min(1, "Status wajib dipilih"),
});

type FormData = z.infer<typeof schema>;

export default function PembicaraCreate() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Mapping data agar properti image terkirim dengan benar ke backend
      await createPembicara({
        name: data.name,
        role: data.role,
        email: data.email,
        photo: data.photo || "", 
        bio: data.bio,
        status: data.status,
      });

      alert("Pembicara berhasil ditambahkan!");
      reset();
      navigate("/dashboard/pembicara"); // Otomatis kembali ke halaman tabel setelah sukses
    } catch (error) {
      alert("Gagal menyimpan pembicara. Cek koneksi ke server.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold mb-4 text-[#7B1D3F]">Tambah Pembicara</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input {...register("name")} placeholder="Nama" className="w-full border p-3 rounded-lg text-sm" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input {...register("role")} placeholder="Role / Pekerjaan (Contoh: Web Developer)" className="w-full border p-3 rounded-lg text-sm" />
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <input {...register("email")} placeholder="Email" className="w-full border p-3 rounded-lg text-sm" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input {...register("photo")} placeholder="URL Foto (opsional)" className="w-full border p-3 rounded-lg text-sm" />
        </div>

        <div>
          <textarea {...register("bio")} placeholder="Bio singkat pembicara" className="w-full border p-3 rounded-lg text-sm h-24" />
          {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
        </div>

        <div>
          <select {...register("status")} className="w-full border p-3 rounded-lg text-sm bg-white">
            <option value="">Pilih Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
          {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
        </div>

        <button
          disabled={isSubmitting}
          className="bg-[#7B1D3F] hover:bg-[#9e2550] text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 mt-2"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Pembicara"}
        </button>
      </form>
    </div>
  );
}
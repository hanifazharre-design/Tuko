import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const schema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  role: z.string().min(3, "Role minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  photo: z.string().nullable().optional(),
  bio: z.string().min(5, "Bio minimal 5 karakter"),
  status: z.string().min(1, "Status wajib dipilih"),
});

type FormData = z.infer<typeof schema>;

export default function PembicaraEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const loadSpeaker = async () => {
      try {
        const response = await axios.get(`${API_URL}/pembicara/${id}`);
        const data = response.data;
        
        setValue("name", data.name, { shouldValidate: true });
        setValue("role", data.role, { shouldValidate: true });
        setValue("email", data.email, { shouldValidate: true });
        setValue("photo", data.photo, { shouldValidate: true });
        setValue("bio", data.bio || "", { shouldValidate: true });
        setValue("status", data.status, { shouldValidate: true });
      } catch (error) {
        console.error("Gagal memuat data pembicara:", error);
        alert("Data pembicara tidak ditemukan!");
        navigate("/dashboard/pembicara");
      }
    };
    loadSpeaker();
  }, [id, setValue, navigate]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`${API_URL}/pembicara/${id}`, data);
      alert("Data pembicara berhasil diperbarui!");
      navigate("/dashboard/pembicara"); // ✅ Tetap aman ke /pembicara
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal memperbarui pembicara.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Edit Pembicara</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Nama</label>
          <input {...register("name")} placeholder="Nama" className="border p-2 rounded w-full" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Role / Pekerjaan</label>
          <input {...register("role")} placeholder="Pekerjaan" className="border p-2 rounded w-full" />
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Email</label>
          <input {...register("email")} placeholder="Email" className="border p-2 rounded w-full" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">URL Foto (Opsional)</label>
          <input {...register("photo")} placeholder="URL Foto (Opsional)" className="border p-2 rounded w-full" />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Bio / Biodata</label>
          <textarea {...register("bio")} placeholder="Bio" className="border p-2 rounded w-full h-24" />
          {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Status</label>
          <select {...register("status")} className="border p-2 rounded w-full bg-white">
            <option value="">Pilih Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
          {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
        </div>

        <div className="flex gap-2 justify-end">
          <Link to="/dashboard/pembicara" className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded font-semibold">
            Batal
          </Link>
          <button type="submit" className="bg-[#7B1D3F] hover:bg-[#9e2550] text-white py-2 px-4 rounded font-semibold cursor-pointer">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
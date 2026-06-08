import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const schema = z.object({
  name: z.string().min(3, "Nama event minimal 3 karakter"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  pembicaraId: z.string().min(1, "Pembicara wajib dipilih"),
  dateEvent: z.string().min(1, "Tanggal wajib diisi"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [pembicaras, setPembicaras] = useState<any[]>([]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const loadDependenciesAndEvent = async () => {
      try {
        const resCat = await axios.get(`${API_URL}/categories`);
        const resPem = await axios.get(`${API_URL}/pembicara`);
        setCategories(resCat.data);
        setPembicaras(resPem.data);

        const resEvent = await axios.get(`${API_URL}/events/${id}`);
        const eventData = resEvent.data;

        const formattedDate = eventData.dateEvent ? new Date(eventData.dateEvent).toISOString().split('T')[0] : "";

        setValue("name", eventData.title || eventData.name, { shouldValidate: true });
        setValue("categoryId", String(eventData.categoryId || eventData.category?.id), { shouldValidate: true });
        setValue("pembicaraId", String(eventData.pembicaraId || eventData.pembicara?.id), { shouldValidate: true });
        setValue("dateEvent", formattedDate!, { shouldValidate: true });
        setValue("location", eventData.location, { shouldValidate: true });
        setValue("description", eventData.description, { shouldValidate: true });
      } catch (err) {
        console.error("Gagal memuat data edit event:", err);
        alert("Data event tidak ditemukan!");
        navigate("/dashboard/event");
      }
    };
    loadDependenciesAndEvent();
  }, [id, setValue, navigate]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        name: data.name,
        dateEvent: data.dateEvent,
        location: data.location,
        description: data.description,
        categoryId: parseInt(data.categoryId),
        pembicaraId: parseInt(data.pembicaraId)
      };

      await axios.put(`${API_URL}/events/${id}`, payload);
      alert("Event berhasil diperbarui!");
      navigate("/dashboard/event"); // ✅ Tetap aman ke /event
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal memperbarui event.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Nama Event</label>
          <input {...register("name")} placeholder="Nama Event" className="border p-2 rounded w-full" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Kategori</label>
          <select {...register("categoryId")} className="border p-2 rounded w-full bg-white">
            <option value="">Pilih Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Pembicara</label>
          <select {...register("pembicaraId")} className="border p-2 rounded w-full bg-white">
            <option value="">Pilih Pembicara</option>
            {pembicaras.map((p) => (
              <option key={p.id} value={p.id}>{p.name} - {p.job}</option>
            ))}
          </select>
          {errors.pembicaraId && <p className="text-red-500 text-xs mt-1">{errors.pembicaraId.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Tanggal Event</label>
          <input type="date" {...register("dateEvent")} className="border p-2 rounded w-full" />
          {errors.dateEvent && <p className="text-red-500 text-xs mt-1">{errors.dateEvent.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Lokasi</label>
          <input {...register("location")} placeholder="Lokasi Event" className="border p-2 rounded w-full" />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Deskripsi</label>
          <textarea {...register("description")} placeholder="Deskripsi Event" className="border p-2 rounded w-full h-24" />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="flex gap-2 justify-end">
          <Link to="/dashboard/event" className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded font-semibold">
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// PERBAIKAN: Mengubah URL lokal ke URL Backend Vercel yang sudah live
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = `${API_URL}/categories`;

export default function CategoryEdit() {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Load data kategori yang mau diedit
  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil detail kategori");
        const data = await res.json();
        setName(data.name); // Isi nama awal ke form input
      } catch (error) {
        console.error(error);
        alert("Gagal memuat detail kategori.");
        navigate("/dashboard/kategori");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryDetail();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama kategori tidak boleh kosong!");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT", // Gunakan PUT/PATCH sesuai dengan configurasi controller backend kamu
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: name }),
      });

      if (!res.ok) throw new Error("Gagal mengupdate kategori");

      alert("Kategori berhasil diperbarui!");
      navigate("/dashboard/kategori");
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui kategori ke database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-gray-500 text-sm">Memuat form data...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold mb-6 text-[#7B1D3F]">Edit Kategori</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Nama Kategori</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B1D3F]/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ubah nama kategori"
          />
        </div>

        <div className="flex gap-2 justify-end mt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/kategori")}
            className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#7B1D3F] hover:bg-[#9e2550] text-white px-5 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "Perbarui Kategori"}
          </button>
        </div>
      </form>
    </div>
  );
}
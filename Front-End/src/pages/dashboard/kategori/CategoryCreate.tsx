import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const BASE_URL = `${API_URL}/categories`;

export default function CategoryCreate() {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama kategori wajib diisi!");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: name }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan kategori");

      alert(`Kategori "${name}" berhasil ditambahkan!`);
      navigate("/dashboard/kategori");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan data ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      <h1 className="text-2xl font-bold mb-6 text-[#7B1D3F]">Tambah Kategori</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Nama Kategori</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B1D3F]/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama kategori (contoh: Seminar, Workshop)"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#7B1D3F] hover:bg-[#9e2550] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Kategori"}
        </button>
      </form>
    </div>
  );
}
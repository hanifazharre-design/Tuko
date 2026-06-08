// import { Link } from "react-router-dom";

// // ✅ Mengambil gambar langsung dari src/img/gambar.png (keluar 3 tingkat folder)
// import FotoProfilDimas from "../../../img/WhatsApp Image 2026-05-21 at 17.38.33.jpeg"; 

// export default function Biodata() {
//   return (
//     <div className="px-6 py-10 max-w-4xl mx-auto space-y-8">
      
//       {/* TOMBOL KEMBALI */}
//       <div className="flex items-center justify-between">
//         <Link 
//           to="/dashboard" 
//           className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#7B1D3F] transition-colors"
//         >
//           <span>←</span> Kembali ke Dashboard
//         </Link>
//         <span className="text-xs bg-rose-50 text-[#7B1D3F] border border-rose-100 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
//           Pengembang Proyek
//         </span>
//       </div>

//       {/* GRID CONTAINER */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
//         {/* KARTU PROFIL UTAMA (KIRI) */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden text-center p-6">
          
//           {/* AREA FOTO PROFIL */}
//           <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
//             <img 
//               src={FotoProfilDimas} 
//               alt="Foto Profil Dimas Sahputra"
//               className="w-full h-full object-cover object-center"
//             />
//           </div>
          
//           <h2 className="text-xl font-bold text-[#1a0a10] tracking-tight">Dimas Sahputra</h2>
//           <p className="text-xs font-semibold text-[#7B1D3F] mt-1 bg-rose-50 inline-block px-2.5 py-0.5 rounded-full">
//             UI/UX & Frontend Developer
//           </p>
          
//           <hr className="my-5 border-gray-50" />
          
//           {/* KONTAK SOSIAL */}
//           <div className="space-y-3">
//             <a 
//               href="https://github.com/Dimassahputra" 
//               target="_blank" 
//               rel="noreferrer" 
//               className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition text-sm text-gray-600 font-medium"
//             >
//               <span className="text-base">🐙</span> GitHub Profile
//             </a>
//             <a 
//               href="mailto:dimas@example.com" 
//               className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition text-sm text-gray-600 font-medium"
//             >
//               <span className="text-base">📧</span> Email Mahasiswa
//             </a>
//           </div>
//         </div>

//         {/* DETAIL MAHASISWA & INFORMASI SISTEM (KANAN) */}
//         <div className="md:col-span-2 space-y-6">
          
//           {/* BLOK 1: IDENTITAS RESMI */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <span className="w-4 h-0.5 bg-[#7B1D3F]" />
//               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Identitas Mahasiswa</h3>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <span className="block text-[10px] font-bold text-gray-400 uppercase">Nama Lengkap</span>
//                 <span className="text-sm font-semibold text-[#1a0a10]">Dimas Sahputra</span>
//               </div>
//               <div>
//                 <span className="block text-[10px] font-bold text-gray-400 uppercase">Nomor Induk Mahasiswa</span>
//                 <span className="text-sm font-mono font-bold text-gray-700">24090016</span>
//               </div>
//               <div>
//                 <span className="block text-[10px] font-bold text-gray-400 uppercase">Program Studi</span>
//                 <span className="text-sm font-semibold text-[#1a0a10]">Teknik Informatika</span>
//               </div>
//               <div>
//                 <span className="block text-[10px] font-bold text-gray-400 uppercase">Instansi Akademik</span>
//                 <span className="text-sm font-semibold text-gray-600">Universitas Harkat Negeri</span>
//               </div>
//             </div>
//           </div>

//           {/* BLOK 2: KONTRIBUSI DALAM PROYEK INVOFEST */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
//             <div className="flex items-center gap-2 mb-4">
//               <span className="w-4 h-0.5 bg-[#7B1D3F]" />
//               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kontribusi Sistem (Invofest Project)</h3>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Tanggung Jawab Teknis</span>
//                 <div className="flex flex-wrap gap-2">
//                   {["UI/UX Design Layout", "Manajemen CRUD Frontend", "Integrasi Endpoint API", "Routing & Komponen React"].map((tag) => (
//                     <span key={tag} className="text-xs font-medium bg-rose-50/60 text-[#7B1D3F] border border-rose-100 px-2.5 py-1 rounded-lg">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Kombinasi Teknologi Proyek</span>
//                 <div className="flex flex-wrap gap-2">
//                   {["React.js (Vite)", "TypeScript", "Tailwind CSS", "Express.js", "Prisma ORM", "MySQL"].map((tech) => (
//                     <span key={tech} className="text-xs font-medium bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* BLOK 3: STATUS COLLABORATOR TEAM */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <span className="text-2xl">👥</span>
//               <div>
//                 <h4 className="text-sm font-bold text-[#1a0a10]">Kolaborasi Tim Web Programming</h4>
//                 <p className="text-xs text-gray-400">Dimas Sahputra & Rekan Tim</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
//                 ● Terverifikasi
//               </span>
//             </div>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }
import Button from "../components/ui/Button";
import SpeakerCard from "../components/ui/SpeakerCard";
import Collapse from "../components/ui/Collapse";
import { Calendar, Clock, MapPin, Building } from "lucide-react";

export default function Talkshow() {

  // DATA PEMBICARA
  const speakers = [
    {
      name: "Moh. Ichsan Maulana",
      role: "Human Capital Information System (HCIS), PT. Garuda Daya Pratama Sejahtera",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/talkshow/talkshow%20ichsan.png",
    },
    {
      name: "M. Zaim Zamzami",
      role: "Programmer, PT. Pertamina Drilling Service Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/talkshow/talkshow%20zaim%20zamzami.png",
    },
    {
      name: "Daffa Zuhdan Muhtar",
      role: "Android Developer, PT. Astra Internasional",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/talkshow/talkshow%20daffa.png",
    },
    {
      name: "Bayu Adi Prasetiyo",
      role: "Software Engineer, KOMPAS.ID",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/talkshow/talkshow%20bayu.png",
    },
  ];

  //  FAQ
  const faqItems = [
    {
      title: "Apa itu  INVOFEST?",
      description:
        "Invofest (Informatics Vocational Festival) adalah festival tahunan yang diakan oleh program studi sarjana terapan teknik informatika Universitas Harkat Negeri, yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital.",
    },
    {
      title: "Kapan dan dimana INVOFEST dilaksanakan?",
      description:
        "INVOFEST diselenggarakan mulai tanggal 21 Oktober 2025 sampai dengan tanggal 27 November 2025. Untuk acara workshop, seminar, talkshow diadakan secara Offline di kampus 1 Universitas Harkat Negeri dan kompetisi diadakan secara Online.",
    },
    {
      title: "Apakah ada biaya pendaftaran di INVOFEST?",
      description:
        "Semua kegiatan dipastikan berbayar ya teman-teman.",
    },
  ];

  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">

        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            IT Talkshow
          </h1>

          <h2 className="text-xl md:text-2xl text-red-800 mb-6">
            "Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan"
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Talkshow “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan” Sebuah diskusi interaktif yang mengeksplorasi cara
            mengintegrasikan nilai-nilai kemanusiaan seperti etika, empati, dan kreativitas ke dalam pengembangan kecerdasan buatan.
            yang bertujuan menginspirasi audiens untuk membangun dan memanfaatkan AI sebagai alat kolaboratif yang memperkuat potensi
            unik manusia, bukan sebagai penggantinya.
          </p>

          <div className="flex gap-4">
            <Button label="DAFTAR SEKARANG" variant="primary" />
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Talkshow.png"
            alt="talkshow"
            className="w-72 md:w-96"
          />
        </div>
      </section>

      {/*  DESKRIPSI */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-4">
          Tentang IT Talkshow
        </h2>

        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Seiring teknologi, khususnya kecerdasan buatan (AI), yang semakin meresap ke dalam setiap aspek kehidupan kita, muncul sebuah pertanyaan fundamental:
          Apakah kita sedang menciptakan teknologi yang melayani manusia, atau justru sebaliknya? Untuk menjawab pertanyaan tersebut, kami mempersembahkan talkshow
          berskala nasional: “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan.” Acara ini dirancang bukan untuk membahas teknologi sebagai entitas yang
          dingin dan terpisah, melainkan untuk menggali bagaimana kita dapat menanamkan nilai-nilai kemanusiaan—seperti empati, etika, dan kreativitas—ke dalam inti pengembangan AI.
          Kami akan mengupas tuntas visi masa depan di mana AI tidak menjadi pesaing, tetapi menjadi mitra kolaboratif yang memperkuat potensi unik manusia.
        </p>
      </section>

      {/* PEMBICARA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-10">
          Temui Pembicara Khusus Kami
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={index}
              name={speaker.name}
              role={speaker.role}
              imageUrl={speaker.imageUrl}
            />
          ))}
        </div>
      </section>

      {/*  PELAKSANAAN */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-10">
          Pelaksanaan IT Talkshow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Calendar className="text-red-900" />
            <div>
              <p className="text-gray-500 text-sm">Tanggal</p>
              <h3 className="text-lg font-semibold text-red-900">
                Senin, 24 November 2025
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Clock className="text-red-900" />
            <div>
              <p className="text-gray-500 text-sm">Waktu</p>
              <h3 className="text-lg font-semibold text-red-900">
                08.00 WIB - 12.00 WIB
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <MapPin className="text-red-900" />
            <div>
              <p className="text-gray-500 text-sm">Lokasi</p>
              <h3 className="text-lg font-semibold text-red-900">
                Aula Gedung C
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Building className="text-red-900" />
            <div>
              <p className="text-gray-500 text-sm">Tempat</p>
              <h3 className="text-lg font-semibold text-red-900">
                Kampus 1 (Mataram) Universitas Harkat Negeri
              </h3>
            </div>
          </div>

        </div>
      </section>

      {/*  FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-6">
          Punya Pertanyaan? Lihat Disini
        </h2>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, index) => (
            <Collapse
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-600 text-sm">
        &copy; 2026 Invofest. All rights reserved.
      </footer>

    </div>
  );
}
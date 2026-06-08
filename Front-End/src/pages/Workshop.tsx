import Button from "../components/ui/Button";
import SpeakerCard from "../components/ui/SpeakerCard";
import Collapse from "../components/ui/Collapse";
import { Calendar, Clock, Building, } from "lucide-react";

export default function Workshop() {

  //  DATA MENTOR
  const mentors = [
    {
      name: "Lhuqita Fazry",
      role: "Mobile Developer, Founder Rumah Coding Indonesia",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/workshop/workshop%20mobile.png",
    },
    {
      name: "M. Dendi Purwanto",
      role: "Artificial Intelligence Engineer Software Engineer, PT. Mayar Kernel Supernova",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/workshop/workshop%20AI.png",
    },
    {
      name: "Danang Avan M",
      role: "Cyber Security Security Analyst, Founder | Contributor TegalSec",
      imageUrl:
        "https://www.invofest-harkatnegeri.com/assets/workshop/talkshow%20cyber.png",
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

      {/*  HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            IT Workshop
          </h1>

          <h2 className="text-xl md:text-2xl text-red-800 mb-5">
            "AI for a Sustainable Future: The Role of Z Generation in the Digital Era"
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
           IT Workshop ini menjembatani antara potensi Generasi Z dan kekuatan AI untuk menciptakan masa depan yang berkelanjutan. Peserta akan dibekali wawasan dan alat untuk mentransformasi ide-ide inovatif 
           menjadi solusi lingkungan yang nyata dan terukur di era digital.
          </p>

          <div className="flex gap-4">
            <Button label="DAFTAR SEKARANG" variant="primary" />
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Workshop.png"
            alt="workshop"
            className="w-72 md:w-96"
          />
        </div>
      </section>

      {/*  DESKRIPSI */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-4">
          Tentang IT Workshop
        </h2>

        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Workshop “AI for a Sustainable Future: The Role of Z Generation in the Digital Era” ini didesain khusus untuk Generasi Z, para digital natives yang berada di 
          persimpangan antara inovasi teknologi dan tantangan keberlanjutan global. Peserta akan diajak untuk menyelami bagaimana Kecerdasan Buatan (AI) bukan hanya sekadar 
          teknologi canggih, tetapi juga alat yang ampuh untuk menciptakan solusi nyata bagi isu-isu lingkungan. Melalui sesi inspiratif, pengenalan konsep, dan praktik langsung 
          (hands-on), workshop ini bertujuan memberdayakan Gen Z untuk menjadi agen perubahan di era digital, menggunakan keahlian mereka untuk masa depan bumi yang lebih baik.
        </p>
      </section>

      {/*  MENTOR */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-10">
          Temui Pembicara Khusus Kami
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-2">
          {mentors.map((mentor, index) => (
            <SpeakerCard
              key={index}
              name={mentor.name}
              role={mentor.role}
              imageUrl={mentor.imageUrl}
            />
          ))}
        </div>
      </section>

      {/* PELAKSANAAN */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-10">
          Pelaksanaan IT Workshop
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Calendar className="text-red-900" />
            <div>
              <p className="text-red-900 text-lg font-semibold">Mobile Development</p>
              <h3 className="text-sm font-regular text-gray-500">
                Selasa, 25 November 2025
              </h3>
              <h3 className="text-sm font-regular text-gray-500">
                08.00 WIB - 16.30 WIB
              </h3>
              <h3 className="text-sm font-regular text-gray-500">
                Lab Kom D.1
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Clock className="text-red-900" />
            <div>
              <p className="text-red-900 text-lg font-semibold">Artificial Intelegence</p>
              <h3 className="text-sm font-regular text-gray-500">
                Selasa, 25 November 2025
              </h3>
              <h3 className="text-sm font-regular text-gray-500">
                08.00 WIB - 16.30 WIB
              </h3>
              <h3 className="text-sm font-regular text-gray-500">
                Lab Kom D.2
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
            <Building className="text-red-900" />
            <div>
              <p className="text-red-900 text-lg font-semibold">Artificial Intelegence</p>
              <h3 className="text-sm font-regular text-gray-500">
                Rabu, 26 November 2025
              </h3>
              <h3 className="text-sm font-regular text-gray-500">
                08.00 WIB - 16.30 WIB
              </h3>
              <h3 className="text-sm font-regular text-gray-500">
                Lab Kom D.2
              </h3>
            </div>
          </div>
          
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-6">
          Pertanyaan Umum
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
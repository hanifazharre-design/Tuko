import Button from "../components/ui/Button";
import Collapse from "../components/ui/Collapse";

export default function Competition() {
  const competitions = [
    {
      title: "Poster Design Competition",
      desc: "Poster Design Competition ini adalah kompetisi untuk menciptakan suatu karya dalam bentuk poster digital yang komunikatif dan inspiratif.",
      image:
        "https://www.invofest-harkatnegeri.com/assets/competition-card/software_dev.png",
    },
    {
      title: "UI/UX Design Competition",
      desc: "UI/UX Design Competition ini adalah kompetisi untuk menciptakan dan merancang inovasi sebuah produk digital.",
      image:
        "https://www.invofest-harkatnegeri.com/assets/competition-card/ui_ux.png",
    },
    {
      title: "Web Design Competition",
      desc: "Web Design Competition ini adalah kompetisi untuk menciptakan suatu perangkat lunak berbasis website yang menarik dan responsif.",
      image:
        "https://www.invofest-harkatnegeri.com/assets/competition-card/web_design.png",
    },
  ];

  const collapseItems = [
    {
      title: "Apa itu Infofest?",
      description:
        "Invofest (Informatics Vocational Festival) adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital. Dengan mengusung tema 'Beyond Limits, Beyond Intelligence: Innovate for a Smarter Tomorrow.'",
    },
    {
      title: "Kapan dan dimana Invofest diselenggarakan?",
      description:
        "INVOFEST diselenggarakan mulai tanggal 21 Oktober 2025 sampai dengan tanggal 27 November 2025. Untuk acara workshop, seminar, talkshow diadakan secara Offline di kampus 1 Universitas Harkat Negeri dan kompetisi diadakan secara Online",
    },
    {
      title: "Apakah ada biaya pendaftaran Invofest?",
      description:
        "Semua kegiatan dipastikan berbayar ya teman-teman.",
    },
  ];

  return (
    <div className="bg-gray-50">

      {/* 🔥 HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            IT Competition
          </h1>

          <h2 className="text-xl md:text-2xl text-red-800 mb-6">
            "From Creation to Innovation"
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Kompetisi dalam INVOFEST ini mengusung tema{" "}
            <span className="font-semibold">"From Creation to Innovation"</span>
            , yang bertujuan mengajak generasi muda untuk mengembangkan
            inovasi dan kreativitas guna membentuk kelompok yang memiliki
            potensi luar biasa.
          </p>

          <div className="flex gap-4">
            <Button label="INFO SELENGKAPNYA" variant="primary" />
            <Button label="HUBUNGI PANITIA" variant="outline" />
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png"
            alt="maskot"
            className="w-72 md:w-96"
          />
        </div>
      </section>

      {/* 🔥 DESKRIPSI */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-4">
          DESKRIPSI KOMPETISI
        </h2>

        <p className="max-w-3xl mx-auto text-gray-800 leading-relaxed">
          Kompetisi dalam kegiatan{" "}
          <strong>INVOFEST (Informatics Vocational Festival)</strong> terdiri
          dari berbagai kategori seperti Poster Design, UI/UX Design, dan Web
          Design Competition. Dengan tema{" "}
          <strong>“From Creation to Innovation”</strong>, Tema ini bertujuan mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki potensi luar biasa, 
          yang mampu mewujudkan masa depan yang berkelanjutan. Melalui pendekatan ini, diharapkan generasi ini akan berperan dalam menciptakan solusi-solusi baru untuk tantangan masa kini dan mendatang, 
          baik dalam hal teknologi, lingkungan, pendidikan, maupun tanggung jawab sosial.
        </p>
      </section>

      {/* 🔥 TITLE */}
      <section className="text-center py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-red-900">
          DAFTAR KOMPETISI
        </h2>
        <p className="text-gray-500 mt-2">
          Berikut adalah daftar kompetisi yang ada pada event INVOFEST.
        </p>
      </section>

      {/* 🔥 CARD */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {competitions.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                {item.desc}
              </p>

              <Button label="INFO SELENGKAPNYA" variant="primary" />
            </div>
          </div>
        ))}
      </section>

      {/* 🔥 FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-20 text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-900 mb-6">
          Pertanyaan Umum
        </h2>

        <div className="flex flex-col gap-3">
          {collapseItems.map((item, index) => (
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
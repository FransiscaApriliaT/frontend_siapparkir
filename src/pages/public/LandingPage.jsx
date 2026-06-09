import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Eye,
  Clock,
  Shield,
  AlertTriangle,
  Scale,
  Building2,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import logoDishub from '../../assets/logo_dishub.png';

/* =========================
   SCROLL REVEAL COMPONENT
========================= */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* =========================
   LAW CARD COMPONENT
========================= */
const LawCard = ({ item, accent, border }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: '#fff',
        borderRadius: 14,
        border: `1px solid ${open ? accent + '55' : border}`,
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: open ? `0 4px 20px ${accent}14` : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 8,
        }}
      >
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: '#111' }}>
            {item.label}
          </p>

          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#888' }}>
            {item.subtitle}
          </p>
        </div>

        <ChevronRight
          size={14}
          style={{
            color: accent,
            flexShrink: 0,
            marginTop: 2,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        />
      </div>

      {open && (
        <p
          style={{
            margin: '10px 0 0',
            fontSize: 12,
            color: '#555',
            lineHeight: 1.7,
            borderTop: `1px solid ${border}`,
            paddingTop: 10,
          }}
        >
          {item.detail}
        </p>
      )}
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MapPin size={20} />,
      title: 'Lapor dengan peta',
      desc: 'Titik koordinat otomatis dari GPS Anda. Foto bukti pelanggaran langsung terlampir dalam laporan.',
    },
    {
      icon: <Eye size={20} />,
      title: 'Pantau real-time',
      desc: 'Lacak status laporan dari diterima, diverifikasi, diproses, hingga selesai ditindak oleh petugas.',
    },
    {
      icon: <Shield size={20} />,
      title: 'Identitas aman',
      desc: 'Data pelapor dienkripsi dan dijaga kerahasiaannya oleh pihak berwenang.',
    },
    {
      icon: <Clock size={20} />,
      title: 'Respons cepat',
      desc: 'Laporan dapat dipantau secara digital sehingga proses tindak lanjut menjadi lebih transparan.',
    },
  ];

  const legalGroups = [
    {
      type: 'Hukum Nasional', accent: '#1A3F9F', bg: '#F0F4FF', border: '#C8D5FA',
      items: [
        { label: 'Pasal 287 Ayat (1) UU No. 22 Tahun 2009', subtitle: 'Pelanggaran rambu & marka lalu lintas', detail: 'Setiap pengemudi yang melanggar aturan rambu lalu lintas atau marka jalan — termasuk marka larangan parkir — dipidana kurungan paling lama 2 bulan atau denda paling banyak Rp500.000.' },
        { label: 'Pasal 106 Ayat (4) UU No. 22 Tahun 2009', subtitle: 'Kewajiban mematuhi marka jalan', detail: 'Setiap pengemudi kendaraan bermotor di jalan wajib mematuhi ketentuan marka jalan, termasuk larangan parkir pada area yang ditandai marka tertentu.' },
        { label: 'Pasal 28 Ayat (1) UU No. 22 Tahun 2009', subtitle: 'Larangan mengganggu fungsi jalan', detail: 'Setiap orang dilarang melakukan perbuatan yang mengakibatkan gangguan pada fungsi jalan. Parkir sembarangan yang menghambat arus lalu lintas termasuk dalam kategori pelanggaran ini.' },
        { label: 'Pasal 106 PP No. 79 Tahun 2013', subtitle: 'Larangan lokasi parkir di ruang milik jalan', detail: 'Kendaraan bermotor dilarang parkir di: area penyeberangan pejalan kaki, tikungan, persimpangan, trotoar, jalur bus, depan akses darurat, dan ruas dengan tingkat kemacetan tinggi.' },
      ],
    },
    {
      type: 'Perda Kota Palu', accent: '#9B3A00', bg: '#FFF5F0', border: '#F9CAAE',
      items: [
        { label: 'Perda Kota Palu No. 6 Tahun 2023', subtitle: 'Penyelenggaraan Lalu Lintas dan Angkutan Jalan', detail: 'Mengatur larangan parkir di tempat yang tidak ditetapkan oleh Pemkot Palu. Pengendara yang memarkir kendaraan di luar titik resmi dapat dikenai sanksi administratif dan tindakan Derek oleh Satgas.' },
        { label: 'Perda Kota Palu No. 3 Tahun 2022', subtitle: 'Dasar penyelenggaraan LLAJ Kota Palu', detail: 'Perda induk yang mewajibkan setiap pengguna jalan mematuhi rambu, marka, dan ketentuan parkir yang ditetapkan di wilayah Kota Palu. Pelanggaran dapat diproses melalui sidang tilang.' },
        { label: 'Keputusan Wali Kota Palu No. 551.1/168.2/DISHUB/2021', subtitle: 'Satgas Pengendalian & Penertiban Parkir', detail: 'Satgas berwenang menindak kendaraan yang parkir sembarangan: mulai dari teguran, penilangan, hingga penggembokan dan penDerek-an kendaraan ke pool Dishub Kota Palu.' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white antialiased font-sans">

      {/* ================= HERO ================= */}
      <div className="min-h-screen bg-white flex flex-col lg:flex-row">

        {/* SISI KIRI */}
        <div className="relative w-full lg:w-[53%] min-h-[330px] sm:min-h-[400px] lg:min-h-screen bg-[#0A1931] flex flex-col justify-center lg:justify-end px-6 py-10 sm:p-12 lg:p-16 text-white overflow-hidden">

          {/* Layer Gambar Latar Belakang */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200')",
            }}
          />

          {/* Konten Teks di Sisi Kiri */}
          <div className="relative z-10 space-y-3 lg:space-y-4 max-w-xl">
            <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
              <img
                src={logoDishub}
                alt="Logo Dinas Perhubungan"
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="text-[2rem] sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ketertiban Dimulai Dari Sini.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed text-justify">
              Platform pelaporan resmi Dinas Perhubungan untuk menindak pelanggaran parkir demi kenyamanan dan kelancaran lalu lintas kota.
            </p>
          </div>
        </div>

        {/* SISI KANAN */}
        <div className="w-full lg:w-[47%] flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 bg-white">
          <div className="w-full max-w-md space-y-10">

            {/* Logo & Judul Aplikasi */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#001A57] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md tracking-wider">
                P
              </div>

              <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                SiapParkir
              </span>
            </div>

            {/* Teks Selamat Datang */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                Selamat Datang
              </h2>

              <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed text-justify">
                Bantu kami mewujudkan jalanan yang tertib dan aman. Laporkan pelanggaran parkir liar di sekitar Anda.
              </p>
            </div>

            {/* Tombol Utama */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3.5 bg-[#001A57] hover:bg-[#00133f] text-white rounded-xl font-semibold text-base transition flex items-center justify-center gap-2"
              >
                Lapor Sekarang
                <span>→</span>
              </button>
            </div>

            {/* Informasi Keamanan */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-start gap-4 p-4 bg-[#F4F7FF] border border-[#E2EAFD] rounded-2xl">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#001A57] flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-extrabold text-[#001A57] uppercase tracking-wide">
                    Resmi & Terenkripsi
                  </h4>

                  <p className="text-[11px] text-gray-500 font-semibold leading-normal text-justify">
                    Data pelapor akan dijaga kerahasiaannya oleh otoritas terkait.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= TENTANG PLATFORM ================= */}
      <section className="py-16 sm:py-24 px-6 bg-[#F7F9FF]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-[#001A57] rounded-full" />
              <span className="text-[11px] font-black text-[#001A57] uppercase tracking-widest">
                Tentang Platform
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight mb-4">
              Apa itu SIAP Parkir?
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl text-justify">
              <strong className="text-[#001A57]">SIAP Parkir</strong> adalah platform digital berbasis web yang membantu masyarakat melaporkan pelanggaran parkir secara cepat, transparan, dan terstruktur kepada Dinas Perhubungan.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {features.map((item, index) => (
              <Reveal key={index} delay={index * 70}>
                <div className="h-full bg-white border border-[#E4EAFF] rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition">
                  <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center text-[#001A57] mb-4">
                    {item.icon}
                  </div>

                  <h3 className="font-black text-sm text-gray-950 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed text-justify">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DISHUB ================= */}
      <section className="bg-white border-t border-gray-100 py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-6 bg-[#001A57] rounded-full" />
            <span className="text-xs font-extrabold text-[#001A57] uppercase tracking-widest">
              Instansi Mitra
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mb-4 tracking-tight">
            Dinas Perhubungan Kota Palu
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                <strong>Dinas Perhubungan (Dishub) Kota Palu</strong> adalah instansi pemerintah daerah yang berwenang mengelola, mengawasi, dan menertibkan penyelenggaraan lalu lintas serta angkutan jalan di wilayah Kota Palu.
              </p>

              <p>
                Melalui platform ini, masyarakat dapat melaporkan <strong>kendaraan yang parkir tidak pada tempatnya</strong>, seperti kendaraan yang berhenti atau parkir di trotoar, bahu jalan, tikungan, persimpangan, depan akses keluar masuk, area larangan parkir, maupun lokasi lain yang mengganggu kelancaran dan keselamatan lalu lintas.
              </p>

              <p>
                Setiap laporan yang masuk akan menjadi bahan pemantauan dan tindak lanjut petugas lapangan. Fokus penindakan ditujukan pada <strong>kendaraan yang melanggar aturan parkir</strong>, bukan pada pelapor, sehingga masyarakat dapat berpartisipasi membantu menciptakan jalan yang lebih tertib, aman, dan nyaman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DASAR HUKUM ================= */}
      <section className="py-16 sm:py-24 px-6 bg-[#F7F9FF]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-[#001A57] rounded-full" />
              <span className="text-[11px] font-black text-[#001A57] uppercase tracking-widest">
                Landasan Hukum
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight mb-3">
              Parkir liar adalah pelanggaran hukum
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-2xl text-justify">
              Regulasi nasional dan daerah menjadi dasar penindakan terhadap pelanggaran parkir yang mengganggu ketertiban lalu lintas.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legalGroups.map((group, index) => (
              <Reveal key={index} delay={index * 100}>
                <div>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4"
                    style={{
                      background: group.bg,
                      border: `1px solid ${group.border}`,
                    }}
                  >
                    <Scale size={14} style={{ color: group.accent }} />

                    <span
                      className="text-[11px] font-black uppercase tracking-wider"
                      style={{ color: group.accent }}
                    >
                      {group.type}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {group.items.map((item, itemIndex) => (
                      <LawCard
                        key={itemIndex}
                        item={item}
                        accent={group.accent}
                        border={group.border}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="bg-[#0A1931] py-16 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={logoDishub}
                alt="Logo Dinas Perhubungan"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-xl font-extrabold text-white tracking-tight">
              SiapParkir
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Lihat pelanggaran parkir di sekitar Anda?
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed">
            Laporkan sekarang dan bantu Dinas Perhubungan Kota Palu mewujudkan lalu lintas yang tertib dan aman.
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#001A57] rounded-xl font-extrabold text-sm hover:bg-gray-100 transition"
          >
            Lapor Sekarang →
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10">
            {[
              'Data terenkripsi',
              'Identitas aman',
              'Platform resmi Dishub',
            ].map((text, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold"
              >
                <CheckCircle2 size={13} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
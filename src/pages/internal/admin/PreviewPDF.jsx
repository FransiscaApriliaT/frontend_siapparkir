import { useEffect, useState } from 'react'

const TINDAKAN_LABEL = {
  TEGURAN:         'Teguran Lisan',
  GEMBOK:          'Penggembokan Ban',
  DEREK:           'Derek Kendaraan',
  PINDAH:          'Pemindahan Kendaraan',
  TIDAK_DITEMUKAN: 'Kendaraan Tidak Ditemukan',
}

const formatTanggal = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('id-ID', {
    weekday: 'long', day: '2-digit',
    month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function PreviewPDF() {
  const [data, setData]           = useState([])
  const [waktuCetak, setWaktuCetak] = useState('')
  const [refId, setRefId]         = useState('')

  useEffect(() => {
    const raw  = localStorage.getItem('data_ekspor_dishub')
    const list = raw ? JSON.parse(raw) : []
    setData(list)

    const opsi = {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }
    setWaktuCetak(new Date().toLocaleString('id-ID', opsi) + ' WITA')
    setRefId('DOK-' + Math.floor(100000 + Math.random() * 900000))
  }, [])

  const totalDerek = data.filter(
    (d) => d.tindakan?.toUpperCase().includes('DEREK')
  ).length

  return (
    <div className="bg-gray-200 min-h-screen py-8 print:bg-white print:py-0">

      {/* Tombol aksi — hilang saat print */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between px-4 print:hidden">
        <div>
          <p className="text-sm font-bold text-gray-700">
            {data.length} laporan siap dicetak
          </p>
          <p className="text-xs text-gray-400">
            Setiap laporan akan tampil 1 halaman
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.close()}
            className="bg-white border border-gray-300 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition"
          >
            ✕ Tutup
          </button>
          <button
            onClick={() => window.print()}
            className="bg-[#001A57] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-900 transition"
          >
            🖨️ Cetak / Save PDF
          </button>
        </div>
      </div>

      {/* Preview ringkasan — hilang saat print */}
      <div className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm print:hidden">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Total Laporan</p>
            <p className="text-2xl font-black text-gray-900">{data.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Total Derek</p>
            <p className="text-2xl font-black text-blue-900">{totalDerek}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase">Estimasi PNBP</p>
            <p className="text-2xl font-black text-emerald-600">
              Rp {(totalDerek * 250000).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================
          HALAMAN PER LAPORAN
      ============================================ */}
      {data.map((item, idx) => (
        <div
          key={idx}
          className="max-w-4xl mx-auto mb-8 bg-white shadow-md print:shadow-none print:mb-0"
          style={{
            pageBreakAfter: idx < data.length - 1 ? 'always' : 'auto',
            breakAfter:     idx < data.length - 1 ? 'page'   : 'auto',
          }}
        >
          {/* ---- HEADER DOKUMEN ---- */}
          <div className="flex justify-between items-center border-b-2 border-[#001A57] px-10 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#001A57] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xl">P</span>
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#001A57]">SiapParkir</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Dinas Perhubungan Kota Palu
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-gray-500">
              <p className="font-bold text-gray-900 text-sm">
                Laporan #{idx + 1} dari {data.length}
              </p>
              <p className="mt-0.5">No. Ref: {refId}-{String(idx + 1).padStart(3, '0')}</p>
              <p>Dicetak: {waktuCetak}</p>
            </div>
          </div>

          {/* ---- JUDUL ---- */}
          <div className="px-10 pt-6 pb-4 border-b border-gray-100">
            <h1 className="text-xl font-black text-center uppercase tracking-wide text-gray-900">
              Berita Acara Penindakan Parkir Liar
            </h1>
          </div>

          {/* ---- INFO LAPORAN ---- */}
          <div className="px-10 py-6">
            <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm">

              <div className="col-span-2">
                <div className="bg-[#001A57] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-t-lg">
                  Informasi Pelaporan
                </div>
                <div className="border border-gray-200 rounded-b-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">ID Laporan</p>
                    <p className="font-black text-gray-900 text-lg mt-0.5">{item.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Waktu Laporan</p>
                    <p className="font-semibold text-gray-700 mt-0.5">{item.waktu}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Nomor Plat</p>
                    <p className="font-black text-gray-900 font-mono text-lg mt-0.5">{item.nopol}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Jenis Kendaraan</p>
                    <p className="font-semibold text-gray-700 mt-0.5">{item.jenis_kendaraan || '-'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Lokasi Pelanggaran</p>
                    <p className="font-semibold text-gray-700 mt-0.5">{item.alamat}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="bg-gray-700 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-t-lg">
                  Hasil Penindakan
                </div>
                <div className="border border-gray-200 rounded-b-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Petugas</p>
                    <p className="font-semibold text-gray-700 mt-0.5">{item.petugas}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Jenis Tindakan</p>
                    <p className="font-black text-gray-900 mt-0.5">
                      {TINDAKAN_LABEL[item.tindakan] || item.tindakan || '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Status Akhir</p>
                    <span className="inline-block mt-0.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                      ✓ {item.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Waktu Penindakan</p>
                    <p className="font-semibold text-gray-700 mt-0.5">
                      {item.waktu_tindakan ? formatTanggal(item.waktu_tindakan) : '-'}
                    </p>
                  </div>
                  {item.catatan && item.catatan !== '-' && (
                    <div className="col-span-2">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Catatan Petugas</p>
                      <p className="font-semibold text-gray-700 mt-0.5 italic">"{item.catatan}"</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* ---- FOTO BUKTI ---- */}
            <div className="mt-6 grid grid-cols-2 gap-6">

              {/* Foto pelapor */}
              <div>
                <div className="bg-blue-50 border border-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-t-lg">
                  📷 Foto Bukti Pelaporan
                </div>

                <div className="border border-blue-100 rounded-b-lg overflow-hidden bg-gray-50 h-56 flex items-center justify-center">
                  {item.foto_bukti_url ? (
                    <img
                      src={item.foto_bukti_url}
                      alt="Bukti pelaporan"
                      className="max-w-full max-h-full object-contain"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-center text-gray-300">
                      <p className="text-3xl mb-1">📷</p>
                      <p className="text-xs">Tidak ada foto</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Foto tindakan */}
              <div>
                <div className="bg-green-50 border border-green-100 text-green-800 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-t-lg">
                  Foto Bukti Penindakan
                </div>

                <div className="border border-green-100 rounded-b-lg overflow-hidden bg-gray-50 h-56 flex items-center justify-center">
                  {item.foto_tindakan_url ? (
                    <img
                      src={item.foto_tindakan_url}
                      alt="Bukti tindakan"
                      className="max-w-full max-h-full object-contain"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-center text-gray-300">
                      <p className="text-3xl mb-1">📋</p>
                      <p className="text-xs">Tidak ada foto tindakan</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* ---- TANDA TANGAN ---- */}
            <div className="mt-8 grid grid-cols-3 gap-6 text-center text-xs">
              <div>
                <p className="text-gray-400 font-bold uppercase mb-12">Petugas Lapangan</p>
                <div className="border-b border-gray-400 mb-1" />
                <p className="font-semibold text-gray-700">{item.petugas}</p>
              </div>
              <div>
                <p className="text-gray-400 font-bold uppercase mb-12">Mengetahui</p>
                <div className="border-b border-gray-400 mb-1" />
                <p className="font-semibold text-gray-700">Kepala Seksi</p>
              </div>
              <div>
                <p className="text-gray-400 font-bold uppercase mb-12">Menyetujui</p>
                <div className="border-b border-gray-400 mb-1" />
                <p className="font-semibold text-gray-700">Admin Dishub</p>
              </div>
            </div>

          </div>

          {/* ---- FOOTER HALAMAN ---- */}
          <div className="border-t border-gray-200 px-10 py-4 flex justify-between items-center text-[10px] text-gray-400">
            <p>SiapParkir — Sistem Pelaporan Parkir Liar Dishub Kota Palu</p>
            <p>Halaman {idx + 1} dari {data.length}</p>
          </div>

        </div>
      ))}

      {/* Pesan kalau data kosong */}
      {data.length === 0 && (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-16 text-center shadow-sm">
          <p className="text-4xl mb-4">📭</p>
          <p className="font-bold text-gray-600">Tidak ada data untuk dicetak</p>
          <button onClick={() => window.close()} className="mt-5 px-5 py-2 bg-[#001A57] text-white rounded-xl text-sm font-bold">
            Tutup
          </button>
        </div>
      )}

      {/* CSS Print */}
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:mb-0 { margin-bottom: 0 !important; }
          .print\\:bg-white { background: white !important; }
          .print\\:py-0 { padding-top: 0; padding-bottom: 0; }
        }
      `}</style>

    </div>
  )
}
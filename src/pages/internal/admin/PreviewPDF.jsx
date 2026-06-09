import React, { useEffect, useState } from 'react';

export default function PreviewPDF() {
  const [data, setData] = useState([]);
  const [waktuCetak, setWaktuCetak] = useState('');
  const [refId, setRefId] = useState('');

  useEffect(() => {
    const stringData = localStorage.getItem('data_ekspor_dishub');
    const dataTerfilter = stringData ? JSON.parse(stringData) : [];
    setData(dataTerfilter);

    const opsiWaktu = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    setWaktuCetak(new Date().toLocaleString('id-ID', opsiWaktu) + ' WITA');
    setRefId('REKAP-' + Math.floor(100000 + Math.random() * 900000));
  }, []);

  const totalDerek = data.filter(item => item.tindakan === 'DEREK').length;

  return (
    <div className="bg-gray-100 min-h-screen py-10 antialiased print:bg-white print:p-0">
      {/* Tombol Aksi */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-end gap-3 print:hidden px-6">
        <button
          onClick={() => window.close()}
          className="bg-white border border-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl"
        >
          Tutup
        </button>

        <button
          onClick={() => window.print()}
          className="bg-[#001A57] text-white text-xs font-bold px-5 py-2.5 rounded-xl"
        >
          Cetak / Save PDF
        </button>
      </div>

      {/* Konten Dokumen */}
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl p-12 shadow-sm print:shadow-none print:border-0">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#001A57]">SiapParkir</h2>
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
              Dinas Perhubungan Kota Palu
            </p>
          </div>

          <div className="text-right text-xs font-medium text-gray-500">
            <div className="font-bold text-gray-900">No. Ref: {refId}</div>
            <div>Dicetak: {waktuCetak}</div>
          </div>
        </div>

        <h1 className="text-center text-lg font-black uppercase underline underline-offset-4 mb-8">
          Dokumen Rekapitulasi Hasil Penindakan
        </h1>

        {/* Statistik */}
        <div className="grid grid-cols-3 gap-4 my-6 p-4 bg-gray-50 border rounded-xl">
          <div className="text-center border-r">
            <span className="text-[10px] block text-gray-400 font-bold">
              TOTAL BARIS DATA
            </span>
            <span className="text-lg font-black">{data.length} Laporan</span>
          </div>

          <div className="text-center border-r">
            <span className="text-[10px] block text-gray-400 font-bold">
              TOTAL DEREK
            </span>
            <span className="text-lg font-black text-[#001A57]">
              {totalDerek} Kendaraan
            </span>
          </div>

          <div className="text-center">
            <span className="text-[10px] block text-gray-400 font-bold">
              ESTIMASI PNBP
            </span>
            <span className="text-lg font-black text-emerald-600">
              Rp {(totalDerek * 250000).toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Tabel */}
        <table className="w-full text-left text-xs mt-6 border-collapse">
          <thead>
            <tr className="bg-gray-100 text-[10px] font-bold text-gray-600 uppercase">
              <th className="py-3 px-3">ID</th>
              <th className="py-3 px-3">Waktu</th>
              <th className="py-3 px-3">Plat</th>
              <th className="py-3 px-3">Pelanggaran</th>
              <th className="py-3 px-3">Tindakan</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-center">Bukti</th>
            </tr>
          </thead>

          <tbody className="divide-y text-gray-700">
            {data.map((item, idx) => (
              <tr key={idx} className="border-b break-inside-avoid">
                <td className="py-3 px-3 font-bold">{item.id}</td>
                <td className="py-3 px-3">{item.waktu}</td>
                <td className="py-3 px-3 font-mono font-bold">{item.nopol || '-'}</td>
                <td className="py-3 px-3">{item.kategori}</td>

                <td className="py-3 px-3">
                  <span className="bg-gray-100 px-2 py-1 rounded border">
                    {item.tindakan}
                  </span>
                </td>

                <td className="py-3 px-3 font-bold text-emerald-600">
                  {item.status}
                </td>

                <td className="py-3 px-3 text-center">
                  {item.foto_url ? (
                    <img
                      src={item.foto_url}
                      alt={`Bukti ${item.id}`}
                      className="w-20 h-20 object-cover rounded border mx-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 text-[10px] text-gray-400 leading-relaxed">
          Dokumen ini dicetak dari sistem SiapParkir berdasarkan data laporan penindakan yang tersedia pada saat proses ekspor dilakukan.
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import RingkasanPeserta from './components/RingkasanPeserta';
import FormPeserta from './components/FormPeserta';
import FilterPeserta from './components/FilterPeserta';
import DaftarPeserta from './components/DaftarPeserta';

// Data awal sesuai soal
const initialPeserta = [
  { id: 'm-1', nama: 'Ani', nim: '10121001', kelas: 'TI-2A', kehadiran: true },
  { id: 'm-2', nama: 'Budi', nim: '10121002', kelas: 'TI-2B', kehadiran: false },
  { id: 'm-3', nama: 'Citra', nim: '10121003', kelas: 'TI-2A', kehadiran: false },
];

function App() {
  // State Utama
  const [daftarPeserta, setDaftarPeserta] = useState(initialPeserta);
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [kelas, setKelas] = useState('');
  const [editId, setEditId] = useState(null); // null = mode tambah, string = mode edit
  const [cari, setCari] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua kelas');
  const [pesanError, setPesanError] = useState('');

  // 1. Simpan (Tambah / Edit) Peserta
  const handleSimpan = (e) => {
    e.preventDefault();

    const cleanNama = nama.trim();
    const cleanNim = nim.trim();

    // Validasi Nama
    if (cleanNama.length < 3) {
      setPesanError('Nama wajib diisi minimal 3 karakter.');
      return;
    }

    // Validasi NIM 8 Digit
    if (!/^\d{8}$/.test(cleanNim)) {
      setPesanError('NIM harus tepat 8 digit angka.');
      return;
    }

    // Validasi Pilihan Kelas
    if (!kelas || kelas === 'Pilih kelas') {
      setPesanError('Silakan pilih kelas yang valid (TI-2A atau TI-2B).');
      return;
    }

    // Validasi NIM Duplikat
    const isNimExist = daftarPeserta.some(
      (p) => p.nim === cleanNim && p.id !== editId
    );
    if (isNimExist) {
      setPesanError('NIM sudah digunakan oleh peserta lain.');
      return;
    }

    // Proses Tambah / Edit Data
    if (editId) {
      // Mode Edit
      setDaftarPeserta(
        daftarPeserta.map((p) =>
          p.id === editId ? { ...p, nama: cleanNama, nim: cleanNim, kelas } : p
        )
      );
      setEditId(null);
    } else {
      // Mode Tambah
      const newPeserta = {
        id: `m-${Date.now()}`,
        nama: cleanNama,
        nim: cleanNim,
        kelas,
        kehadiran: false, // Status awal selalu belum hadir
      };
      setDaftarPeserta([...daftarPeserta, newPeserta]);
    }

    // Reset Form & Error
    setNama('');
    setNim('');
    setKelas('');
    setPesanError('');
  };

  // 2. Aktifkan Mode Edit
  const handleEdit = (peserta) => {
    setEditId(peserta.id);
    setNama(peserta.nama);
    setNim(peserta.nim);
    setKelas(peserta.kelas);
    setPesanError('');
  };

  // 3. Batalkan Mode Edit
  const handleBatal = () => {
    setEditId(null);
    setNama('');
    setNim('');
    setKelas('');
    setPesanError('');
  };

  // 4. Hapus Peserta
  const handleHapus = (id) => {
    setDaftarPeserta(daftarPeserta.filter((p) => p.id !== id));
    if (editId === id) {
      handleBatal();
    }
  };

  // 5. Ubah Status Kehadiran
  const handleToggleHadir = (id) => {
    setDaftarPeserta(
      daftarPeserta.map((p) =>
        p.id === id ? { ...p, kehadiran: !p.kehadiran } : p
      )
    );
  };

  // Logika Filter & Pencarian
  const cleanCari = cari.trim().toLowerCase();
  const daftarTerlihat = daftarPeserta.filter((peserta) => {
    const matchCari =
      cleanCari === '' ||
      peserta.nama.toLowerCase().includes(cleanCari) ||
      peserta.nim.toLowerCase().includes(cleanCari);

    const matchKelas =
      filterKelas === 'Semua kelas' || peserta.kelas === filterKelas;

    return matchCari && matchKelas;
  });

  // Hitungan Ringkasan Data Utama
  const totalPeserta = daftarPeserta.length;
  const jumlahHadir = daftarPeserta.filter((p) => p.kehadiran).length;
  const jumlahBelumHadir = daftarPeserta.filter((p) => !p.kehadiran).length;
  const jumlahHasil = daftarTerlihat.length;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Manajemen Peserta Praktikum</h1>

      <RingkasanPeserta
        total={totalPeserta}
        hadir={jumlahHadir}
        belumHadir={jumlahBelumHadir}
        hasil={jumlahHasil}
      />

      <FormPeserta
        nama={nama}
        setNama={setNama}
        nim={nim}
        setNim={setNim}
        kelas={kelas}
        setKelas={setKelas}
        isEdit={!!editId}
        handleSimpan={handleSimpan}
        handleBatal={handleBatal}
        pesanError={pesanError}
      />

      <FilterPeserta
        cari={cari}
        setCari={setCari}
        filterKelas={filterKelas}
        setFilterKelas={setFilterKelas}
      />

      <DaftarPeserta
        daftarTerlihat={daftarTerlihat}
        totalDataUtama={totalPeserta}
        onEdit={handleEdit}
        onHapus={handleHapus}
        onToggleHadir={handleToggleHadir}
      />
    </div>
  );
}

export default App;
function RingkasanPeserta({ total, hadir, belumHadir, hasil }) {
  return (
    <section style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h2 style={{ marginTop: 0 }}>Ringkasan Peserta</h2>
      <p style={{ margin: 0 }}>
        Total Peserta: <strong>{total}</strong> | Hadir: <strong>{hadir}</strong> | Belum Hadir: <strong>{belumHadir}</strong> | Hasil Ditemukan: <strong>{hasil}</strong>
      </p>
    </section>
  );
}

export default RingkasanPeserta;
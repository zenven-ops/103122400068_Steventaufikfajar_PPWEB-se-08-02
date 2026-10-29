import ItemPeserta from './ItemPeserta';

function DaftarPeserta({ daftarTerlihat, totalDataUtama, onEdit, onHapus, onToggleHadir }) {
  return (
    <section style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h2 style={{ marginTop: 0 }}>Daftar Peserta</h2>

      {/* Penanganan Kondisi Kosong sesuai Aturan PDF */}
      {totalDataUtama === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#666' }}>Belum ada peserta</p>
      ) : daftarTerlihat.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#666' }}>Peserta tidak ditemukan</p>
      ) : (
        daftarTerlihat.map((peserta) => (
          <ItemPeserta
            key={peserta.id}
            peserta={peserta}
            onEdit={onEdit}
            onHapus={onHapus}
            onToggleHadir={onToggleHadir}
          />
        ))
      )}
    </section>
  );
}

export default DaftarPeserta;
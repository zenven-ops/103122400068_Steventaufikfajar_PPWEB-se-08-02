function ItemPeserta({ peserta, onEdit, onHapus, onToggleHadir }) {
  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <p style={{ margin: '0 0 4px 0' }}>
          <strong>{peserta.nama}</strong> ({peserta.nim}) - Kelas: {peserta.kelas}
        </p>
        <p style={{ margin: 0, fontSize: '0.9em', color: peserta.kehadiran ? 'green' : 'red' }}>
          Status: {peserta.kehadiran ? 'Hadir' : 'Belum hadir'}
        </p>
      </div>

      <div>
        <button onClick={() => onEdit(peserta)} style={{ marginRight: '6px', cursor: 'pointer' }}>
          Edit
        </button>
        <button onClick={() => onHapus(peserta.id)} style={{ marginRight: '6px', cursor: 'pointer' }}>
          Hapus
        </button>
        <button onClick={() => onToggleHadir(peserta.id)} style={{ cursor: 'pointer' }}>
          {peserta.kehadiran ? 'Batalkan hadir' : 'Tandai hadir'}
        </button>
      </div>
    </div>
  );
}

export default ItemPeserta;
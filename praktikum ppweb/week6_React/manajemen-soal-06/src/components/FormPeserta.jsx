function FormPeserta({ nama, setNama, nim, setNim, kelas, setKelas, isEdit, handleSimpan, handleBatal, pesanError }) {
  return (
    <section style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h2 style={{ marginTop: 0 }}>{isEdit ? 'Edit Peserta' : 'Form Peserta'}</h2>

      {pesanError && (
        <div style={{ padding: '8px', marginBottom: '12px', color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          {pesanError}
        </div>
      )}

      <form onSubmit={handleSimpan}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'inline-block', width: '60px' }}>Nama:</label>
          <input
            type="text"
            placeholder="Masukkan nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'inline-block', width: '60px' }}>NIM:</label>
          <input
            type="text"
            placeholder="Masukkan NIM (8 digit)"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'inline-block', width: '60px' }}>Kelas:</label>
          <select value={kelas} onChange={(e) => setKelas(e.target.value)}>
            <option value="">Pilih kelas</option>
            <option value="TI-2A">TI-2A</option>
            <option value="TI-2B">TI-2B</option>
          </select>
        </div>

        <button type="submit" style={{ marginRight: '8px', cursor: 'pointer' }}>
          {isEdit ? 'Simpan perubahan' : 'Tambah peserta'}
        </button>

        {isEdit && (
          <button type="button" onClick={handleBatal} style={{ cursor: 'pointer' }}>
            Batal
          </button>
        )}
      </form>
    </section>
  );
}

export default FormPeserta;
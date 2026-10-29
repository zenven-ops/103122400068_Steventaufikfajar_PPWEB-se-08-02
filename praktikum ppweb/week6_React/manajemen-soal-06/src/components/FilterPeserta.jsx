function FilterPeserta({ cari, setCari, filterKelas, setFilterKelas }) {
  return (
    <section style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <h2 style={{ marginTop: 0 }}>Pencarian & Filter</h2>
      <input
        type="text"
        placeholder="Cari nama atau NIM..."
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        style={{ padding: '4px 8px', marginRight: '10px' }}
      />
      <select value={filterKelas} onChange={(e) => setFilterKelas(e.target.value)} style={{ padding: '4px 8px' }}>
        <option value="Semua kelas">Semua kelas</option>
        <option value="TI-2A">TI-2A</option>
        <option value="TI-2B">TI-2B</option>
      </select>
    </section>
  );
}

export default FilterPeserta;
const { useState, useEffect } = React;

function App() {
    const [skenario, setSkenario] = useState("berhasil");
    const [users, setUsers] = useState([]);
    const [loadingGet, setLoadingGet] = useState(false);
    const [errorGet, setErrorGet] = useState("");

    const [inputNama, setInputNama] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [loadingPost, setLoadingPost] = useState(false);
    const [hasilPost, setHasilPost] = useState(null);
    const [errorPost, setErrorPost] = useState("");

    const fetchData = (skenarioAktif, signal) => {
        setLoadingGet(true);
        setErrorGet("");
        setUsers([]);

        let config = { signal: signal };

        if (skenarioAktif === "berhasil") {
            config.url = "/api/users?delay=1000";
            config.timeout = 5000;
        } else if (skenarioAktif === "kosong") {
            config.url = "/api/users?mode=empty&delay=1000";
            config.timeout = 5000;
        } else if (skenarioAktif === "error") {
            config.url = "/api/users?mode=error&delay=1000";
            config.timeout = 5000;
        } else if (skenarioAktif === "timeout") {
            config.url = "/api/users?delay=2500";
            config.timeout = 700;
        }

        axios.get(config.url, { timeout: config.timeout, signal: config.signal })
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    return;
                }
                if (err.code === "ECONNABORTED") {
                    setErrorGet("Request Timeout! Server tidak merespons dalam batas waktu " + config.timeout + " ms.");
                } else if (err.response) {
                    setErrorGet("HTTP Error " + err.response.status + ": Gagal memuat data dari server.");
                } else {
                    setErrorGet("Gagal memuat data: " + err.message);
                }
            })
            .finally(() => {
                setLoadingGet(false);
            });
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchData(skenario, controller.signal);

        return () => {
            controller.abort();
        };
    }, [skenario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorPost("");
        setHasilPost(null);

        if (!inputNama.trim()) {
            setErrorPost("Nama tidak boleh kosong atau hanya berisi spasi.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputEmail)) {
            setErrorPost("Format email tidak valid. Contoh: rina@example.com");
            return;
        }

        setLoadingPost(true);
        const dataKirim = { name: inputNama, email: inputEmail };

        axios.post("/api/users", dataKirim)
            .then(res => {
                setHasilPost({
                    status: res.status,
                    data: res.data
                });
                setInputNama("");
                setInputEmail("");
            })
            .catch(err => {
                setErrorPost("Pengiriman gagal: " + err.message);
            })
            .finally(() => {
                setLoadingPost(false);
            });
    };

    return (
        <div>
            <h1>Aplikasi Registrasi Peserta (React & Axios)</h1>

            <div className="box">
                <h2>1. Daftar Peserta</h2>
                
                <label>Pilih Skenario Uji GET: </label>
                <select value={skenario} onChange={(e) => setSkenario(e.target.value)}>
                    <option value="berhasil">Berhasil (/api/users?delay=1000)</option>
                    <option value="kosong">Data Kosong (/api/users?mode=empty)</option>
                    <option value="error">Error HTTP (/api/users?mode=error)</option>
                    <option value="timeout">Timeout (Delay 2500ms, Limit 700ms)</option>
                </select>
                
                <button 
                    onClick={() => fetchData(skenario, (new AbortController()).signal)} 
                    disabled={loadingGet} 
                    style={{ marginLeft: '10px' }}
                >
                    Muat Ulang
                </button>

                <div style={{ marginTop: '15px' }}>
                    {loadingGet && <p className="loading">Sedang mengambil data peserta...</p>}
                    {errorGet && <p className="error">{errorGet}</p>}
                    
                    {!loadingGet && !errorGet && users.length === 0 && (
                        <p>Data peserta kosong.</p>
                    )}

                    {!loadingGet && !errorGet && users.length > 0 && (
                        <ul>
                            {users.map(user => (
                                <li key={user.id}>
                                    <strong>{user.name}</strong> - {user.email}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="box">
                <h2>2. Formulir Pendaftaran Peserta Baru</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nama Peserta:</label><br />
                        <input 
                            type="text" 
                            value={inputNama} 
                            onChange={(e) => setInputNama(e.target.value)}
                            placeholder="Contoh: Rina Praktikan" 
                        />
                    </div>
                    <br />
                    <div>
                        <label>Email Peserta:</label><br />
                        <input 
                            type="email" 
                            value={inputEmail} 
                            onChange={(e) => setInputEmail(e.target.value)}
                            placeholder="Contoh: rina@example.com" 
                        />
                    </div>
                    <br />
                    <button type="submit" disabled={loadingPost}>
                        {loadingPost ? "Mengirim..." : "Kirim Pendaftaran"}
                    </button>
                </form>

                {errorPost && <p className="error" style={{ marginTop: '10px' }}>{errorPost}</p>}

                {hasilPost && (
                    <div className="response-box">
                        <p className="success">Simulasi berhasil, data tidak disimpan.</p>
                        <p><strong>HTTP Status:</strong> {hasilPost.status}</p>
                        <p><strong>ID Baru:</strong> {hasilPost.data.id}</p>
                        <p><strong>Nama:</strong> {hasilPost.data.name}</p>
                        <p><strong>Email:</strong> {hasilPost.data.email}</p>
                        <p><strong>Simulated:</strong> {hasilPost.data.simulated ? "true" : "false"}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
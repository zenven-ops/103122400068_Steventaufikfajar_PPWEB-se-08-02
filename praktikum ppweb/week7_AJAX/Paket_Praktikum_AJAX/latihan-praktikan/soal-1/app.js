const waktuAwalSpan = document.getElementById("waktu-awal");
const waktuSekarang = new Date().toLocaleTimeString("id-ID");
waktuAwalSpan.textContent = waktuSekarang;

let totalHitungan = 0;
const btnHitung = document.getElementById("btn-hitung");
const angkaHitunganSpan = document.getElementById("angka-hitungan");

btnHitung.addEventListener("click", function() {
    totalHitungan += 1;
    angkaHitunganSpan.textContent = totalHitungan;
});

const btnPengumuman = document.getElementById("btn-pengumuman");
const isiPengumumanPre = document.getElementById("isi-pengumuman");
const statusXhrDiv = document.getElementById("status-xhr");

btnPengumuman.addEventListener("click", function() {
    btnPengumuman.disabled = true;
    statusXhrDiv.className = "loading";
    statusXhrDiv.textContent = "Memuat pengumuman via XHR...";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "pengumuman.txt", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            btnPengumuman.disabled = false;
            
            if (xhr.status === 200) {
                statusXhrDiv.textContent = "";
                isiPengumumanPre.textContent = xhr.responseText;
            } else if (xhr.status === 404) {
                statusXhrDiv.className = "error";
                statusXhrDiv.textContent = "Gagal memuat pengumuman: Berkas pengumuman.txt tidak ditemukan (Error 404).";
            } else {
                statusXhrDiv.className = "error";
                statusXhrDiv.textContent = "Gagal memuat pengumuman. Status HTTP: " + xhr.status;
            }
        }
    };

    xhr.onerror = function() {
        btnPengumuman.disabled = false;
        statusXhrDiv.className = "error";
        statusXhrDiv.textContent = "Gangguan jaringan saat memuat pengumuman.";
    };

    xhr.send();
});

const btnPeserta = document.getElementById("btn-peserta");
const sumberApiSelect = document.getElementById("sumber-api");
const statusFetchDiv = document.getElementById("status-fetch");
const infoDirektoriDiv = document.getElementById("info-direktori");
const daftarPesertaUl = document.getElementById("daftar-peserta");

btnPeserta.addEventListener("click", async function() {
    const pilihan = sumberApiSelect.value;
    let url = "";
    let namaSumber = "";

    if (pilihan === "mock") {
        url = "/api/users?delay=1500";
        namaSumber = "Mock Lokal";
    } else {
        url = "https://jsonplaceholder.typicode.com/users";
        namaSumber = "JSONPlaceholder";
    }

    btnPeserta.disabled = true;
    statusFetchDiv.className = "loading";
    statusFetchDiv.textContent = "Sedang mengambil data peserta...";
    infoDirektoriDiv.textContent = "";
    daftarPesertaUl.innerHTML = "";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP Status Error: " + response.status);
        }

        const data = await response.json();
        const maksimalTiga = data.slice(0, 3);

        infoDirektoriDiv.innerHTML = `<strong>Sumber:</strong> ${namaSumber} | <strong>Jumlah Data Ditampilkan:</strong> ${maksimalTiga.length}`;

        maksimalTiga.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} (${user.email})`;
            daftarPesertaUl.appendChild(li);
        });

        statusFetchDiv.textContent = "";

    } catch (err) {
        statusFetchDiv.className = "error";
        if (pilihan === "external") {
            statusFetchDiv.textContent = "Gagal mengambil data dari API Eksternal. Periksa koneksi internet Anda atau pilih sumber Mock Lokal.";
        } else {
            statusFetchDiv.textContent = "Gagal mengambil data: " + err.message;
        }
    } finally {
        btnPeserta.disabled = false;
    }
});
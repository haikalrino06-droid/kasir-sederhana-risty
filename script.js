// ----- DATA UTAMA -----
let daftarBelanja = [];

// ----- 1. MENAMBAH ITEM -----
function tambahBarang() {
  let nama = document.getElementById("nama").value.trim();
  let harga = parseFloat(document.getElementById("harga").value);
  let jumlah = parseInt(document.getElementById("jumlah").value);

  if (!nama || isNaN(harga) || isNaN(jumlah) || harga <= 0 || jumlah <= 0) {
    alert("Pastikan semua input terisi dengan benar.");
    return;
  }

  // Tambah item ke array
  daftarBelanja.push({
    nama,
    harga,
    jumlah,
    total: harga * jumlah,
  });

  renderTabel();
  updateSummary();
  clearInput();
}

// ----- 2. MEMBERSIHKAN INPUT -----
function clearInput() {
  document.getElementById("nama").value = "";
  document.getElementById("harga").value = "";
  document.getElementById("jumlah").value = "";
}

// ----- 3. TAMPILKAN KE TABEL -----
function renderTabel() {
  let tbody = document.querySelector("#tabel tbody");
  tbody.innerHTML = "";

  daftarBelanja.forEach((item, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.nama}</td>
            <td>${item.harga}</td>
            <td>${item.jumlah}</td>
            <td>${item.total}</td>
            <td>
                <button class="delete-btn" onclick="hapusItem(${index})">Hapus</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

// ----- 4. MENGHAPUS ITEM TERTENTU -----
function hapusItem(index) {
  daftarBelanja.splice(index, 1);
  renderTabel();
  updateSummary();
}

// ----- 5. MERESSET SEMUA BELANJA -----
function resetBelanja() {
  if (confirm("Yakin ingin menghapus semua daftar belanja?")) {
    daftarBelanja = [];
    renderTabel();
    updateSummary();
    document.getElementById("struk").style.display = "none";
  }
}

// ----- 6. HITUNG TOTAL BELANJA -----
function hitungTotalBelanja() {
  return daftarBelanja.reduce((sum, item) => sum + item.total, 0);
}

// ----- 7. LOGIKA DISKON, PPN, TOTAL AKHIR -----
function updateSummary() {
  let total = hitungTotalBelanja();
  let diskon = parseFloat(document.getElementById("diskon").value) || 0;

  let potonganDiskon = (total * diskon) / 100;
  let setelahDiskon = total - potonganDiskon;

  let pajak = setelahDiskon * 0.11; // PPN 11%
  let totalAkhir = setelahDiskon + pajak;

  // Tampilkan
  document.getElementById("totalHarga").innerText = total.toFixed(2);
  document.getElementById("pajak").innerText = pajak.toFixed(2);
  document.getElementById("totalAkhir").innerText = totalAkhir.toFixed(2);
}

// ----- 8. MEMBUAT STRUK -----
function buatStruk() {
  if (daftarBelanja.length === 0) {
    alert("Belum ada item dalam daftar belanja!");
    return;
  }

  let total = hitungTotalBelanja();
  let diskon = parseFloat(document.getElementById("diskon").value) || 0;

  let potonganDiskon = (total * diskon) / 100;
  let setelahDiskon = total - potonganDiskon;
  let pajak = setelahDiskon * 0.11;
  let totalAkhir = setelahDiskon + pajak;

  let waktu = new Date().toLocaleString("id-ID");

  let strukHTML = `<h3>STRUK BELANJA</h3>`;
  strukHTML += `<small>Waktu Transaksi: ${waktu}</small><hr>`;

  daftarBelanja.forEach((item) => {
    strukHTML += `${item.nama} (${item.jumlah} × ${item.harga}) = ${item.total}<br>`;
  });

  strukHTML += `
        <hr>
        Total Belanja: ${total.toFixed(2)}<br>
        Diskon: ${diskon}%<br>
        PPN 11%: ${pajak.toFixed(2)}<br>
        <b>Total Akhir: ${totalAkhir.toFixed(2)}</b>
    `;

  let struk = document.getElementById("struk");
  struk.innerHTML = strukHTML;
  struk.style.display = "block";
}

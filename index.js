const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let kontak = [];
let operasiStack = [];
let operasiQueue = [];

function tambahKontak(nama, nomorTelepon) {
  kontak.push({ nama, nomorTelepon });
}

function hapusKontak(nama) {
  kontak = kontak.filter(contact => contact.nama !== nama);
}

function cariKontak(nama) {
  for (let i = 0; i < kontak.length; i++) {
    if (kontak[i].nama.toLowerCase() === nama.toLowerCase()) {
      return kontak[i];
    }
  }
  return null;
}

function bubbleSort() {
  for (let i = 0; i < kontak.length; i++) {
    for (let j = 0; j < kontak.length - 1 - i; j++) {
      if (kontak[j].nama.localeCompare(kontak[j + 1].nama) > 0) {
        // Swap
        const temp = kontak[j];
        kontak[j] = kontak[j + 1];
        kontak[j + 1] = temp;
      }
    }
  }
}

function tambahOperasiStack(operation) {
  operasiStack.push(operation);
}

function prosesOperasiQueue() {
  while (operasiQueue.length > 0) {
    const operation = operasiQueue.shift();
    console.log(`Processing operation: ${operation}`);
  }
}

rl.on('Tutup', () => {
  console.log("Exiting");
});

function menu() {
  console.log("\nMenu Manajemen Kontak:");
  console.log("1. Tambah Kontak");
  console.log("2. Hapus Kontak");
  console.log("3. Cari Kontak Berdasarkan Nama");
  console.log("4. Tampilkan Daftar Kontak");
  console.log("5. Urutkan Daftar Kontak");
  console.log("6. Proses Antrian Operasi");
  console.log("7. Lihat Operasi yang Dilakukan");
  console.log("8. Keluar");

  rl.question("Pilih menu: ", (pilihan) => {
    switch (pilihan) {
      case '1':
        rl.question("Masukkan nama kontak: ", (nama) => {
          rl.question("Masukkan nomor telepon: ", (nomorTelepon) => {
            tambahKontak(nama, nomorTelepon);
            tambahOperasiStack(`Tambah kontak: ${nama}, ${nomorTelepon}`);
            console.log("Kontak berhasil ditambahkan.");
            menu();
          });
        });
        break;
      case '2':
        rl.question("Masukkan nama kontak yang ingin dihapus: ", (nama) => {
          hapusKontak(nama);
          tambahOperasiStack(`Hapus kontak: ${nama}`);
          console.log("Kontak berhasil dihapus.");
          menu();
        });
        break;
      case '3':
        rl.question("Masukkan nama kontak yang ingin dicari: ", (nama) => {
          const foundContact = cariKontak(nama);
          if (foundContact) {
            console.log("Kontak ditemukan:");
            console.log(`Nama: ${foundContact.nama}, Nomor Telepon: ${foundContact.nomorTelepon}`);
          } else {
            console.log("Kontak tidak ditemukan.");
          }
          menu();
        });
        break;
        case '4':
          console.log("Daftar Kontak:");
          kontak.forEach(contact => {
            console.log(`Nama: ${contact.nama}, Nomor Telepon: ${contact.nomorTelepon}`);
          });
          menu();
          break;
        case '5':
          bubbleSort();
          tambahOperasiStack("Urutkan daftar kontak menggunakan Bubble Sort");
          console.log("Daftar kontak berhasil diurutkan.");
          menu();
          break;
        case '6':
          console.log("Memproses antrian operasi...");
          prosesOperasiQueue();
          menu();
          break;
      case '7':
        console.log("Operasi yang telah dilakukan:");
        operasiStack.forEach((operation, index) => {
          console.log(`${index + 1}. ${operation}`);
        });
        menu();
        break;
      case '8':
        console.log("Terima kasih telah menggunakan program ini.");
        rl.close();
        break;
      default:
        console.log("Pilihan anda tidak tersedia.");
        menu();
    }
  });
}

menu();

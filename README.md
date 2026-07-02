<div align="center">

# 🌱 Tabulampot

**Aplikasi Monitoring dan Manajemen Perawatan Tanaman Buah dalam Pot**

![SvelteKit](https://img.shields.io/badge/Frontend-SvelteKit-FF3E00?style=flat-square)
![Express](https://img.shields.io/badge/Backend-Express.js-000000?style=flat-square)
![Drizzle](https://img.shields.io/badge/ORM-Drizzle-C5F74F?style=flat-square)
![MariaDB](https://img.shields.io/badge/Database-MariaDB-003545?style=flat-square)
![TypeScript](https://img.shields.io/badge/Lang-TypeScript-3178C6?style=flat-square)

</div>

---

## 📖 Deskripsi

Pemilik tabulampot sering lupa jadwal penyiraman, terlambat memupuk, dan tidak punya catatan riwayat perawatan tanaman — akibatnya pertumbuhan tanaman kurang optimal.

**Tabulampot** membantu mencatat aktivitas perawatan tanaman secara digital dan menghitung jadwal perawatan berikutnya secara otomatis, berdasarkan jenis tanaman dan riwayat aktivitas terakhir.

> 📅 Fitur kalender perawatan visual bersifat **opsional**, akan ditambahkan menyesuaikan progress.

---

## 👥 Anggota Kelompok

| Nama | Peran | Tugas |
|---|---|---|
| Andreas Fiki Darmawan| Frontend | UI/UX, komponen SvelteKit, integrasi API |
| Panji Cahya prasetyo| Backend | REST API, database, autentikasi (JWT & bcrypt) |

---

## 🗂️ Struktur Repository

```
Tabulampot/
├── frontend/     → SvelteKit (lihat frontend/README.md)
├── backend/      → Express.js + Drizzle ORM (lihat backend/README.md)
└── README.md     → dokumen ini
```

---

## 🗃️ Skema Database

```
users
  │
  └── plants
        │
        ├── plant_types    (referensi jenis & interval perawatan)
        └── activity_logs  (riwayat penyiraman & pemupukan)
```

| Tabel | Deskripsi |
|---|---|
| `users` | Data akun pengguna |
| `plant_types` | Master jenis tanaman & interval penyiraman/pemupukan |
| `plants` | Tanaman milik pengguna |
| `activity_logs` | Riwayat aktivitas per tanaman — dibedakan lewat kolom `activity_type` (`watering` / `fertilizing`) |

<!-- 🔧 PLACEHOLDER: tempel diagram ERD atau detail kolom tiap tabel di sini setelah skema final -->

---

## 🔌 Dokumentasi API

| Method | Endpoint | Payload Body | Format Respons |
|---|---|---|---|
| `POST` | `/register` | `TODO` | `TODO` |
| `POST` | `/login` | `TODO` | `TODO` |
| `GET` | `/dashboard` | – | `TODO` |
| `GET` | `/plant-types` | – | `TODO` |
| `GET` | `/plants` | – | `TODO` |
| `POST` | `/plants` | `TODO` | `TODO` |
| `PUT` | `/plants/:id` | `TODO` | `TODO` |
| `DELETE` | `/plants/:id` | – | `TODO` |
| `POST` | `/plants/:id/water` | `TODO` | `TODO` |
| `POST` | `/plants/:id/fertilize` | `TODO` | `TODO` |
| `GET` | `/plants/:id/history` | – | `TODO` |

<!-- 🔧 PLACEHOLDER: isi kolom Payload Body & Format Respons begitu endpoint backend selesai diimplementasi -->

---

## ▶️ Cara Menjalankan Secara Lokal

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Backend**
```bash
cd backend
npm install
npm run dev
```

Salin `.env.example` menjadi `.env` di masing-masing folder sebelum menjalankan.

<!-- 🔧 PLACEHOLDER: tambahkan environment variable yang dibutuhkan setelah backend selesai -->

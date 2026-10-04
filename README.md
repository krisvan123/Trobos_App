# Trobos — Layanan Evakuasi & Penyelamatan Mobil Mogok

> **“Mobil mogok? Tenang. Kami bantu evakuasi mobil dan mengantarkan Anda ke tujuan.”**  
> Solusi penanganan darurat terpadu: mobil mogok diderek aman ke bengkel rekanan, dan seluruh rombongan penumpang langsung diantar ke tujuan dengan armada pengganti yang disesuaikan.

---

## 🚗 Masalah & Solusi

### Masalah
Mobil pelanggan tiba-tiba mogok di jalan raya atau tidak aman untuk melanjutkan perjalanan. Pelanggan memiliki **dua kebutuhan mendesak sekaligus**:
1. **Orang / Penumpang**: Harus segera sampai ke tempat tujuan (kantor, rumah, bandara, acara penting).
2. **Mobil Mogok**: Harus dievakuasi/diderek dengan aman ke bengkel rekanan terpercaya atau lokasi pilihan.

### Solusi Trobos: Penyelamatan Terpadu Simultan
Trobos mengerahkan unit rescue dalam satu panggilan:
1. **Truk Towing Gendong Flatbed**: Operator bersertifikasi menderek mobil mogok ke bengkel rekanan resmi (Honda, Toyota, Astra Otoservice).
2. **Armada Pengganti Dinamis**: Kendaraan pengganti disesuaikan secara otomatis berdasarkan jumlah penumpang:
   - **1 Orang**: Motor Eksekutif gesit (*Yamaha NMAX*)
   - **2 Orang**: Mobil Pengganti Sedan/Hatchback (*Toyota Vios*)
   - **3–4 Orang**: Mobil Pengganti MPV Nyaman (*Toyota Innova Zenix*)
   - **>4 Orang**: Van Rombongan (*Toyota HiAce Premio*)
3. **Evakuasi Serentak**: Penumpang tiba tepat waktu di tujuan, mobil ditangani mekanik ahli di bengkel.

---

## ⚡ Prinsip Desain Produk: "Clarity, Speed, and Trust"

- **Tenang & Bersih**: Latar belakang putih/abu-abu netral (`#F8FAFC`), tipografi tegas gelap (`#0B0F19`), dan satu warna aksen oranye vermilion fungsional (`#FF4D00`).
- **Bebas Emoji**: 100% menggunakan ikon Lucide vektor berstandar industri aplikasi mobilitas modern.
- **Rekomendasi Armada Dinamis**: UI interaktif menghitung jumlah orang di mobil dan menyajikan kapasitas serta alasan pemilihan kendaraan pengganti.
- **Dual GPS Live Tracking**: Pemantauan real-time dua arah independen: posisi rombongan penumpang vs posisi truk derek mobil.
- **Keamanan Komprehensif**: Asuransi all-risk hingga Rp 1 Miliar, verifikasi PIN 4-digit, checklist inspeksi bodi 5 sudut sebelum derek, dan kemitraan bengkel resmi.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Machine**: Zustand 5 dengan persistensi lokal (`localStorage`)
- **Cartography**: Jakarta Sudirman–SCBD Interactive Vector Map

---

## 📱 Alur Pengguna (Breakdown Rescue Flow)

```
[Mobil Mogok di Jalan] 
   ↓ (Tekan "MINTA BANTUAN")
[Pilih Kendala Mobil & Masukkan Jumlah Penumpang] 
   ↓ (Sistem tentukan armada pengganti dinamis & bengkel rekanan)
[Radar Pencarian Unit Rescue] 
   ↓ (Truk Towing & Armada Pengantar Ditugaskan)
[Unit Tiba di Lokasi & Verifikasi PIN 4-Digit] 
   ↓ (Inspeksi Fisik Bodi Mobil & Naik Flatbed)
[Evakuasi Berjalan Simultan (Dual Tracking)] 
   ↓ (Penumpang ke Tujuan • Mobil ke Bengkel)
[Selesai & Rating Layanan]
```

---

## 💻 Menjalankan Secara Lokal

```bash
# 1. Clone repository
git clone https://github.com/krisvan123/Trobos_App.git
cd Trobos_App

# 2. Install dependensi
npm install

# 3. Jalankan development server
npm run dev

# 4. Build produksi
npm run build
npm run start
```

---

## 🌐 Status & Panduan Deployment (Vercel)

Semua kode terbaru telah di-*push* ke branch `main` di [https://github.com/krisvan123/Trobos_App](https://github.com/krisvan123/Trobos_App).

### Jika Repository Sudah Terhubung ke Vercel:
Vercel secara otomatis mendeteksi setiap commit baru di branch `main` dan menjalankan build produksi secara instan. Anda dapat memantau statusnya di dashboard project Vercel Anda.

### Jika Belum Dihubungkan ke Vercel:
1. Buka [https://vercel.com/new](https://vercel.com/new).
2. Login dengan akun GitHub Anda.
3. Impor repositori **`krisvan123/Trobos_App`**.
4. Framework Preset akan otomatis terdeteksi sebagai **Next.js**.
5. Klik tombol **Deploy** (proses build membutuhkan waktu ~1 menit).

---

© 2026 Trobos Rescue Indonesia. All rights reserved.

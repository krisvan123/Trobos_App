# Trobos — Emergency Mobility Service

> **“Trobos. Terobos Macet, Selamatkan Waktu.”**  
> Solusi evakuasi mobilitas darurat pertama dengan sistem **Tandem** untuk pengendara mobil yang terjebak kemacetan parah di Jakarta.

---

## 🚗 Masalah & Solusi

### Masalah
Pengguna terjebak kemacetan total dan sedang mengejar waktu penting (penerbangan, rapat direksi, ujian, situasi genting), namun **tidak dapat meninggalkan mobilnya begitu saja di tengah jalan**.

### Solusi Trobos: Sistem Tandem
Trobos mengerahkan satu unit **Tandem** yang terdiri dari:
1. **1 Rider Motor**: Membawa Anda menembus kemacetan menuju tujuan dengan cepat.
2. **1 Driver Mobil**: Mengambil alih kemudi mobil Anda dan membawanya menyusul ke tujuan dengan aman.
3. **Reuni di Tujuan**: Anda tiba tepat waktu, dan mobil Anda terparkir aman di lokasi yang sama.

---

## ⚡ Prinsip Desain: "Less UI, More Clarity"

Aplikasi dirancang dengan filosofi produk konsumen mobilitas modern (Apple Maps, Gojek, Grab, Wise):
- **Tenang & Jelas**: Latar belakang putih/terang (*light neutral*), tipografi gelap berjenjang tegas, dan satu aksen oranye darurat yang unmissable.
- **2-3 Ketukan Saja**: Pengguna dalam kondisi panik/terburu-buru dapat langsung menekan **TROBOS SEKARANG** tanpa formulir berbelit-belit.
- **Transparansi Ganda**: Pelacakan GPS real-time menampilkan posisi Anda (Motor) vs. Mobil Anda (Driver) secara independen.
- **Keamanan Terjamin**: Asuransi all-risk hingga Rp 1 Miliar, verifikasi Driver SIM A & SKCK, verifikasi kode PIN 4-digit, dan dokumentasi serah terima 5 titik fisik mobil.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Library**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Animasi & Interaksi**: Framer Motion
- **State Machine**: Zustand dengan persistensi lokal (`localStorage`)
- **Cartography Engine**: Jakarta Vector Interactive Map (Sudirman–SCBD corridor)

---

## 📱 Alur Pengguna (User Flow)

```
[Layar Utama] 
   ↓ (Tekan "TROBOS SEKARANG")
[Konfirmasi Lokasi & Pilihan Tujuan] 
   ↓ (Konfirmasi Trobos)
[Pencarian Radar Tandem] 
   ↓ (Unit Ditemukan)
[Tandem Menuju Lokasi & Kode PIN Serah Terima] 
   ↓ (Verifikasi Kode & Checklist 5 Titik Mobil)
[Perjalanan Dimulai - Dual Tracking: Motor vs Mobil] 
   ↓ (Anda Tiba & Mobil Menyusul)
[Reuni di Tujuan & Rating Layanan]
```

---

## 💻 Cara Menjalankan Secara Lokal

### 1. Clone Repository
```bash
git clone https://github.com/krisvan123/Trobos_App.git
cd Trobos_App
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 4. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 🌐 Panduan Deployment Produksi (Vercel)

Aplikasi ini 100% siap di-deploy langsung dari repository GitHub:

1. Buka [Vercel Dashboard](https://vercel.com).
2. Klik **Add New Project** → **Import Git Repository**.
3. Pilih repository `krisvan123/Trobos_App`.
4. Framework Preset: **Next.js** (otomatis terdeteksi).
5. Klik **Deploy**.

### Environment Variables (Opsional untuk integrasi pihak ketiga)
Jika nantinya dihubungkan dengan API eksternal:
```env
# Mapbox / Google Maps (Opsional - saat ini menggunakan engine vektor bawaan)
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here

# Backend Database (Supabase / Firebase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment Gateway (Midtrans / Xendit)
NEXT_PUBLIC_PAYMENT_CLIENT_KEY=your_client_key
```

---

## 📄 Struktur Rute Halaman

| Rute | Deskripsi |
| :--- | :--- |
| `/` | Landing page komersial & diagram visual konsep Tandem |
| `/app` | Layar utama evakuasi darurat, peta interaktif, & booking flow |
| `/app/trips` | Riwayat perjalanan & struk transaksi |
| `/app/vehicles` | Kelola mobil terdaftar & verifikasi STNK digital |
| `/app/safety` | Pusat keamanan, polis asuransi Rp 1 Miliar & tombol SOS |
| `/app/notifications` | Log notifikasi perjalanan & proteksi |
| `/app/help` | FAQ accordion & kontak darurat WhatsApp / Call Center 24 Jam |
| `/app/profile` | Informasi akun & pengaturan |
| `/driver` | Mode mitra pengemudi (Online/Offline & penerimaan order darurat) |
| `/login` | Masuk akun |
| `/register` | Pendaftaran akun & 3-step onboarding singkat |
| `/forgot-password` | Pemulihan password |

---

## 🎯 Mode Presentasi & Simulasi (Demo Controller)
Pada layar aplikasi (`/app`), terdapat widget mengambang **Mode Simulasi** di sudut kanan bawah. Anda dapat:
- Menjalankan simulasi otomatis seluruh alur dari penjemputan hingga reuni (*Simulate Trobos*).
- Melompat langsung ke status mana pun (Pencarian, Handover, Dual Journey, Selesai) untuk demonstrasi kepada audiens atau investor.

---

© 2026 Trobos Mobility Indonesia. All rights reserved.

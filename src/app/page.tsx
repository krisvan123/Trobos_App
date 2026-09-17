"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Bike,
  Car,
  Clock,
  ArrowRight,
  CheckCircle,
  MapPin,
  ChevronRight,
  Shield,
  PhoneCall,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#FF4D00] flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">
                TROBOS
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">
                DARURAT
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 transition"
            >
              Masuk
            </Link>
            <Link
              href="/app"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#E64400] text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95 flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buka Aplikasi</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-12 pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF4D00] text-xs font-bold uppercase tracking-wide">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Solusi Penyelamat Kemacetan Darurat</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Terjebak Macet? <br />
            <span className="text-[#FF4D00]">Trobos Sekarang.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
            Layanan evakuasi darurat yang membawa Anda menembus macet dengan motor, sementara mobil Anda tetap dikemudikan driver profesional dengan aman menuju tujuan.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <Link
              href="/app"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FF4D00] hover:bg-[#E64400] text-white font-black text-base shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>TROBOS SEKARANG</span>
            </Link>

            <a
              href="#cara-kerja"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-1.5 transition"
            >
              <span>Cara Kerja</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-center lg:justify-start gap-8 text-xs text-slate-500">
            <div>
              <div className="text-xl font-black text-slate-900">~3 Menit</div>
              <div>Respon Tiba</div>
            </div>
            <div>
              <div className="text-xl font-black text-emerald-600">100%</div>
              <div>Driver SIM A & SKCK</div>
            </div>
            <div>
              <div className="text-xl font-black text-blue-600">Rp 1 Miliar</div>
              <div>Asuransi All-Risk</div>
            </div>
          </div>
        </div>

        {/* HERO VISUAL: TANDEM CONCEPT DIAGRAM (Clean, Simple, Clear) */}
        <div className="flex-1 w-full max-w-md">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 shadow-sm space-y-3.5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Bagaimana Sistem Tandem Bekerja
            </div>

            {/* Step 1: User Stuck */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-red-600 uppercase">Kondisi Anda</div>
                <div className="text-sm font-bold text-slate-900">Mobil Terjebak Macet Total</div>
                <div className="text-xs text-slate-500">Mengejar waktu rapat atau pesawat</div>
              </div>
              <span className="text-2xl">🛑</span>
            </div>

            {/* Step 2: Tandem Dispatched */}
            <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#FF4D00] uppercase">1 Unit Tandem Datang</div>
                <div className="text-sm font-bold text-slate-900">1 Rider Motor + 1 Driver Mobil</div>
                <div className="text-xs text-slate-600">Datang bersamaan ke titik macet Anda</div>
              </div>
              <div className="flex gap-1 text-xl">
                <span>🏍️</span>
                <span>🚗</span>
              </div>
            </div>

            {/* Step 3: Dual Separation */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100">
                <div className="text-[10px] font-bold text-sky-700 uppercase">Anda & Rider</div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">Menembus Macet</div>
                <div className="text-[11px] text-sky-600 mt-1">Cepat tiba di tujuan (~18 mnt)</div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                <div className="text-[10px] font-bold text-amber-700 uppercase">Mobil & Driver</div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">Menyusul Aman</div>
                <div className="text-[11px] text-amber-700 mt-1">Mengemudi tertib & berasuransi</div>
              </div>
            </div>

            {/* Step 4: Reunion */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-emerald-700 uppercase">Hasil Akhir</div>
                <div className="text-sm font-bold text-slate-900">Reuni Sukses di Tujuan</div>
                <div className="text-xs text-slate-600">Waktu terselamatkan, mobil kembali aman</div>
              </div>
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section id="cara-kerja" className="py-16 px-4 sm:px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <div className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider">
              Solusi Efisien
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Cara Kerja Trobos
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Empat langkah mudah untuk keluar dari kemacetan tanpa meninggalkan mobil Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="text-2xl font-black text-slate-300">01</span>
              <h3 className="text-base font-bold text-slate-900">Request</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                “Tekan Trobos dan kirim lokasi.” Konfirmasi titik macet Anda dan tujuan hanya dalam 2 ketukan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="text-2xl font-black text-slate-300">02</span>
              <h3 className="text-base font-bold text-slate-900">Tandem Arrives</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                “Rider dan driver datang bersama.” Tunjukkan kode PIN 4-digit untuk serah terima kunci mobil.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="text-2xl font-black text-slate-300">03</span>
              <h3 className="text-base font-bold text-slate-900">You Go</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                “Rider membawa Anda menembus macet.” Tiba di rapat, ujian, atau penerbangan tepat waktu.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="text-2xl font-black text-slate-300">04</span>
              <h3 className="text-base font-bold text-slate-900">Car Follows</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                “Driver membawa mobil Anda menyusul.” Pantau posisi GPS mobil secara real-time sampai kunci dikembalikan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHY TROBOS? */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider">
            Keamanan & Kecepatan
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Mengapa Memilih Trobos?
          </h2>
          <p className="text-sm text-slate-600 mt-1.5">
            Dirancang berdasarkan prinsip Speed, Safety, Trust, dan Simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF4D00] flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="text-base font-bold text-slate-900">Fast Dispatch (~3 Mnt)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unit motor terdekat langsung diberangkatkan ke lokasi Anda untuk evakuasi cepat.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              🛰️
            </div>
            <h3 className="text-base font-bold text-slate-900">Dual GPS Tracking</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pantau dua perjalanan sekaligus: posisi Anda di atas motor dan posisi mobil yang dibawa driver.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              🛡️
            </div>
            <h3 className="text-base font-bold text-slate-900">Driver SIM A & Asuransi</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Driver terverifikasi latar belakang SKCK dan mobil dilindungi asuransi all-risk hingga Rp 1 Miliar.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-14 px-4 sm:px-6 bg-slate-900 text-white text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Butuh Bantuan Sekarang?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Tekan tombol Trobos Sekarang. Rider jemput Anda, driver selamatkan mobil Anda.
          </p>
          <div className="pt-2">
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#FF4D00] hover:bg-[#E64400] text-white font-black text-sm tracking-wide shadow-lg transition active:scale-95"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>TROBOS SEKARANG</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-slate-200 text-slate-500 text-xs text-center">
        © 2026 Trobos Mobility Indonesia • Terobos Macet, Selamatkan Waktu.
      </footer>
    </div>
  );
}

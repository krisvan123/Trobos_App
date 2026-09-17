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
  Sparkles,
  PhoneCall,
  Play,
} from "lucide-react";
import { useTrobosStore } from "@/store/useTrobosStore";

export default function LandingPage() {
  const startBooking = useTrobosStore((s) => s.startBooking);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500 selection:text-white flex flex-col">
      {/* Top Floating Navbar */}
      <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#FF5500] flex items-center justify-center shadow-emergency group-hover:scale-105 transition">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                TROBOS
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 ml-2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                EMERGENCY
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white px-3 py-2 transition"
            >
              Masuk
            </Link>
            <Link
              href="/app"
              className="px-4 sm:px-6 py-2.5 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] text-white text-xs sm:text-sm font-black shadow-emergency transition flex items-center gap-1.5 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buka Aplikasi</span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#FF5500]/15 blur-[120px] pointer-events-none" />

        <div className="flex-1 space-y-6 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Satu-Satunya Layanan Tandem Evakuasi Kemacetan</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Terjebak Macet? <br />
            <span className="text-[#FF5500] drop-shadow-sm">Trobos Sekarang.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Layanan evakuasi darurat yang membawa Anda menembus macet dengan motor, sementara mobil Anda tetap dikemudikan driver profesional dengan aman menuju tujuan.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
            <Link
              href="/app"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] text-white font-black text-base shadow-emergency flex items-center justify-center gap-2.5 transition active:scale-95"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>TROBOS SEKARANG</span>
            </Link>

            <a
              href="#cara-kerja"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-base flex items-center justify-center gap-2 transition"
            >
              <span>Cara Kerja Tandem</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-center lg:justify-start gap-6 sm:gap-10 text-xs text-slate-400">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">~3 Mnt</div>
              <div>Respon Tiba</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
              <div>SIM A & SKCK Lolos</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-orange-400">Rp 1 Miliar</div>
              <div>Polis Asuransi All-Risk</div>
            </div>
          </div>
        </div>

        {/* HERO VISUAL: TANDEM CONCEPT DIAGRAM */}
        <div className="flex-1 w-full max-w-lg z-10">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl relative overflow-hidden">
            <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4 flex items-center justify-between">
              <span>Arsitektur Sistem Tandem</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Visual Diagram Box */}
            <div className="space-y-4">
              {/* User in Gridlock */}
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/50 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-red-400 uppercase">
                    Kondisi Anda
                  </div>
                  <div className="text-sm font-bold text-white">
                    Terjebak Macet Total di Sudirman
                  </div>
                  <div className="text-xs text-slate-400">
                    Ada rapat penting / penerbangan di bandara
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  🛑
                </div>
              </div>

              {/* Tandem Dispatched */}
              <div className="p-4 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/40 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-orange-400 uppercase">
                    1 Unit Tandem Datang
                  </div>
                  <div className="text-sm font-bold text-white">
                    1 Rider Motor + 1 Driver Mobil
                  </div>
                  <div className="text-xs text-orange-200">
                    Datang bersamaan dalam ~3 menit
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold border-2 border-slate-900 shadow">
                    🏍️
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold border-2 border-slate-900 shadow">
                    🚗
                  </div>
                </div>
              </div>

              {/* Separation & Dual Route */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-800/50">
                  <div className="text-[10px] font-bold text-sky-400 uppercase">
                    Anda & Rider
                  </div>
                  <div className="text-xs font-bold text-white mt-1">
                    Menembus Macet
                  </div>
                  <div className="text-[11px] text-sky-300 mt-1">
                    Tiba cepat di tujuan (~18 mnt)
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/50">
                  <div className="text-[10px] font-bold text-amber-400 uppercase">
                    Mobil Anda & Driver
                  </div>
                  <div className="text-xs font-bold text-white mt-1">
                    Menyusul Aman
                  </div>
                  <div className="text-[11px] text-amber-300 mt-1">
                    Driver mengemudi tertib & terlindungi
                  </div>
                </div>
              </div>

              {/* Destination Reunion */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-emerald-400 uppercase">
                    Hasil Akhir
                  </div>
                  <div className="text-sm font-bold text-white">
                    Bertemu Kembali di Tujuan
                  </div>
                  <div className="text-xs text-emerald-300">
                    Waktu terselamatkan, mobil tetap aman
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  🎯
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section id="cara-kerja" className="py-20 px-4 sm:px-6 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
              Solusi Efisien
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Cara Kerja Sistem Tandem
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              4 langkah instan untuk keluar dari jebakan macet tanpa harus menelantarkan mobil Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition">
              <span className="text-3xl font-black text-slate-700 group-hover:text-orange-500 transition">
                01
              </span>
              <h3 className="text-lg font-bold text-white">Request</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                “Tekan Trobos dan kirim lokasi.” Konfirmasi titik macet Anda dan tujuan penyelamatan hanya dalam 2 ketukan.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition">
              <span className="text-3xl font-black text-slate-700 group-hover:text-orange-500 transition">
                02
              </span>
              <h3 className="text-lg font-bold text-white">Tandem Arrives</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                “Rider dan driver datang bersama.” Verifikasi kode PIN 4-digit dan lakukan checklist foto serah terima 5 sudut.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition">
              <span className="text-3xl font-black text-slate-700 group-hover:text-orange-500 transition">
                03
              </span>
              <h3 className="text-lg font-bold text-white">You Go</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                “Rider membawa Anda menembus macet.” Tiba di rapat, ujian, atau jadwal penerbangan tepat waktu tanpa stres.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition">
              <span className="text-3xl font-black text-slate-700 group-hover:text-orange-500 transition">
                04
              </span>
              <h3 className="text-lg font-bold text-white">Car Follows</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                “Driver membawa mobil Anda menyusul.” Pantau posisi GPS mobil secara real-time hingga kunci diserahkan kembali.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHY TROBOS? */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
            Prioritas Keselamatan & Kecepatan
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Mengapa Memilih Trobos?
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Dibangun dengan prinsip Speed, Safety, Trust, Simplicity, dan Real-time Visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-[#FF5500] flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="text-base font-bold text-white">Fast Dispatch (~3 Mnt)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Algoritma radar mendeteksi unit motor terdekat yang siap membawa Anda keluar dari titik macet dalam hitungan menit.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              🛰️
            </div>
            <h3 className="text-base font-bold text-white">Dual Real-time GPS Tracking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lacak dua perjalanan sekaligus: posisi Anda di atas motor dan posisi mobil Anda yang sedang dikemudikan menyusul.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              🛡️
            </div>
            <h3 className="text-base font-bold text-white">Driver Terverifikasi SIM A & SKCK</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bukan pengemudi sembarangan. Mitra driver kami tersertifikasi keahlian transmisi matic/manual dan defensive driving.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              📄
            </div>
            <h3 className="text-base font-bold text-white">Full Trip Insurance (Rp 1 Miliar)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Setiap kilometer evakuasi terlindungi otomatis oleh asuransi all-risk komprehensif tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              📸
            </div>
            <h3 className="text-base font-bold text-white">Checklist Foto Serah Terima</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dokumentasi 5 sudut mobil dan level BBM sebelum jalan menjamin mobil Anda kembali dalam kondisi persis seperti semula.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              🔐
            </div>
            <h3 className="text-base font-bold text-white">Security PIN Handshake</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verifikasi kode unik 4-digit memastikan Anda hanya menyerahkan kendaraan ke driver resmi Trobos yang ditugaskan.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            Butuh Bantuan Sekarang?
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Jangan Biarkan Macet Menggagalkan Misi Anda.
          </h2>
          <p className="text-sm text-slate-300">
            Satu ketukan untuk evakuasi instan. Rider jemput Anda, driver amankan mobil Anda.
          </p>
          <div className="pt-2">
            <Link
              href="/app"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] text-white font-black text-base shadow-emergency transition active:scale-95"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>TROBOS SEKARANG</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 sm:px-6 border-t border-slate-900 text-slate-500 text-xs text-center">
        <p>© 2026 Trobos Mobility Indonesia. All rights reserved.</p>
        <p className="mt-1">
          Layanan Evakuasi Darurat Urban Mobility • Terobos Macet, Selamatkan Waktu.
        </p>
      </footer>
    </div>
  );
}

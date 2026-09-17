"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  ShieldCheck,
  PhoneCall,
  UserCheck,
  Radio,
  FileCheck2,
  HeartHandshake,
  AlertTriangle,
  Lock,
  CheckCircle,
} from "lucide-react";

export default function SafetyCenterPage() {
  const user = useTrobosStore((s) => s.user);
  const [sosActivated, setSosActivated] = useState(false);

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pusat Keamanan & Proteksi Trobos
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Standar keselamatan tertinggi untuk Anda dan kendaraan Anda selama proses evakuasi.
        </p>
      </div>

      {/* SOS Alert Section */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-red-950/80 via-slate-900 to-red-950/80 border border-red-700/60 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            Layanan Siaga Darurat 24/7
          </div>
          <h3 className="text-lg font-black text-white">
            Butuh Bantuan Cepat di Kemacetan?
          </h3>
          <p className="text-xs text-slate-300 max-w-md">
            Tekan tombol SOS untuk menghubungkan tim respon reaksi cepat Trobos dan membagikan koordinat GPS Anda ke pihak berwenang.
          </p>
        </div>

        <button
          onClick={() => setSosActivated(true)}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-sm tracking-wider shadow-lg flex items-center justify-center gap-2 transition shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>AKTIFKAN TOMBOL SOS</span>
        </button>
      </div>

      {/* 4 Core Pillars of Trust */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pillar 1: Verified Drivers */}
        <div className="p-5 rounded-3xl bg-slate-800/70 border border-slate-700/70 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            Driver Mobil Tersertifikasi SIM & SKCK
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Setiap Driver mitra Trobos telah melewati verifikasi identitas biometrik, verifikasi SIM A resmi, dan uji kemampuan mengemudi defensif untuk transmisi otomatis maupun manual.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>100% Lolos Uji Latar Belakang</span>
          </div>
        </div>

        {/* Pillar 2: Insurance */}
        <div className="p-5 rounded-3xl bg-slate-800/70 border border-slate-700/70 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            Asuransi All-Risk hingga Rp 1 Miliar
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Kendaraan Anda terlindungi oleh polis asuransi komprehensif all-risk sejak kunci diserahterimakan hingga mobil terparkir aman di titik temu tujuan.
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Polis Asuransi Nomor: TRB-INS-2026-992</span>
          </div>
        </div>

        {/* Pillar 3: GPS Real-time Telemetry */}
        <div className="p-5 rounded-3xl bg-slate-800/70 border border-slate-700/70 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            Pelacakan Telemetri & CCTV Dasbor
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Perjalanan Anda di motor dan mobil Anda yang dikemudikan Driver dapat dipantau langsung detik-demi-detik melalui peta satelit ganda di aplikasi.
          </p>
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Enkripsi Sinyal Militer 256-bit</span>
          </div>
        </div>

        {/* Pillar 4: 4-Digit Security OTP */}
        <div className="p-5 rounded-3xl bg-slate-800/70 border border-slate-700/70 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">
            Verifikasi Kode PIN Handover
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Kunci mobil tidak akan pernah diserahkan sebelum Driver memasukkan kode PIN 4-digit unik yang hanya tampil di layar ponsel Anda saat bertemu.
          </p>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Protokol Serah Terima 5 Titik Foto</span>
          </div>
        </div>
      </div>

      {/* Emergency Contact Information */}
      <div className="p-5 rounded-3xl bg-slate-800/70 border border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Kontak Darurat Terdaftar
          </div>
          <h4 className="text-base font-bold text-white mt-0.5">
            {user.emergencyContact.name} ({user.emergencyContact.relation})
          </h4>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {user.emergencyContact.phone}
          </p>
        </div>
        <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          Otomatis Dikabari Saat Mode Trobos Aktif
        </div>
      </div>

      {/* SOS Activated Modal */}
      {sosActivated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-red-600 rounded-3xl max-w-sm w-full p-6 text-white text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 border border-red-500/40 flex items-center justify-center mx-auto animate-ping-slow">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">
              Panggilan Darurat Trobos
            </h3>
            <p className="text-xs text-slate-300">
              Menghubungkan ke Pusat Kendali Darurat Trobos (021-500-888) dan mengirim koordinat Sudirman Kav. 28 ke kontak darurat Anda.
            </p>
            <div className="space-y-2 pt-2">
              <a
                href="tel:112"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Hubungi Layanan Polisi / Ambulans (112)
              </a>
              <button
                onClick={() => setSosActivated(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Batalkan SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

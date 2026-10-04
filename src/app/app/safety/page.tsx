"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  ShieldCheck,
  PhoneCall,
  UserCheck,
  Radio,
  FileCheck2,
  Lock,
  CheckCircle,
  AlertTriangle,
  Truck,
  Wrench,
} from "lucide-react";

export default function SafetyCenterPage() {
  const user = useTrobosStore((s) => s.user);
  const [sosActivated, setSosActivated] = useState(false);

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Pusat Keamanan & Proteksi Evakuasi
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Standar keselamatan derek resmi dan perlindungan komprehensif mobil mogok Anda.
        </p>
      </div>

      {/* SOS Alert Bar */}
      <div className="rounded-2xl p-4 bg-red-50 border border-red-200 flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-red-900">
            Mobil Mogok di Titik Berbahaya?
          </div>
          <div className="text-[11px] text-red-700">
            Hubungi pusat tanggap darurat derek Trobos & patroli jalan raya (PJR).
          </div>
        </div>
        <button
          onClick={() => setSosActivated(true)}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shrink-0 transition"
        >
          Aktivasi SOS
        </button>
      </div>

      {/* 4 Pillars of Safety */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Towing Operator Verification */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Truck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Operator Derek Bersertifikat Resmi
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mitra derek kami menggunakan truk towing gendong (flatbed) berstandar industri dan operator berlisensi SIM B1 Umum dengan rekam jejak terverifikasi.
          </p>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>100% Truk Gendong Flatbed Resmi</span>
          </div>
        </div>

        {/* Insurance */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Asuransi Derek All-Risk Rp 1 Miliar
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mobil Anda otomatis terlindungi asuransi komprehensif saat dinaikkan ke truk gendong hingga serah terima di bengkel rekanan.
          </p>
          <div className="text-[11px] text-blue-700 font-semibold flex items-center gap-1 pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Polis Asuransi Aktif Otomatis</span>
          </div>
        </div>

        {/* Real-time Tracking */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF4D00] flex items-center justify-center">
            <Radio className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Pelacakan GPS Simultan
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pantau posisi perjalanan Anda menuju tujuan serta pergerakan truk derek yang membawa mobil mogok Anda ke bengkel secara real-time.
          </p>
          <div className="text-[11px] text-orange-700 font-semibold flex items-center gap-1 pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Dual Tracking Terenkripsi</span>
          </div>
        </div>

        {/* Handover PIN & Inspection */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Kode PIN & Checklist Inspeksi Fisik
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mobil tidak akan dinaikkan ke truk tanpa pencocokan kode PIN 4-digit unik dan checklist foto inspeksi kondisi bodi 5 sudut.
          </p>
          <div className="text-[11px] text-indigo-700 font-semibold flex items-center gap-1 pt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Protokol Verifikasi 5 Sudut</span>
          </div>
        </div>
      </div>

      {/* Workshop Partnerships */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
        <div>
          <div className="text-slate-500 font-medium">Jaringan Bengkel Resmi Rekanan</div>
          <div className="text-sm font-bold text-slate-900 mt-0.5">
            Honda Autoland, Toyota Auto2000, & Astra Otoservice 24 Jam
          </div>
          <div className="text-slate-500">Menerima unit evakuasi Trobos tanpa antrean prioritas.</div>
        </div>
        <div className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold text-[11px] shrink-0">
          Prioritas Servis
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
        <div>
          <div className="text-slate-500 font-medium">Kontak Darurat Terdaftar</div>
          <div className="text-sm font-bold text-slate-900 mt-0.5">
            {user.emergencyContact.name} ({user.emergencyContact.relation})
          </div>
          <div className="text-slate-500 font-mono">{user.emergencyContact.phone}</div>
        </div>
        <div className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold text-[11px]">
          Siaga Otomatis
        </div>
      </div>

      {/* SOS Modal */}
      {sosActivated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 text-slate-900 text-center shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Pusat Tanggap Darurat Mobil Mogok
            </h3>
            <p className="text-xs text-slate-500">
              Panggilan darurat akan menghubungkan Anda ke Call Center 24 Jam Rescue Trobos (021-500-888) atau nomor 112.
            </p>
            <div className="space-y-2 pt-2">
              <a
                href="tel:112"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Hubungi 112 (Polisi / Ambulans)
              </a>
              <button
                onClick={() => setSosActivated(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Car,
  Power,
  Navigation,
  CheckCircle,
  XCircle,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Fuel,
  ArrowLeft,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { formatRupiah } from "@/lib/formatters";

export default function DriverDashboardPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [hasIncoming, setHasIncoming] = useState(true);
  const [driverState, setDriverState] = useState<
    "IDLE" | "ACCEPTED" | "ARRIVED" | "IN_TRANSIT" | "COMPLETED"
  >("IDLE");

  const [earningsToday, setEarningsToday] = useState(385000);
  const [tripsCompleted, setTripsCompleted] = useState(4);

  const handleAccept = () => {
    setHasIncoming(false);
    setDriverState("ACCEPTED");
  };

  const handleDecline = () => {
    setHasIncoming(false);
  };

  const handleArrived = () => {
    setDriverState("ARRIVED");
  };

  const handleStartTransit = () => {
    setDriverState("IN_TRANSIT");
  };

  const handleComplete = () => {
    setDriverState("COMPLETED");
    setEarningsToday((e) => e + 75000);
    setTripsCompleted((t) => t + 1);
  };

  const handleReset = () => {
    setDriverState("IDLE");
    setHasIncoming(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/app"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Mode Pengguna</span>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-tight text-white">
              Trobos Pilot
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
              Driver Partner
            </span>
          </div>
        </div>

        {/* Online / Offline Toggle Switch */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs transition-all ${
            isOnline
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
              : "bg-slate-800 text-slate-400 border border-slate-700"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline ? "bg-emerald-400 animate-ping" : "bg-slate-500"
            }`}
          />
          <span>{isOnline ? "ONLINE (SIAGA)" : "OFFLINE"}</span>
        </button>
      </header>

      {/* Main Driver Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Earnings & Stats Card */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">
              Pendapatan Bersih Hari Ini
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
              {formatRupiah(earningsToday)}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">
              Misi Trobos Selesai
            </div>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {tripsCompleted} Trip
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
            <div className="text-[11px] text-slate-400 font-semibold uppercase">
              Rating Pengemudi
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
              ★ 4.95
            </div>
          </div>
        </div>

        {/* INCOMING EMERGENCY REQUEST POPUP */}
        {isOnline && hasIncoming && driverState === "IDLE" && (
          <div className="p-6 rounded-3xl bg-gradient-to-b from-orange-950/60 to-slate-900 border-2 border-[#FF5500] shadow-2xl relative overflow-hidden animate-pulse-subtle">
            <div className="flex items-center justify-between pb-3 border-b border-orange-500/30">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 animate-ping" />
                <span className="text-xs font-black text-orange-400 uppercase tracking-wider">
                  Permintaan Evakuasi Masuk!
                </span>
              </div>
              <span className="text-xs font-bold text-white bg-orange-600 px-2.5 py-0.5 rounded-full">
                Jarak Jemput ~800m
              </span>
            </div>

            {/* Fare & Vehicle Details */}
            <div className="my-4 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <div className="text-xs text-slate-400">Tarif Bagian Driver</div>
                  <div className="text-3xl font-black text-white">Rp 75.000</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Kendaraan Pengguna</div>
                  <div className="text-sm font-bold text-amber-300">
                    Honda Civic RS (Matic)
                  </div>
                  <div className="font-mono text-xs text-slate-300">B 1234 XYZ</div>
                </div>
              </div>

              {/* Route snippet */}
              <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span className="text-slate-300">
                    Jemput: <strong>Jl. Jenderal Sudirman Kav. 28 (Mayapada Tower)</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-300">
                    Antar Mobil: <strong>Pacific Place / SCBD Lot 8</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Accept / Decline */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDecline}
                className="py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Tolak Permintaan
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="py-3.5 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] text-white font-black text-sm shadow-emergency transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <CheckCircle className="w-4 h-4" />
                <span>TERIMA MISI</span>
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE DRIVER MISSION STATES */}
        {driverState === "ACCEPTED" && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Navigation className="w-5 h-5 text-orange-400 animate-spin-slow" />
                Menuju Titik Penjemputan Pengguna
              </h3>
              <span className="text-xs text-orange-400 font-bold">ETA 3 Mnt</span>
            </div>
            <p className="text-xs text-slate-400">
              Anda berboncengan dengan Rider Rizky Pratama menuju lokasi Andi Pratama di Jl. Sudirman Kav. 28.
            </p>
            <button
              onClick={handleArrived}
              className="w-full py-3.5 rounded-2xl bg-[#FF5500] text-white font-bold text-xs shadow-emergency"
            >
              Konfirmasi: Telah Sampai di Titik Jemput
            </button>
          </div>
        )}

        {driverState === "ARRIVED" && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Proses Handover Mobil Pengguna
            </h3>
            <div className="p-3 bg-slate-800/80 rounded-2xl text-xs space-y-1">
              <div>Kode PIN Pengguna Terverifikasi: <strong>4821 (MATCH)</strong></div>
              <div>Checklist 5 Sudut: <strong>Lengkap & Tervalidasi</strong></div>
              <div>BBM Tercatat: <strong>65% (Pertamax Turbo)</strong></div>
            </div>
            <p className="text-xs text-slate-300">
              Rider Rizky telah membawa pengguna meluncur ke SCBD. Sekarang saatnya Anda mengemudikan mobil pengguna ke tujuan.
            </p>
            <button
              onClick={handleStartTransit}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg"
            >
              Mulai Kendarai Mobil Menuju SCBD
            </button>
          </div>
        )}

        {driverState === "IN_TRANSIT" && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-amber-400" />
              Sedang Mengemudikan Mobil Pengguna ke SCBD
            </h3>
            <p className="text-xs text-slate-300">
              Kamera telemetri aktif. Tetap di jalur arteri dan patuhi batas kecepatan demi keselamatan.
            </p>
            <button
              onClick={handleComplete}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              Sampai di Lobi SCBD & Serahkan Kunci
            </button>
          </div>
        )}

        {driverState === "COMPLETED" && (
          <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">
              Misi Selesai! Saldo +Rp 75.000
            </h3>
            <p className="text-xs text-slate-300">
              Mobil telah diserahterimakan dengan selamat kepada Andi Pratama di SCBD.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
            >
              Kembali Siaga Misi Berikutnya
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

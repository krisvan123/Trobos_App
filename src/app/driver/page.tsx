"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Car,
  Navigation,
  CheckCircle,
  MapPin,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import { formatRupiah } from "@/lib/formatters";

export default function DriverDashboardPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [hasIncoming, setHasIncoming] = useState(true);
  const [driverState, setDriverState] = useState<
    "IDLE" | "ACCEPTED" | "ARRIVED" | "IN_TRANSIT" | "COMPLETED"
  >("IDLE");

  const [earningsToday, setEarningsToday] = useState(550000);
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
    setEarningsToday((e) => e + 110000);
    setTripsCompleted((t) => t + 1);
  };

  const handleReset = () => {
    setDriverState("IDLE");
    setHasIncoming(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/app"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Mode Pengguna</span>
          </Link>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black tracking-tight text-slate-900">
              Trobos Towing Operator
            </span>
          </div>
        </div>

        {/* Online / Offline Toggle */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs transition ${
            isOnline
              ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
              : "bg-slate-100 text-slate-500 border border-slate-200"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />
          <span>{isOnline ? "TOWING ONLINE (SIAGA)" : "OFFLINE"}</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6 space-y-5">
        {/* Earnings Summary */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-medium">Pendapatan Hari Ini</div>
            <div className="text-lg font-black text-slate-900 mt-0.5">
              {formatRupiah(earningsToday)}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-medium">Evakuasi Selesai</div>
            <div className="text-lg font-black text-slate-900 mt-0.5">
              {tripsCompleted} Unit
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-medium">Rating Operator</div>
            <div className="text-lg font-black text-amber-600 mt-0.5">
              ★ 4.95
            </div>
          </div>
        </div>

        {/* INCOMING BREAKDOWN RESCUE ORDER POPUP */}
        {isOnline && hasIncoming && driverState === "IDLE" && (
          <div className="p-5 rounded-3xl bg-white border-2 border-[#FF4D00] shadow-xl space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] animate-pulse" />
                <span className="text-xs font-black text-[#FF4D00] uppercase">
                  Permintaan Derek Masuk
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                Jarak Jemput: ~800m (3 mnt)
              </span>
            </div>

            <div className="flex justify-between items-baseline">
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Tarif Operator Towing</div>
                <div className="text-2xl font-black text-slate-900">Rp 110.000</div>
              </div>
              <div className="text-right text-xs">
                <div className="font-bold text-slate-900">Honda Civic RS Turbo</div>
                <div className="text-slate-500 font-mono">B 1234 XYZ</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Kendala Mobil:</span>
                <span className="font-bold text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Mesin Mati Total
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 pt-1">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>Titik Mogok: <strong>Jl. Sudirman Kav. 28 (Bahu Jalan)</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Wrench className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>Tujuan Evakuasi: <strong>Bengkel Resmi Honda Autoland SCBD</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleDecline}
                className="py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition"
              >
                Tolak
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="py-3 rounded-xl bg-[#FF4D00] hover:bg-[#E64400] text-white font-black text-xs shadow-sm transition"
              >
                Terima Misi Derek
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE STATES */}
        {driverState === "ACCEPTED" && (
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-orange-600" />
                <span>Menuju Lokasi Mobil Mogok (Sudirman Kav. 28)</span>
              </h3>
              <span className="text-xs font-bold text-orange-600">3 mnt</span>
            </div>
            <p className="text-xs text-slate-500">
              Kemudikan truk towing flatbed ke lokasi pengguna. Armada pengantar penumpang meluncur terpisah.
            </p>
            <button
              onClick={handleArrived}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Sampai di Depan Mobil Mogok
            </button>
          </div>
        )}

        {driverState === "ARRIVED" && (
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verifikasi PIN & Inspeksi Serah Terima</span>
            </h3>
            <p className="text-xs text-slate-500">
              Kode PIN Pengguna (4821) cocok. Lakukan checklist foto 5 sudut sebelum menarik mobil ke flatbed.
            </p>
            <button
              onClick={handleStartTransit}
              className="w-full py-3 rounded-2xl bg-[#FF4D00] text-white font-bold text-xs shadow-sm"
            >
              Mobil Aman di Flatbed, Mulai Derek ke Bengkel
            </button>
          </div>
        )}

        {driverState === "IN_TRANSIT" && (
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#FF4D00]" />
              <span>Menderek Menuju Bengkel Honda Autoland SCBD</span>
            </h3>
            <p className="text-xs text-slate-500">
              Mobil pengguna terlindungi asuransi all-risk. Pantau kecepatan dan ikuti rute derek aman.
            </p>
            <button
              onClick={handleComplete}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              Sampai di Bengkel & Serahkan ke Teknisi
            </button>
          </div>
        )}

        {driverState === "COMPLETED" && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              Evakuasi Derek Selesai! Saldo +Rp 110.000
            </h3>
            <p className="text-xs text-slate-500">
              Mobil telah diserahkan dengan selamat kepada kepala bengkel rekanan di SCBD.
            </p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Kembali Siaga
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  Bike,
  Car,
  Phone,
  MessageSquare,
  Share2,
  ShieldAlert,
  Clock,
  Navigation,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { formatTimeRemaining } from "@/lib/formatters";

export const DualJourneyTracker: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const userArrivedAtDest = useTrobosStore((s) => s.userArrivedAtDest);
  const carArrivedAtDest = useTrobosStore((s) => s.carArrivedAtDest);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!currentTrip) return null;

  const tandem = currentTrip.tandem;
  const userPercent = currentTrip.userProgressPercent || 45;
  const carPercent = currentTrip.carProgressPercent || 25;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-xl px-4 pb-6 pt-2">
      {/* Quick Toast Notification */}
      {toastMessage && (
        <div className="mb-2 p-3 bg-slate-900 text-white text-xs font-semibold rounded-2xl shadow-xl border border-slate-700 flex items-center justify-between animate-fade-in">
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-5 overflow-hidden">
        {/* Status Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div>
              <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                Evakuasi Aktif
              </div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Trobos Sedang Berjalan
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              Tujuan
            </span>
            <span className="text-xs font-bold text-slate-900 truncate max-w-[130px] block">
              {currentTrip.destination.name.split("/")[0]}
            </span>
          </div>
        </div>

        {/* DUAL JOURNEY CARDS - CORE DIFFERENTIATOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3.5">
          {/* Card 1: YOU (MOTORBIKE) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-md">
                  <Bike className="w-3.5 h-3.5" />
                  Anda (Motor)
                </span>
                <span className="text-[10px] font-semibold text-sky-600">Rizky P.</span>
              </div>
              <div className="mt-2 text-2xl font-black text-sky-950 tracking-tight">
                {currentTrip.status === "USER_ARRIVED" || currentTrip.status === "VEHICLE_ARRIVED"
                  ? "Telah Tiba"
                  : formatTimeRemaining(currentTrip.userEtaMinutes)}
              </div>
              <p className="text-[11px] text-sky-700 mt-0.5">
                Menembus antrean macet arteri
              </p>
            </div>

            {/* User progress meter */}
            <div className="mt-3">
              <div className="w-full bg-sky-200/70 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${userPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-sky-600 mt-1 font-medium">
                <span>Progres Evakuasi</span>
                <span>{userPercent}%</span>
              </div>
            </div>

            {currentTrip.status === "TRIP_STARTED" && (
              <button
                type="button"
                onClick={userArrivedAtDest}
                className="mt-2.5 w-full py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition"
              >
                Simulasi Anda Tiba
              </button>
            )}
          </div>

          {/* Card 2: YOUR CAR (DRIVER) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                  <Car className="w-3.5 h-3.5" />
                  Mobil Anda (Driver)
                </span>
                <span className="text-[10px] font-semibold text-amber-700">Budi S.</span>
              </div>
              <div className="mt-2 text-2xl font-black text-amber-950 tracking-tight">
                {currentTrip.status === "VEHICLE_ARRIVED"
                  ? "Telah Tiba"
                  : formatTimeRemaining(currentTrip.carEtaMinutes)}
              </div>
              <p className="text-[11px] text-amber-700 mt-0.5">
                Mengemudi aman & tertib di jalur
              </p>
            </div>

            {/* Car progress meter */}
            <div className="mt-3">
              <div className="w-full bg-amber-200/70 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${carPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-amber-700 mt-1 font-medium">
                <span>Posisi Kendaraan</span>
                <span>{carPercent}%</span>
              </div>
            </div>

            {currentTrip.status === "USER_ARRIVED" && (
              <button
                type="button"
                onClick={carArrivedAtDest}
                className="mt-2.5 w-full py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition"
              >
                Simulasi Mobil Tiba
              </button>
            )}
          </div>
        </div>

        {/* Calming Trust Reassurance Note */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 mb-3.5 flex items-center justify-between">
          <span className="text-[11px] text-slate-700 font-medium">
            🛡️ Mobil Anda dikawal radar GPS & rekaman kamera dasbor real-time.
          </span>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            AMAN TERKENDALI
          </span>
        </div>

        {/* Quick Action Buttons: Call, Chat, Share, Safety */}
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => showToast(`Menghubungi Driver: ${tandem?.driver.phone}`)}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition text-slate-700 active:scale-95"
          >
            <Phone className="w-4 h-4 text-emerald-600 mb-1" />
            <span className="text-[10px] font-semibold">Telepon</span>
          </button>

          <button
            type="button"
            onClick={() => showToast("Membuka ruang obrolan darurat Tandem...")}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition text-slate-700 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-sky-600 mb-1" />
            <span className="text-[10px] font-semibold">Chat</span>
          </button>

          <button
            type="button"
            onClick={() => showToast("Tautan lacak langsung berhasil disalin ke clipboard!")}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition text-slate-700 active:scale-95"
          >
            <Share2 className="w-4 h-4 text-indigo-600 mb-1" />
            <span className="text-[10px] font-semibold">Bagikan</span>
          </button>

          <button
            type="button"
            onClick={() => showToast("Bantuan darurat Trobos siaga 24/7. Hubungi 112 jika kritis.")}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-red-200 bg-red-50/50 hover:bg-red-100 transition text-red-700 active:scale-95"
          >
            <ShieldAlert className="w-4 h-4 text-red-600 mb-1" />
            <span className="text-[10px] font-bold">SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

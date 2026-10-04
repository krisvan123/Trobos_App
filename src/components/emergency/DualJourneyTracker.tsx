"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  Bike,
  Car,
  Truck,
  Phone,
  MessageSquare,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export const DualJourneyTracker: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const userArrivedAtDest = useTrobosStore((s) => s.userArrivedAtDest);
  const carArrivedAtDest = useTrobosStore((s) => s.carArrivedAtDest);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!currentTrip) return null;

  const transport = currentTrip.passengerTransport;
  const towing = currentTrip.towingUnit;
  const userPercent = currentTrip.userProgressPercent || 45;
  const carPercent = currentTrip.carProgressPercent || 25;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-md px-4 pb-6 pt-2">
      {/* Discreet Toast */}
      {toastMessage && (
        <div className="mb-2 p-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-lg text-center">
          {toastMessage}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 text-slate-900">
        {/* Status Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Evakuasi Aktif
            </span>
            <h3 className="text-base font-black text-slate-900 mt-1">
              Penyelamatan Trobos Berjalan
            </h3>
            <p className="text-xs text-slate-500">
              Penumpang & mobil mogok dipantau secara simultan
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Proteksi</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center justify-end gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Aktif
            </span>
          </div>
        </div>

        {/* DUAL JOURNEY COMPARISON CARDS (PASSENGERS vs BROKEN CAR) */}
        <div className="grid grid-cols-2 gap-3 my-3">
          {/* Card 1: PASSENGERS (DYNAMIC TRANSPORT) */}
          <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase">
              {transport.type === "MOTOR" ? (
                <Bike className="w-4 h-4 text-sky-600" />
              ) : (
                <Car className="w-4 h-4 text-sky-600" />
              )}
              <span>Anda & Rombongan</span>
            </div>
            <div className="text-2xl font-black text-sky-950 mt-1">
              {currentTrip.status === "USER_ARRIVED" || currentTrip.status === "VEHICLE_ARRIVED"
                ? "Tiba"
                : `${currentTrip.userEtaMinutes} min`}
            </div>
            <div className="text-[11px] text-sky-700 mt-0.5 font-medium truncate">
              Menuju: {currentTrip.destination.name.split("/")[0]}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-sky-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-sky-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${userPercent}%` }}
              />
            </div>

            {currentTrip.status === "TRIP_STARTED" && (
              <button
                type="button"
                onClick={userArrivedAtDest}
                className="mt-2.5 w-full py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold transition shadow-subtle"
              >
                Tandai Penumpang Tiba
              </button>
            )}
          </div>

          {/* Card 2: BROKEN CAR (TOWING TRUCK) */}
          <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-900 uppercase">
              <Truck className="w-4 h-4 text-[#FF4D00]" />
              <span>Mobil Mogok (Towing)</span>
            </div>
            <div className="text-2xl font-black text-orange-950 mt-1">
              {currentTrip.status === "VEHICLE_ARRIVED"
                ? "Tiba"
                : `${currentTrip.carEtaMinutes} min`}
            </div>
            <div className="text-[11px] text-orange-800 mt-0.5 font-medium truncate">
              Menuju: {currentTrip.carDestination.name.split("/")[0]}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-orange-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-[#FF4D00] h-full rounded-full transition-all duration-300"
                style={{ width: `${carPercent}%` }}
              />
            </div>

            {currentTrip.status === "USER_ARRIVED" && (
              <button
                type="button"
                onClick={carArrivedAtDest}
                className="mt-2.5 w-full py-1.5 rounded-lg bg-[#FF4D00] hover:bg-[#E64400] text-white text-[11px] font-bold transition shadow-subtle"
              >
                Tandai Mobil Tiba di Bengkel
              </button>
            )}
          </div>
        </div>

        {/* RESCUE TIMELINE */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1.5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Status Evakuasi & Penyelamatan
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <span className="w-4 text-center">✓</span>
              <span>Laporan mogok diterima & unit diberangkatkan</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <span className="w-4 text-center">✓</span>
              <span>Truk derek & armada pengganti tiba di lokasi</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <span className="w-4 text-center">✓</span>
              <span>Inspeksi fisik & mobil dinaikkan ke flatbed</span>
            </div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <span className="w-4 text-center text-[#FF4D00]">●</span>
              <span>
                {currentTrip.status === "USER_ARRIVED"
                  ? "Penumpang tiba di tujuan • Derek menuju bengkel"
                  : "Evakuasi berjalan serentak ke destinasi"}
              </span>
            </div>
          </div>
        </div>

        {/* Clean Action Controls: Phone, Chat, Share, SOS */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          <a
            href={`tel:${towing.operatorPhone}`}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex flex-col items-center gap-1 transition"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-semibold">Towing</span>
          </a>
          <button
            type="button"
            onClick={() => showToast("Membuka ruang obrolan dengan tim rescue Trobos...")}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex flex-col items-center gap-1 transition"
          >
            <MessageSquare className="w-4 h-4 text-sky-600" />
            <span className="text-[10px] font-semibold">Chat</span>
          </button>
          <button
            type="button"
            onClick={() => showToast("Tautan live tracking derek disalin ke clipboard")}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex flex-col items-center gap-1 transition"
          >
            <Share2 className="w-4 h-4 text-slate-600" />
            <span className="text-[10px] font-semibold">Bagikan</span>
          </button>
          <button
            type="button"
            onClick={() => showToast("Pusat Tanggap Darurat Trobos Siaga 24 Jam")}
            className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-medium flex flex-col items-center gap-1 transition"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span className="text-[10px] font-bold">SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

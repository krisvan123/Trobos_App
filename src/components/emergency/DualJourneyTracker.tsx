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
  ShieldCheck,
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
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h3 className="text-base font-black text-slate-900">
                Trobos Sedang Berjalan
              </h3>
              <p className="text-xs text-slate-500">
                Menuju {currentTrip.destination.name.split("/")[0]}
              </p>
            </div>
          </div>
        </div>

        {/* DUAL JOURNEY COMPARISON CARDS - VISUALLY OBVIOUS */}
        <div className="grid grid-cols-2 gap-3 my-3">
          {/* Card 1: YOU (MOTOR) */}
          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase">
              <Bike className="w-4 h-4 text-sky-600" />
              <span>Anda (Motor)</span>
            </div>
            <div className="text-2xl font-black text-sky-950 mt-1">
              {currentTrip.status === "USER_ARRIVED" || currentTrip.status === "VEHICLE_ARRIVED"
                ? "Tiba"
                : formatTimeRemaining(currentTrip.userEtaMinutes)}
            </div>
            <div className="text-[11px] text-sky-700 mt-0.5">
              Bersama Rider Rizky
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
                className="mt-2.5 w-full py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold"
              >
                Tandai Anda Tiba
              </button>
            )}
          </div>

          {/* Card 2: YOUR CAR (DRIVER) */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase">
              <Car className="w-4 h-4 text-amber-600" />
              <span>Mobil Anda</span>
            </div>
            <div className="text-2xl font-black text-amber-950 mt-1">
              {currentTrip.status === "VEHICLE_ARRIVED"
                ? "Tiba"
                : formatTimeRemaining(currentTrip.carEtaMinutes)}
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5">
              Driver Budi Santoso
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-amber-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${carPercent}%` }}
              />
            </div>

            {currentTrip.status === "USER_ARRIVED" && (
              <button
                type="button"
                onClick={carArrivedAtDest}
                className="mt-2.5 w-full py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold"
              >
                Tandai Mobil Tiba
              </button>
            )}
          </div>
        </div>

        {/* Calm reassurance message */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2 mb-3.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Mobil Anda sedang dibawa menuju tujuan dengan aman.</span>
        </div>

        {/* Clean Action Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => showToast(`Menghubungi: ${tandem?.driver.phone}`)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex flex-col items-center gap-1"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px]">Telepon</span>
          </button>
          <button
            type="button"
            onClick={() => showToast("Membuka ruang chat darurat...")}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex flex-col items-center gap-1"
          >
            <MessageSquare className="w-4 h-4 text-sky-600" />
            <span className="text-[10px]">Chat</span>
          </button>
          <button
            type="button"
            onClick={() => showToast("Tautan live tracking disalin")}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium flex flex-col items-center gap-1"
          >
            <Share2 className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px]">Bagikan</span>
          </button>
          <button
            type="button"
            onClick={() => showToast("Tim tanggap darurat Trobos siaga 24/7")}
            className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-medium flex flex-col items-center gap-1"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span className="text-[10px] font-bold">SOS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useEffect } from "react";
import { Radio, X, ShieldAlert, Sparkles } from "lucide-react";
import { useTrobosStore } from "@/store/useTrobosStore";

export const FindingTandemModal: React.FC = () => {
  const resetToIdle = useTrobosStore((s) => s.resetToIdle);
  const assignTandem = useTrobosStore((s) => s.assignTandem);

  // Auto assign after 3.5s for seamless interactive experience if not simulated
  useEffect(() => {
    const timer = setTimeout(() => {
      assignTandem();
    }, 3500);
    return () => clearTimeout(timer);
  }, [assignTandem]);

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-md px-4 pb-6 pt-2">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#FF5500]/20 blur-3xl pointer-events-none" />

        {/* Top Radar Icon and Radar Pulse Ring */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/40 relative">
              <span className="absolute inset-0 rounded-full border-2 border-orange-500 animate-ping opacity-40" />
              <Radio className="w-9 h-9 text-[#FF5500] animate-pulse" />
            </div>
          </div>

          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Mencari Unit Tandem Terdekat
          </span>
          <h3 className="text-xl font-black text-white tracking-tight">
            Memindai Koridor Sudirman...
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xs">
            Menghubungkan 1 Rider Motor dan 1 Driver Berpengalaman di sekitar lokasi Anda.
          </p>
        </div>

        {/* Status Pills */}
        <div className="mt-5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Estimasi Tiba ke Lokasi</span>
          </div>
          <span className="font-bold text-white text-sm">2–4 Menit</span>
        </div>

        {/* Cancel Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={resetToIdle}
            className="w-full py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition"
          >
            Batalkan Pencarian
          </button>
        </div>
      </div>
    </div>
  );
};

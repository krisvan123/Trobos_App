"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { TripStatus } from "@/types/trobos";
import {
  Play,
  Square,
  FastForward,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export const DemoController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const isDemoRunning = useTrobosStore((s) => s.isDemoRunning);
  const runAutoSimulation = useTrobosStore((s) => s.runAutoSimulation);
  const stopAutoSimulation = useTrobosStore((s) => s.stopAutoSimulation);
  const jumpToState = useTrobosStore((s) => s.jumpToState);
  const resetToIdle = useTrobosStore((s) => s.resetToIdle);

  const currentStatus = currentTrip?.status || "IDLE";

  const statesList: { status: TripStatus; label: string }[] = [
    { status: "IDLE", label: "0. Siaga Normal (IDLE)" },
    { status: "REQUESTED", label: "1. Konfirmasi Booking" },
    { status: "SEARCHING_TANDEM", label: "2. Radar Mencari Tandem" },
    { status: "TANDEM_ASSIGNED", label: "3. Tandem Ditemukan" },
    { status: "TANDEM_APPROACHING", label: "4. Tandem Menuju Titik" },
    { status: "TANDEM_ARRIVED", label: "5. Tandem Tiba (OTP PIN)" },
    { status: "VEHICLE_HANDOVER", label: "6. Inspeksi Serah Terima" },
    { status: "TRIP_STARTED", label: "7. Perjalanan Berjalan (Dual ETA)" },
    { status: "USER_ARRIVED", label: "8. Anda Tiba di Tujuan" },
    { status: "VEHICLE_ARRIVED", label: "9. Mobil Anda Tiba" },
    { status: "COMPLETED", label: "10. Reuni & Rating" },
  ];

  return (
    <aside
      aria-label="Panel Simulasi Demo"
      className="fixed top-20 right-4 z-50 flex flex-col items-end"
    >
      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold shadow-xl border border-slate-700/80 backdrop-blur-md transition-all active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
        <span>Demo Controller</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {/* Expanded Control Box */}
      {isOpen && (
        <div className="mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 rounded-2xl shadow-2xl p-4 text-white animate-fade-in">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div>
              <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                Interactive Presenter
              </div>
              <div className="text-xs font-bold text-slate-200">
                State: <span className="text-orange-300">{currentStatus}</span>
              </div>
            </div>
            <button
              onClick={resetToIdle}
              title="Reset ke Posisi Awal"
              aria-label="Reset ke Status Awal"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Automated Simulation Button */}
          <div className="my-3">
            {isDemoRunning ? (
              <button
                onClick={stopAutoSimulation}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Hentikan Simulasi Otomatis</span>
              </button>
            ) : (
              <button
                onClick={runAutoSimulation}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-emergency transition"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Simulate Trobos (Auto-Play)</span>
              </button>
            )}
          </div>

          {/* Quick Jump List to Any State */}
          <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
            <FastForward className="w-3 h-3" />
            <span>Lompat ke Tahap (Step Jump):</span>
          </div>
          <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
            {statesList.map((item) => {
              const isCurrent = currentStatus === item.status;
              return (
                <button
                  key={item.status}
                  onClick={() => jumpToState(item.status)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                    isCurrent
                      ? "bg-[#FF5500] text-white font-bold"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  {isCurrent && <span className="text-[10px]">Aktif</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};

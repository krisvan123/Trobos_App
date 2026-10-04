"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { TripStatus } from "@/types/trobos";
import {
  Play,
  Square,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Sparkles,
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
    { status: "IDLE", label: "0. Siaga Mobil Mogok" },
    { status: "REQUESTED", label: "1. Formulir Permintaan Bantuan" },
    { status: "SEARCHING_TANDEM", label: "2. Radar Mencari Unit Towing" },
    { status: "TANDEM_ASSIGNED", label: "3. Towing & Armada Ditemukan" },
    { status: "TANDEM_APPROACHING", label: "4. Unit Rescue Menuju Lokasi" },
    { status: "TANDEM_ARRIVED", label: "5. Unit Tiba & Verifikasi PIN" },
    { status: "VEHICLE_HANDOVER", label: "6. Inspeksi Mobil & Naik Derek" },
    { status: "TRIP_STARTED", label: "7. Evakuasi Berjalan (Dual Track)" },
    { status: "USER_ARRIVED", label: "8. Penumpang Tiba di Tujuan" },
    { status: "VEHICLE_ARRIVED", label: "9. Mobil Tiba di Bengkel" },
    { status: "COMPLETED", label: "10. Penyelamatan Sukses Selesai" },
  ];

  return (
    <aside
      aria-label="Panel Simulasi Demo"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col items-end"
    >
      {/* Discreet Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-md border border-slate-200 transition active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#FF4D00]" />
        <span>Mode Simulasi</span>
        {isOpen ? (
          <ChevronDown className="w-3 h-3 text-slate-400" />
        ) : (
          <ChevronUp className="w-3 h-3 text-slate-400" />
        )}
      </button>

      {/* Clean Drawer */}
      {isOpen && (
        <div className="mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3.5 text-slate-900 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Simulasi Breakdown Rescue
              </div>
              <div className="text-xs font-bold text-slate-800">
                Tahap: <span className="text-[#FF4D00]">{currentStatus}</span>
              </div>
            </div>
            <button
              onClick={resetToIdle}
              title="Reset ke Awal"
              aria-label="Reset ke Awal"
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Auto-simulation CTA */}
          <div className="my-2.5">
            {isDemoRunning ? (
              <button
                onClick={stopAutoSimulation}
                className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Square className="w-3 h-3 fill-white" />
                <span>Stop Simulasi</span>
              </button>
            ) : (
              <button
                onClick={runAutoSimulation}
                className="w-full py-2 rounded-xl bg-[#FF4D00] hover:bg-[#E64400] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Simulasi Otomatis (Demo)</span>
              </button>
            )}
          </div>

          {/* Quick jump buttons */}
          <div className="text-[10px] font-semibold text-slate-400 mb-1">
            Lompat ke Tahap:
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {statesList.map((item) => {
              const isCurrent = currentStatus === item.status;
              return (
                <button
                  key={item.status}
                  onClick={() => jumpToState(item.status)}
                  className={`w-full text-left px-2 py-1 rounded-lg text-[11px] font-medium transition flex items-center justify-between ${
                    isCurrent
                      ? "bg-slate-900 text-white font-bold"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};

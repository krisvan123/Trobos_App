"use client";

import React from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  Car,
  CheckCircle2,
  Camera,
  Fuel,
  ShieldCheck,
  Check,
  AlertTriangle,
} from "lucide-react";

export const VehicleHandoverModal: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const toggleChecklistItem = useTrobosStore((s) => s.toggleChecklistItem);
  const setHandoverFuel = useTrobosStore((s) => s.setHandoverFuel);
  const confirmVehicleHandover = useTrobosStore((s) => s.confirmVehicleHandover);

  if (!currentTrip) return null;

  const handover = currentTrip.handover;
  const vehicle = currentTrip.vehicle;

  const checklistItems = [
    { key: "front" as const, label: "Tampak Depan & Kap Mesin" },
    { key: "rear" as const, label: "Tampak Belakang & Bagasi" },
    { key: "left" as const, label: "Sisi Kiri & Pintu" },
    { key: "right" as const, label: "Sisi Kanan & Pintu" },
    { key: "interior" as const, label: "Interior Kabin & Odometer" },
  ];

  const allChecked =
    handover.front &&
    handover.rear &&
    handover.left &&
    handover.right &&
    handover.interior;

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-lg px-4 pb-6 pt-2">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-5 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
              Prosedur Serah Terima (Handover)
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Inspeksi Kendaraan Sebelum Trobos
            </h3>
          </div>
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5500]">
            <Car className="w-5 h-5" />
          </div>
        </div>

        {/* Vehicle Snapshot Card */}
        <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-900">
              {vehicle.brand} {vehicle.model} ({vehicle.year})
            </div>
            <div className="text-xs text-slate-500">{vehicle.color}</div>
          </div>
          <div className="text-right">
            <span className="font-mono text-sm font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-300 text-slate-900 shadow-sm block">
              {vehicle.plate}
            </span>
          </div>
        </div>

        {/* Fuel Gauge Tracker */}
        <div className="mt-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Fuel className="w-4 h-4 text-amber-600" />
              <span>Perekaman Level Bahan Bakar (BBM)</span>
            </div>
            <span className="text-xs font-bold text-slate-900">
              {handover.fuelRecorded}% Terisi
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={handover.fuelRecorded}
            onChange={(e) => setHandoverFuel(Number(e.target.value))}
            className="w-full accent-[#FF5500] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>E (Kosong)</span>
            <span>50%</span>
            <span>F (Penuh)</span>
          </div>
        </div>

        {/* 5-Point Photographic Checklist */}
        <div className="mt-3.5">
          <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-slate-500" />
            <span>Checklist Foto Fisik 5 Sudut:</span>
          </div>
          <div className="space-y-1.5">
            {checklistItems.map((item) => {
              const isChecked = handover[item.key];
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleChecklistItem(item.key)}
                  className={`w-full p-2.5 rounded-xl border text-xs flex items-center justify-between transition ${
                    isChecked
                      ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                        isChecked ? "bg-emerald-600 text-white" : "border border-slate-300 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {isChecked ? "Terdokumentasi" : "Ketuk untuk centang"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Insurance Guarantee Note */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-[11px] leading-tight">
            Polis perlindungan all-risk Trobos otomatis aktif begitu serah terima dikonfirmasi.
          </span>
        </div>

        {/* Confirm Handover CTA */}
        <div className="mt-4 pt-1">
          <button
            type="button"
            disabled={!allChecked}
            onClick={confirmVehicleHandover}
            className="w-full py-4 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-white font-black text-sm tracking-wide shadow-emergency transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>KONFIRMASI SERAH TERIMA & JALAN</span>
          </button>
        </div>
      </div>
    </div>
  );
};

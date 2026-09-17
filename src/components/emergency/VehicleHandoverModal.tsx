"use client";

import React from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  Car,
  ShieldCheck,
  Check,
  Fuel,
  ArrowRight,
} from "lucide-react";

export const VehicleHandoverModal: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const toggleChecklistItem = useTrobosStore((s) => s.toggleChecklistItem);
  const setHandoverFuel = useTrobosStore((s) => s.setHandoverFuel);
  const confirmVehicleHandover = useTrobosStore((s) => s.confirmVehicleHandover);

  if (!currentTrip) return null;

  const handover = currentTrip.handover;
  const vehicle = currentTrip.vehicle;

  const points = [
    { key: "front" as const, label: "Tampak Depan" },
    { key: "rear" as const, label: "Tampak Belakang" },
    { key: "left" as const, label: "Sisi Kiri" },
    { key: "right" as const, label: "Sisi Kanan" },
    { key: "interior" as const, label: "Kabin & Odometer" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-md px-4 pb-6 pt-2">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 text-slate-900 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="pb-3 border-b border-slate-100">
          <div className="text-[11px] font-bold text-orange-600 uppercase">
            Serah Terima Kendaraan
          </div>
          <h3 className="text-lg font-black text-slate-900">
            Periksa Mobil Bersama Driver
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Driver Budi Santoso siap mengemudikan mobil Anda ke tujuan.
          </p>
        </div>

        {/* Vehicle & Driver Summary */}
        <div className="my-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900">
              {vehicle.brand} {vehicle.model}
            </div>
            <div className="text-slate-500">{vehicle.color}</div>
          </div>
          <div className="text-right">
            <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              {vehicle.plate}
            </span>
          </div>
        </div>

        {/* Fuel Gauge */}
        <div className="mb-3.5 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5 text-amber-600" />
              Bahan Bakar Tercatat
            </span>
            <span className="font-bold text-slate-900">{handover.fuelRecorded}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={handover.fuelRecorded}
            onChange={(e) => setHandoverFuel(Number(e.target.value))}
            className="w-full accent-[#FF4D00] cursor-pointer"
          />
        </div>

        {/* Simple 5-Point Check */}
        <div className="mb-4">
          <div className="text-xs font-bold text-slate-700 mb-2">
            Kondisi Fisik Mobil (5 Titik):
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {points.map((p) => {
              const isChecked = handover[p.key];
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => toggleChecklistItem(p.key)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                    isChecked
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center ${
                      isChecked ? "bg-emerald-600 text-white" : "border border-slate-300"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust Note */}
        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-[11px] text-blue-900 flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Polis asuransi all-risk Rp 1 Miliar otomatis aktif selama perjalanan.</span>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={confirmVehicleHandover}
          className="w-full py-4 rounded-2xl bg-[#FF4D00] hover:bg-[#E64400] active:scale-[0.99] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <span>Konfirmasi Serah Terima</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

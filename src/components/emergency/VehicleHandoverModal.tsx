"use client";

import React from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  Car,
  Truck,
  ShieldCheck,
  Check,
  Fuel,
  ArrowRight,
  AlertTriangle,
  Wrench,
} from "lucide-react";

export const VehicleHandoverModal: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const toggleChecklistItem = useTrobosStore((s) => s.toggleChecklistItem);
  const setHandoverFuel = useTrobosStore((s) => s.setHandoverFuel);
  const confirmVehicleHandover = useTrobosStore((s) => s.confirmVehicleHandover);

  if (!currentTrip) return null;

  const handover = currentTrip.handover;
  const vehicle = currentTrip.vehicle;
  const towing = currentTrip.towingUnit;
  const problem = currentTrip.problem;

  const points = [
    { key: "front" as const, label: "Bodi Depan" },
    { key: "rear" as const, label: "Bodi Belakang" },
    { key: "left" as const, label: "Sisi Kiri" },
    { key: "right" as const, label: "Sisi Kanan" },
    { key: "interior" as const, label: "Kabin & Odometer" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-md px-4 pb-6 pt-2">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 p-5 text-slate-900 max-h-[85vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-[#FF4D00] text-[10px] font-bold uppercase mb-1">
            <Truck className="w-3 h-3" />
            <span>Tahap Evakuasi Derek</span>
          </div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Inspeksi Mobil Mogok
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pemeriksaan kondisi bodi dan kendala mobil sebelum dinaikkan ke truk gendong flatbed.
          </p>
        </div>

        {/* 1. Vehicle & Breakdown Symptom Card */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  {vehicle.brand} {vehicle.model}
                </div>
                <div className="text-slate-500 text-[11px]">{vehicle.color} • {vehicle.year}</div>
              </div>
            </div>
            <div className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
              {vehicle.plate}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Kendala Terdaftar:</span>
            <span className="font-bold text-red-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{problem.label}</span>
            </span>
          </div>
        </div>

        {/* 2. Towing Operator & Workshop Destination */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Operator Derek</span>
            <div className="font-bold text-slate-900 mt-0.5">{towing.operatorName}</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Flatbed Certified
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Tujuan Evakuasi</span>
            <div className="font-bold text-slate-900 mt-0.5 truncate">
              {currentTrip.carDestination.name.split("/")[0]}
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
              <Wrench className="w-3 h-3 text-slate-400" /> Bengkel Rekanan
            </div>
          </div>
        </div>

        {/* 3. Physical Condition Checklist & Fuel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Checklist Kondisi Bodi</span>
            <span className="text-slate-500 text-[11px] flex items-center gap-1">
              <Fuel className="w-3 h-3 text-amber-600" /> BBM: <strong>{handover.fuelRecorded}%</strong>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {points.map((p) => {
              const isChecked = handover[p.key];
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => toggleChecklistItem(p.key)}
                  className={`p-2 rounded-xl border text-center transition flex items-center justify-center gap-1.5 ${
                    isChecked
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold"
                      : "bg-white border-slate-200 text-slate-500"
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${isChecked ? "text-emerald-600" : "text-slate-300"}`} />
                  <span className="text-[11px]">{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Safety Guarantee */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Polis asuransi all-risk Rp 1 Miliar aktif begitu mobil dinaikkan ke truk gendong.</span>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={confirmVehicleHandover}
          className="w-full py-3.5 rounded-xl bg-[#FF4D00] hover:bg-[#E64500] text-white font-black text-xs tracking-wide shadow-sm transition active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>Mulai Evakuasi & Berangkat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

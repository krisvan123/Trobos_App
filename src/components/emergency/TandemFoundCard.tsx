"use client";

import React from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  Star,
  ShieldCheck,
  Bike,
  Car,
  Phone,
  MessageSquare,
  Navigation,
} from "lucide-react";

export const TandemFoundCard: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const setApproaching = useTrobosStore((s) => s.setApproaching);

  const tandem = currentTrip?.tandem;
  if (!tandem) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-md px-4 pb-6 pt-2">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">
              Tandem Ditemukan
            </div>
            <h3 className="text-base font-black text-slate-900">
              Unit Sedang Meluncur
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              ETA Tiba
            </span>
            <span className="text-lg font-black text-[#FF4D00]">3 Menit</span>
          </div>
        </div>

        {/* Dual Personnel Summary */}
        <div className="grid grid-cols-2 gap-2.5 my-3">
          {/* Rider */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <img
                src={tandem.rider.avatar}
                alt={tandem.rider.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {tandem.rider.name}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span>{tandem.rider.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <Bike className="w-3 h-3 text-sky-600" />
              <span>NMAX ({tandem.rider.plate})</span>
            </div>
          </div>

          {/* Driver */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <img
                src={tandem.driver.avatar}
                alt={tandem.driver.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {tandem.driver.name}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  <span>SIM A Terverifikasi</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <Car className="w-3 h-3 text-amber-600" />
              <span>Driver Mobil Anda</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-between text-xs text-slate-600 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 mb-3.5">
          <span className="font-semibold text-slate-800">
            Mobil: Honda Civic ({currentTrip?.vehicle.plate || "B 1234 XYZ"})
          </span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Asuransi Aktif
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={setApproaching}
            className="w-full py-3.5 rounded-2xl bg-[#FF4D00] hover:bg-[#E64400] active:scale-[0.99] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4 fill-white" />
            <span>LACAK TANDEM</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`tel:${tandem.rider.phone}`}
              className="py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Telepon</span>
            </a>
            <button
              type="button"
              onClick={() => alert(`Obrolan dengan ${tandem.rider.name} dibuka`)}
              className="py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
              <span>Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

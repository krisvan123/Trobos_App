"use client";

import React from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  ShieldCheck,
  Star,
  Bike,
  Car,
  Clock,
  Navigation,
  Shield,
  Phone,
  CheckCircle,
} from "lucide-react";

export const TandemFoundCard: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const setApproaching = useTrobosStore((s) => s.setApproaching);

  const tandem = currentTrip?.tandem;
  if (!tandem) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-lg px-4 pb-6 pt-2">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-5 overflow-hidden">
        {/* Header Alert */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Tandem Ditemukan!
              </h3>
              <p className="text-xs text-slate-500">
                1 Rider + 1 Driver sedang menuju titik Anda
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">
              ETA Tiba
            </span>
            <span className="text-base font-black text-[#FF5500]">3 Menit</span>
          </div>
        </div>

        {/* 2-Column Cards for Rider and Driver */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3.5">
          {/* Rider Card */}
          <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex flex-col justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={tandem.rider.avatar}
                alt={tandem.rider.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-sky-400"
              />
              <div className="overflow-hidden">
                <div className="flex items-center gap-1">
                  <Bike className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-[10px] font-bold uppercase text-sky-600">
                    Rider Anda
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {tandem.rider.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{tandem.rider.rating}</span>
                  <span className="text-[10px] text-slate-400">({tandem.rider.tripsCount} trip)</span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-sky-200/60 text-[11px] text-slate-600">
              <span className="font-semibold text-slate-800">{tandem.rider.bikeModel}</span>
              <span className="block font-mono font-bold text-sky-900">{tandem.rider.plate}</span>
            </div>
          </div>

          {/* Driver Card */}
          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 flex flex-col justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={tandem.driver.avatar}
                alt={tandem.driver.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
              />
              <div className="overflow-hidden">
                <div className="flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[10px] font-bold uppercase text-amber-600">
                    Driver Mobil Anda
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {tandem.driver.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{tandem.driver.rating}</span>
                  <span className="text-[10px] text-slate-400">({tandem.driver.tripsCount} trip)</span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-amber-200/60 text-[11px] text-slate-600">
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> {tandem.driver.safetyBadge}
              </span>
              <span className="block text-[10px] text-slate-500 font-mono">{tandem.driver.licenseNumber}</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 text-xs text-slate-600 mb-3.5">
          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Driver Terverifikasi SKCK & SIM A</span>
          </div>
          <div className="flex items-center gap-1 text-blue-700 font-semibold">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Asuransi All-Risk Rp 1 Miliar</span>
          </div>
        </div>

        {/* CTA Button: Lacak Tandem */}
        <button
          type="button"
          onClick={setApproaching}
          className="w-full py-3.5 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] active:scale-[0.99] text-white font-black text-sm tracking-wide shadow-emergency transition flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4 fill-white" />
          <span>LACAK TANDEM MENUJU ANDA</span>
        </button>
      </div>
    </div>
  );
};

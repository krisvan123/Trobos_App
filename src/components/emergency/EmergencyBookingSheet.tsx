"use client";

import React, { useState } from "react";
import { BottomSheet } from "@/components/common/BottomSheet";
import { PriceBreakdown } from "@/components/emergency/PriceBreakdown";
import { useTrobosStore } from "@/store/useTrobosStore";
import { MOCK_LOCATIONS } from "@/lib/mockData";
import {
  MapPin,
  Navigation,
  Car,
  Clock,
  Zap,
  ShieldCheck,
  Check,
} from "lucide-react";

interface EmergencyBookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyBookingSheet: React.FC<EmergencyBookingSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const selectedDestination = useTrobosStore((s) => s.selectedDestination);
  const setSelectedDestination = useTrobosStore((s) => s.setSelectedDestination);
  const vehicles = useTrobosStore((s) => s.vehicles);
  const activeVehicleId = useTrobosStore((s) => s.activeVehicleId);
  const setActiveVehicleId = useTrobosStore((s) => s.setActiveVehicleId);
  const confirmBooking = useTrobosStore((s) => s.confirmBooking);

  const activeVehicle =
    vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];

  const handleConfirm = () => {
    confirmBooking();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Trobos dari Lokasi Ini?"
      subtitle="Satu unit Tandem (1 Rider + 1 Driver) akan segera meluncur."
      maxHeight="max-h-[88vh]"
    >
      <div className="space-y-4 pb-2">
        {/* Origin & Destination Card */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-3">
          {/* Origin */}
          <div className="flex items-start gap-3">
            <div className="mt-1 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-[#FF5500] ring-4 ring-orange-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="w-0.5 h-7 bg-slate-300 my-0.5" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-orange-600 uppercase tracking-wider">
                Titik Anda Terjebak Macet
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                {MOCK_LOCATIONS.current.name}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {MOCK_LOCATIONS.current.address}
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <div className="w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center">
                <MapPin className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                Tujuan Penyelamatan
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                {selectedDestination.name}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {selectedDestination.address}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Destination Chips */}
        <div>
          <div className="text-xs font-semibold text-slate-600 mb-2">
            Pilih Lokasi Tujuan Tercepat:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {MOCK_LOCATIONS.destinations.map((dest) => {
              const isSelected = selectedDestination.name === dest.name;
              return (
                <button
                  key={dest.name}
                  type="button"
                  onClick={() => setSelectedDestination(dest)}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs flex items-center justify-between ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="truncate pr-1">
                    <div className="font-bold truncate">{dest.name.split("/")[0]}</div>
                    <div className={`text-[10px] truncate ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                      {dest.areaTag}
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Vehicle Selector */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Mobil yang Dititipkan</div>
              <div className="text-sm font-bold text-slate-900">
                {activeVehicle.brand} {activeVehicle.model}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  {activeVehicle.plate}
                </span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const nextIndex =
                (vehicles.findIndex((v) => v.id === activeVehicleId) + 1) %
                vehicles.length;
              setActiveVehicleId(vehicles[nextIndex].id);
            }}
            className="text-xs font-semibold text-[#FF5500] hover:text-[#E64C00] px-2 py-1 rounded-lg border border-orange-200 bg-orange-50 transition"
          >
            Ganti
          </button>
        </div>

        {/* Dual ETA Info Highlights */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-sky-900">
            <div className="text-[11px] font-semibold text-sky-700 uppercase">
              Anda (Motor)
            </div>
            <div className="text-lg font-black text-sky-950">~18 Menit</div>
            <div className="text-[10px] text-sky-600">Menembus celah macet</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-900">
            <div className="text-[11px] font-semibold text-amber-700 uppercase">
              Mobil Anda (Driver)
            </div>
            <div className="text-lg font-black text-amber-950">~31 Menit</div>
            <div className="text-[10px] text-amber-600">Menyusul via arteri</div>
          </div>
        </div>

        {/* Price Breakdown */}
        {currentTrip?.fare && <PriceBreakdown fare={currentTrip.fare} />}

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-4 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] active:scale-[0.99] text-white font-black text-base tracking-wide shadow-emergency transition flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>KONFIRMASI TROBOS</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-sm font-semibold transition"
          >
            Batal
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

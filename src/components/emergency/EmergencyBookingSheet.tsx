"use client";

import React, { useState } from "react";
import { BottomSheet } from "@/components/common/BottomSheet";
import { useTrobosStore } from "@/store/useTrobosStore";
import { MOCK_LOCATIONS } from "@/lib/mockData";
import { formatRupiah } from "@/lib/formatters";
import {
  MapPin,
  Car,
  Check,
  ShieldCheck,
  Zap,
  ChevronDown,
  ChevronUp,
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

  const [showBreakdown, setShowBreakdown] = useState(false);

  const activeVehicle =
    vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];

  const handleConfirm = () => {
    confirmBooking();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Konfirmasi Penjemputan Trobos"
      subtitle="1 Rider motor & 1 Driver mobil akan datang bersamaan ke titik Anda."
      maxHeight="max-h-[88vh]"
    >
      <div className="space-y-4 pb-2">
        {/* Origin & Destination Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-3">
          {/* Current Pickup Location */}
          <div className="flex items-start gap-3">
            <div className="mt-1 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF4D00] ring-4 ring-orange-100" />
              <div className="w-0.5 h-6 bg-slate-300 my-0.5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[11px] font-semibold text-slate-500 uppercase">
                Titik Anda Terjebak Macet
              </div>
              <div className="text-sm font-bold text-slate-900 truncate">
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
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center">
                <MapPin className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[11px] font-semibold text-emerald-600 uppercase">
                Tujuan Penyelamatan
              </div>
              <div className="text-sm font-bold text-slate-900 truncate">
                {selectedDestination.name}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {selectedDestination.address}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Destination Select Chips */}
        <div>
          <div className="text-xs font-semibold text-slate-700 mb-2">
            Pilih Lokasi Tujuan:
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

        {/* Vehicle Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
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
                <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> Asuransi Aktif
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
            className="text-xs font-semibold text-[#FF4D00] hover:text-[#E64400] px-2 py-1 rounded-lg border border-orange-200 bg-orange-50 transition"
          >
            Ganti Mobil
          </button>
        </div>

        {/* Dual ETA Info */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-950">
            <span className="text-[10px] uppercase font-bold text-sky-700">
              Anda (Motor)
            </span>
            <div className="text-base font-black">~18 Menit</div>
            <div className="text-[10px] text-sky-700">Menembus macet</div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-950">
            <span className="text-[10px] uppercase font-bold text-amber-700">
              Mobil Anda (Driver)
            </span>
            <div className="text-base font-black">~31 Menit</div>
            <div className="text-[10px] text-amber-700">Menyusul tertib</div>
          </div>
        </div>

        {/* Fare Summary Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">
                Total Tarif (2 Pengemudi)
              </div>
              <div className="text-xl font-black text-slate-900">
                {formatRupiah(currentTrip?.fare.totalFare || 89000)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <span>{showBreakdown ? "Sembunyikan" : "Rincian"}</span>
              {showBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showBreakdown && (
            <div className="mt-3 pt-2.5 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Tarif Dasar</span>
                <span className="font-semibold text-slate-800">Rp 35.000</span>
              </div>
              <div className="flex justify-between">
                <span>Layanan Tandem (Rider + Driver)</span>
                <span className="font-semibold text-slate-800">Rp 30.000</span>
              </div>
              <div className="flex justify-between">
                <span>Jarak Tempuh (6.8 km)</span>
                <span className="font-semibold text-slate-800">Rp 14.000</span>
              </div>
              <div className="flex justify-between text-orange-700">
                <span>Lonjakan Macet Parah (Surge)</span>
                <span className="font-semibold">+Rp 10.000</span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                Sudah termasuk polis perlindungan asuransi all-risk hingga Rp 1 Miliar.
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-4 rounded-2xl bg-[#FF4D00] hover:bg-[#E64400] active:scale-[0.99] text-white font-black text-base shadow-md transition flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>KONFIRMASI TROBOS</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition"
          >
            Batal
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

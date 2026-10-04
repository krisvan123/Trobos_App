"use client";

import React, { useState } from "react";
import { BottomSheet } from "@/components/common/BottomSheet";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  MOCK_LOCATIONS,
  BREAKDOWN_PROBLEMS,
  getPassengerTransportOption,
} from "@/lib/mockData";
import { BreakdownProblemId } from "@/types/trobos";
import { formatRupiah } from "@/lib/formatters";
import {
  MapPin,
  Car,
  Truck,
  Bike,
  Users,
  Check,
  ShieldCheck,
  AlertTriangle,
  CircleDot,
  BatteryWarning,
  Flame,
  KeyRound,
  ShieldAlert,
  HelpCircle,
  Plus,
  Minus,
  Wrench,
  ChevronDown,
  ChevronUp,
  Zap,
  Info,
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
  const selectedWorkshop = useTrobosStore((s) => s.selectedWorkshop);
  const setSelectedWorkshop = useTrobosStore((s) => s.setSelectedWorkshop);
  const carDestinationType = useTrobosStore((s) => s.carDestinationType);
  const setCarDestinationType = useTrobosStore((s) => s.setCarDestinationType);
  const selectedProblemId = useTrobosStore((s) => s.selectedProblemId);
  const setSelectedProblemId = useTrobosStore((s) => s.setSelectedProblemId);
  const passengerCount = useTrobosStore((s) => s.passengerCount);
  const setPassengerCount = useTrobosStore((s) => s.setPassengerCount);
  const vehicles = useTrobosStore((s) => s.vehicles);
  const activeVehicleId = useTrobosStore((s) => s.activeVehicleId);
  const setActiveVehicleId = useTrobosStore((s) => s.setActiveVehicleId);
  const confirmBooking = useTrobosStore((s) => s.confirmBooking);

  const [showBreakdown, setShowBreakdown] = useState(false);

  const activeVehicle =
    vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];

  const passengerTransport = getPassengerTransportOption(passengerCount);

  const handleConfirm = () => {
    confirmBooking();
  };

  const getProblemIcon = (id: BreakdownProblemId) => {
    switch (id) {
      case "engine_failure":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "flat_tire":
        return <CircleDot className="w-4 h-4 text-amber-600" />;
      case "battery_dead":
        return <BatteryWarning className="w-4 h-4 text-orange-600" />;
      case "overheat":
        return <Flame className="w-4 h-4 text-rose-600" />;
      case "starter_failure":
        return <KeyRound className="w-4 h-4 text-yellow-600" />;
      case "minor_accident":
        return <ShieldAlert className="w-4 h-4 text-purple-600" />;
      default:
        return <HelpCircle className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Penyelamatan Mobil Mogok"
      subtitle="Evakuasi mobil ke bengkel rekanan & antar penumpang ke tujuan"
      maxHeight="max-h-[90vh]"
    >
      <div className="space-y-4 pb-4">
        {/* Policy Banner: Dynamic vehicle statement */}
        <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" />
          <div className="text-xs text-orange-950 font-medium">
            <span className="font-bold text-[#FF4D00]">Sistem Penyelamatan Ganda:</span> Kendaraan pengganti disesuaikan secara dinamis dengan jumlah penumpang Anda, sementara mobil mogok dievakuasi dengan truk towing flatbed.
          </div>
        </div>

        {/* 1. Vehicle Selector Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-semibold uppercase">Mobil yang Mogok</div>
              <div className="text-sm font-bold text-slate-900">
                {activeVehicle.brand} {activeVehicle.model}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                  {activeVehicle.plate}
                </span>
                <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Terdaftar & Berasuransi
                </span>
              </div>
            </div>
          </div>
          {vehicles.length > 1 && (
            <button
              type="button"
              onClick={() => {
                const nextIndex =
                  (vehicles.findIndex((v) => v.id === activeVehicleId) + 1) %
                  vehicles.length;
                setActiveVehicleId(vehicles[nextIndex].id);
              }}
              className="text-xs font-semibold text-[#FF4D00] hover:text-[#E64400] px-2.5 py-1.5 rounded-lg border border-orange-200 bg-orange-50 transition"
            >
              Ganti
            </button>
          )}
        </div>

        {/* 2. Breakdown Problem Selection (7 Problem Cards) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Apa Kendala Mobil Anda?</span>
            </label>
            <span className="text-[11px] text-slate-500">Pilih 1 masalah</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {BREAKDOWN_PROBLEMS.map((problem) => {
              const isSelected = selectedProblemId === problem.id;
              return (
                <button
                  key={problem.id}
                  type="button"
                  onClick={() => setSelectedProblemId(problem.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="p-1 rounded-lg bg-white/80 shrink-0 mt-0.5">
                    {getProblemIcon(problem.id)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold leading-tight">{problem.label}</div>
                    <div
                      className={`text-[10px] line-clamp-1 mt-0.5 ${
                        isSelected ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {problem.description}
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Dynamic Passenger Count & Vehicle Recommendation */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#FF4D00]" />
                <span>Berapa orang yang perlu diantar?</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Termasuk Anda dan seluruh penumpang dalam mobil
              </div>
            </div>

            {/* Stepper Control */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={() => setPassengerCount(passengerCount - 1)}
                disabled={passengerCount <= 1}
                aria-label="Kurangi penumpang"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-700 font-bold transition"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center font-black text-sm text-slate-900 font-mono">
                {passengerCount}
              </span>
              <button
                type="button"
                onClick={() => setPassengerCount(passengerCount + 1)}
                disabled={passengerCount >= 8}
                aria-label="Tambah penumpang"
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* DYNAMIC VEHICLE RECOMMENDATION BOX */}
          <div className="p-3 bg-white border border-slate-200/90 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Rekomendasi Armada Penumpang
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Kapasitas: {passengerTransport.capacityLabel}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF4D00] shrink-0">
                {passengerTransport.type === "MOTOR" ? (
                  <Bike className="w-5 h-5" />
                ) : (
                  <Car className="w-5 h-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-black text-slate-900">
                  {passengerTransport.title}
                </div>
                <div className="text-[11px] text-slate-600 line-clamp-1">
                  {passengerTransport.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Origin & Dual Destination Routing */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-3">
          {/* Pickup / Breakdown Location */}
          <div className="flex items-start gap-3">
            <div className="mt-1 flex flex-col items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-red-600 ring-4 ring-red-100" />
              <div className="w-0.5 h-6 bg-slate-300 my-0.5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[10px] font-bold text-red-600 uppercase tracking-wide">
                Titik Mobil Mogok
              </div>
              <div className="text-sm font-bold text-slate-900 truncate">
                {MOCK_LOCATIONS.current.name}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {MOCK_LOCATIONS.current.address}
              </div>
            </div>
          </div>

          {/* Passenger Destination */}
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center">
                <MapPin className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                Tujuan Anda & Penumpang ({passengerTransport.type === "MOTOR" ? "Motor" : "Mobil"})
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

        {/* Quick Destination Chips for Passengers */}
        <div>
          <div className="text-xs font-bold text-slate-800 mb-2">
            Pilih Destinasi Anda:
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

        {/* 5. Car Rescue Destination (Workshop vs Same Destination) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-slate-700" />
              <span>Evakuasi Mobil Mogok (Truk Towing)</span>
            </div>
            <div className="flex rounded-lg bg-slate-200/80 p-0.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setCarDestinationType("WORKSHOP")}
                className={`px-2 py-1 rounded-md transition ${
                  carDestinationType === "WORKSHOP"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Bengkel Rekanan
              </button>
              <button
                type="button"
                onClick={() => setCarDestinationType("SAME_AS_PASSENGER")}
                className={`px-2 py-1 rounded-md transition ${
                  carDestinationType === "SAME_AS_PASSENGER"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sama dg Tujuan
              </button>
            </div>
          </div>

          {carDestinationType === "WORKSHOP" ? (
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] text-slate-500 font-medium">
                Pilih Bengkel Rekanan Resmi Terdekat:
              </div>
              <div className="space-y-1.5">
                {MOCK_LOCATIONS.workshops.map((shop) => {
                  const isSelected = selectedWorkshop.name === shop.name;
                  return (
                    <button
                      key={shop.name}
                      type="button"
                      onClick={() => setSelectedWorkshop(shop)}
                      className={`w-full p-2 rounded-xl text-left border text-xs flex items-center justify-between transition ${
                        isSelected
                          ? "bg-white border-slate-900 ring-1 ring-slate-900 shadow-sm"
                          : "bg-white/70 border-slate-200 hover:bg-white text-slate-700"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-slate-900 truncate">{shop.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{shop.areaTag}</div>
                      </div>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-[#FF4D00] shrink-0" />
                      ) : (
                        <Wrench className="w-3 h-3 text-slate-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
              Mobil akan diderek mengikuti tujuan penumpang ke <strong>{selectedDestination.name}</strong>.
            </div>
          )}
        </div>

        {/* 6. Dual Rescue Units HUD Preview */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 text-orange-950">
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-orange-700">
              <Truck className="w-3.5 h-3.5" />
              <span>Unit Towing Gendong</span>
            </div>
            <div className="text-sm font-black text-slate-900 mt-1">Pak Slamet Riyadi</div>
            <div className="text-[11px] text-slate-600 font-medium truncate">
              Isuzu Flatbed B 9812 TOW
            </div>
          </div>

          <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-sky-950">
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-sky-700">
              {passengerTransport.type === "MOTOR" ? (
                <Bike className="w-3.5 h-3.5" />
              ) : (
                <Car className="w-3.5 h-3.5" />
              )}
              <span>Armada Pengantar</span>
            </div>
            <div className="text-sm font-black text-slate-900 mt-1">
              {passengerTransport.driverName}
            </div>
            <div className="text-[11px] text-slate-600 font-medium truncate">
              {passengerTransport.vehicleModel}
            </div>
          </div>
        </div>

        {/* 7. Fare Summary Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">
                Total Biaya Penyelamatan & Evakuasi
              </div>
              <div className="text-xl font-black text-slate-900">
                {formatRupiah(currentTrip?.fare.totalFare || 220000)}
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
                <span>Evakuasi Derek Towing Flatbed</span>
                <span className="font-semibold text-slate-800">Rp 110.000</span>
              </div>
              <div className="flex justify-between">
                <span>Armada Pengantar Penumpang ({passengerTransport.title})</span>
                <span className="font-semibold text-slate-800">Rp 45.000</span>
              </div>
              <div className="flex justify-between">
                <span>Layanan Rescue Siaga & Verifikasi</span>
                <span className="font-semibold text-slate-800">Rp 45.000</span>
              </div>
              <div className="flex justify-between">
                <span>Jarak Tempuh & Operasional (6.8 km)</span>
                <span className="font-semibold text-slate-800">Rp 20.000</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-medium pt-1.5 flex items-center gap-1 border-t border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Termasuk perlindungan asuransi all-risk hingga Rp 1.000.000.000.</span>
              </div>
            </div>
          )}
        </div>

        {/* 8. Action Buttons (DOMINANT CTA: MINTA BANTUAN) */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-4 rounded-2xl bg-[#FF4D00] hover:bg-[#E64400] active:scale-[0.99] text-white font-black text-base shadow-elevated transition flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 fill-white" />
            <span>MINTA BANTUAN</span>
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

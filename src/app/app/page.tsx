"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { EmergencyButton } from "@/components/common/EmergencyButton";
import { EmergencyBookingSheet } from "@/components/emergency/EmergencyBookingSheet";
import { FindingTandemModal } from "@/components/emergency/FindingTandemModal";
import { TandemFoundCard } from "@/components/emergency/TandemFoundCard";
import { OTPVerificationCard } from "@/components/emergency/OTPVerificationCard";
import { VehicleHandoverModal } from "@/components/emergency/VehicleHandoverModal";
import { DualJourneyTracker } from "@/components/emergency/DualJourneyTracker";
import { TripCompletedModal } from "@/components/emergency/TripCompletedModal";
import { MOCK_LOCATIONS } from "@/lib/mockData";
import { MapPin, ShieldCheck, Clock, Navigation } from "lucide-react";

export default function HomePage() {
  const user = useTrobosStore((s) => s.user);
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const startBooking = useTrobosStore((s) => s.startBooking);
  const resetToIdle = useTrobosStore((s) => s.resetToIdle);
  const setArrived = useTrobosStore((s) => s.setArrived);

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const status = currentTrip?.status || "IDLE";

  const handleOpenBooking = () => {
    startBooking();
    setIsBookingOpen(true);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-slate-50">
      {/* 1. Main Clean Urban Map */}
      <div className="absolute inset-0 z-0">
        <InteractiveMap
          status={status}
          userProgress={currentTrip?.userProgressPercent || 0}
          carProgress={currentTrip?.carProgressPercent || 0}
          originName={currentTrip?.origin.name || MOCK_LOCATIONS.current.name}
          destinationName={
            currentTrip?.destination.name || MOCK_LOCATIONS.destinations[0].name
          }
        />
      </div>

      {/* 2. Top Bar: Greeting + Location (Clean, Elevated, Minimal) */}
      <div className="relative z-20 p-4 sm:p-6 pointer-events-none">
        <div className="max-w-md pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Selamat malam,</div>
                <div className="text-sm font-bold text-slate-900 leading-none">
                  {user.name}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Layanan Siaga
              </span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-[#FF4D00] shrink-0" />
            <span className="truncate font-medium">{MOCK_LOCATIONS.current.name}</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Area: DOMINANT EMERGENCY CTA (When IDLE) */}
      {status === "IDLE" && (
        <div className="mt-auto relative z-20 p-4 sm:p-6 pb-20 sm:pb-6 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto bg-white border border-slate-200 rounded-3xl p-5 shadow-xl space-y-3">
            {/* Supporting Explanation */}
            <div>
              <div className="text-[11px] font-bold text-orange-600 uppercase tracking-wide">
                Layanan Evakuasi Darurat
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                Terjebak macet? Kami bantu Anda dan mobil Anda sampai tujuan.
              </h2>
            </div>

            {/* Dominant Primary CTA */}
            <EmergencyButton onClick={handleOpenBooking} />

            {/* Supporting Micro-Info */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Penjemputan ~3 menit</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Driver SIM A & Asuransi</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Active Emergency Flow Overlays */}
      {(status === "REQUESTED" || isBookingOpen) && (
        <EmergencyBookingSheet
          isOpen={true}
          onClose={() => {
            setIsBookingOpen(false);
            if (status === "REQUESTED") resetToIdle();
          }}
        />
      )}

      {status === "SEARCHING_TANDEM" && <FindingTandemModal />}

      {status === "TANDEM_ASSIGNED" && <TandemFoundCard />}

      {/* Approaching HUD */}
      {status === "TANDEM_APPROACHING" && (
        <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-md px-4 pb-6 pt-2">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 text-slate-900 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] animate-pulse" />
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Tandem Menuju Lokasi Anda
                  </h3>
                  <p className="text-xs text-slate-500">Rizky (Motor) & Budi (Driver)</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">ETA</span>
                <span className="text-lg font-black text-[#FF4D00]">02:41</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <span>✓</span>
                <span>Permintaan evakuasi diterima</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-medium">
                <span>✓</span>
                <span>Tandem diberangkatkan bersamaan</span>
              </div>
              <div className="flex items-center gap-2 text-[#FF4D00] font-bold">
                <Navigation className="w-3.5 h-3.5 animate-spin" />
                <span>Mendekati titik jemput Anda (Sudirman Kav. 28)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={setArrived}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
            >
              Tandai: Tandem Telah Sampai di Depan Anda
            </button>
          </div>
        </div>
      )}

      {(status === "TANDEM_ARRIVED" || status === "VERIFICATION") && (
        <OTPVerificationCard />
      )}

      {status === "VEHICLE_HANDOVER" && <VehicleHandoverModal />}

      {(status === "TRIP_STARTED" ||
        status === "USER_ARRIVED" ||
        status === "VEHICLE_ARRIVED") && <DualJourneyTracker />}

      {status === "COMPLETED" && <TripCompletedModal />}
    </div>
  );
}

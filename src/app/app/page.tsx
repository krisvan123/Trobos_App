"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { StatusBadge } from "@/components/common/StatusBadge";
import { MOCK_LOCATIONS } from "@/lib/mockData";
import {
  MapPin,
  Clock,
  ShieldCheck,
  HelpCircle,
  Car,
  Bike,
  Sparkles,
  PhoneCall,
  CheckCircle,
  Navigation,
} from "lucide-react";

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
    <div className="relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      {/* Fullscreen Interactive Vector Map Backdrop */}
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

      {/* TOP FLOATING OVERLAY: GREETING & LOCATION */}
      <div className="relative z-20 p-4 sm:p-6 pointer-events-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-xl">
          {/* User Status Card */}
          <div className="glass-panel-dark rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-xl pointer-events-auto border border-white/10 max-w-sm">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-orange-500 shadow-md"
              />
              <div>
                <div className="text-[11px] font-semibold text-slate-400">
                  Selamat malam,
                </div>
                <h2 className="text-base font-black text-white leading-tight">
                  {user.name}
                </h2>
              </div>
            </div>

            {/* Current Detected Traffic Hotspot */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-start gap-2 text-xs">
              <MapPin className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
              <div className="overflow-hidden">
                <div className="font-bold text-slate-200 truncate">
                  {MOCK_LOCATIONS.current.name}
                </div>
                <div className="text-[11px] text-red-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Macet Parah Terdeteksi (Kepadatan 94%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM AREA: EMERGENCY CTA & QUICK ACTIONS (WHEN IDLE) */}
      {status === "IDLE" && (
        <div className="mt-auto relative z-20 p-4 sm:p-6 pb-20 sm:pb-6 pointer-events-none">
          <div className="max-w-lg mx-auto pointer-events-auto flex flex-col gap-3">
            {/* Massive Emergency CTA Button */}
            <EmergencyButton onClick={handleOpenBooking} />

            {/* Secondary Dispatch Status & Quick Actions */}
            <div className="glass-panel-dark rounded-2xl p-3 shadow-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  Waktu respon evakuasi rata-rata:{" "}
                  <strong className="text-white font-bold">~3 Menit</strong>
                </span>
              </div>

              {/* Quick Action Chips */}
              <div className="flex items-center gap-2 text-xs">
                <Link
                  href="/app/trips"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1 font-medium"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Riwayat</span>
                </Link>
                <Link
                  href="/app/safety"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Keamanan</span>
                </Link>
                <Link
                  href="/app/help"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1 font-medium"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                  <span>Bantuan</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STATE 1: REQUESTED / BOOKING CONFIRMATION SHEET */}
      {(status === "REQUESTED" || isBookingOpen) && (
        <EmergencyBookingSheet
          isOpen={true}
          onClose={() => {
            setIsBookingOpen(false);
            if (status === "REQUESTED") resetToIdle();
          }}
        />
      )}

      {/* STATE 2: SEARCHING TANDEM RADAR */}
      {status === "SEARCHING_TANDEM" && <FindingTandemModal />}

      {/* STATE 3: TANDEM FOUND */}
      {status === "TANDEM_ASSIGNED" && <TandemFoundCard />}

      {/* STATE 4: TANDEM APPROACHING HUD */}
      {status === "TANDEM_APPROACHING" && (
        <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-lg px-4 pb-6 pt-2">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 animate-ping" />
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Tandem Menuju Lokasi Anda
                  </h3>
                  <p className="text-xs text-slate-500">
                    Rider Rizky & Driver Budi meluncur via Sudirman
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  ETA Tiba
                </span>
                <span className="text-lg font-black text-[#FF5500]">02:41</span>
              </div>
            </div>

            {/* Stepper Status Timeline */}
            <div className="my-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Permintaan Trobos diterima pusat komando</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Unit Tandem (Rider + Driver) diberangkatkan</span>
              </div>
              <div className="flex items-center gap-2 text-[#FF5500] font-bold">
                <Navigation className="w-4 h-4 text-[#FF5500] animate-spin-slow" />
                <span>Tandem sedang mendekati titik macet Anda (600m)</span>
              </div>
            </div>

            {/* Arrived Trigger Button */}
            <button
              type="button"
              onClick={setArrived}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs tracking-wider uppercase transition shadow-md"
            >
              Simulasi: Tandem Telah Tiba di Depan Anda
            </button>
          </div>
        </div>
      )}

      {/* STATE 5: TANDEM ARRIVED & OTP HANDSHAKE */}
      {(status === "TANDEM_ARRIVED" || status === "VERIFICATION") && (
        <OTPVerificationCard />
      )}

      {/* STATE 6: VEHICLE HANDOVER INSPECTION */}
      {status === "VEHICLE_HANDOVER" && <VehicleHandoverModal />}

      {/* STATE 7 & 8: DUAL JOURNEY LIVE TRACKER */}
      {(status === "TRIP_STARTED" ||
        status === "USER_ARRIVED" ||
        status === "VEHICLE_ARRIVED") && <DualJourneyTracker />}

      {/* STATE 9: TRIP COMPLETED REUNION */}
      {status === "COMPLETED" && <TripCompletedModal />}
    </div>
  );
}

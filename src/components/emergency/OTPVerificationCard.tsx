"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { Key, ShieldCheck, ArrowRight } from "lucide-react";

export const OTPVerificationCard: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const verifyOtp = useTrobosStore((s) => s.verifyOtp);

  if (!currentTrip) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-md px-4 pb-6 pt-2">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 text-slate-900 text-center">
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Tandem Telah Tiba di Lokasi Anda
        </div>

        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Kode Verifikasi Handover
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Tunjukkan kode 4-digit ini kepada driver (Budi Santoso) sebelum menyerahkan kunci mobil Anda.
        </p>

        {/* Clean, High-Legibility OTP Box */}
        <div className="my-5 bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 px-6 text-center">
          <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
            Kode PIN Keamanan
          </div>
          <div className="text-4xl font-black tracking-[0.3em] text-[#FF4D00] font-mono">
            {currentTrip.otpCode || "4821"}
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={() => verifyOtp("4821")}
          className="w-full py-3.5 rounded-2xl bg-[#FF4D00] hover:bg-[#E64400] active:scale-[0.99] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <span>Konfirmasi Kode dengan Driver</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

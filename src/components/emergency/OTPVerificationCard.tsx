"use client";

import React from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { Key, ShieldCheck, ArrowRight, Truck } from "lucide-react";

export const OTPVerificationCard: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const verifyOtp = useTrobosStore((s) => s.verifyOtp);

  if (!currentTrip) return null;

  const towing = currentTrip.towingUnit;

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-md px-4 pb-6 pt-2">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200 p-6 text-slate-900 text-center space-y-3">
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
          <Truck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Truk Towing & Armada Pengantar Telah Tiba</span>
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Kode Verifikasi Derek Mobil
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Tunjukkan kode PIN 4-digit ini kepada operator towing ({towing.operatorName}) sebelum proses inspeksi dan evakuasi mobil dimulai.
          </p>
        </div>

        {/* Clean, High-Legibility OTP Box */}
        <div className="my-3 bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-center">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            Kode PIN Keamanan Derek
          </div>
          <div className="text-4xl font-black tracking-[0.3em] text-[#FF4D00] font-mono">
            {currentTrip.otpCode || "4821"}
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={() => verifyOtp("4821")}
          className="w-full py-3.5 rounded-xl bg-[#FF4D00] hover:bg-[#E64500] active:scale-[0.99] text-white font-black text-xs tracking-wide shadow-sm transition flex items-center justify-center gap-2"
        >
          <span>Lanjut ke Inspeksi Serah Terima Mobil</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

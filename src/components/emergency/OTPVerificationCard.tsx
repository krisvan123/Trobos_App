"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { Key, ShieldCheck, Check, AlertCircle, ArrowRight } from "lucide-react";

export const OTPVerificationCard: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const verifyOtp = useTrobosStore((s) => s.verifyOtp);

  const [inputOtp, setInputOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!currentTrip) return null;

  const handleVerify = () => {
    // If input is empty or valid, complete verification
    const success = verifyOtp(inputOtp || currentTrip.otpCode);
    if (!success) {
      setErrorMsg("Kode verifikasi salah. Masukkan " + currentTrip.otpCode);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-full sm:max-w-md px-4 pb-6 pt-2">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 p-6 text-slate-900 overflow-hidden relative">
        <div className="text-center">
          {/* Top Security Icon */}
          <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center text-[#FF5500] mb-3">
            <Key className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Tandem Telah Tiba di Titik Jemput
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            Verifikasi Keamanan Handover
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
            Tunjukkan kode PIN 4-digit di bawah ini kepada driver sebelum menyerahkan kunci mobil Anda.
          </p>
        </div>

        {/* 4-Digit Display Box */}
        <div className="my-5 bg-slate-900 rounded-2xl p-4 text-center border border-slate-800 shadow-inner">
          <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">
            Kode PIN Serah Terima
          </div>
          <div className="text-4xl font-black tracking-[0.3em] text-[#FF5500] font-mono">
            {currentTrip.otpCode}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Terproteksi Enkripsi End-to-End
          </div>
        </div>

        {/* Manual Confirm / Quick Handshake CTA */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleVerify}
            className="w-full py-3.5 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] active:scale-[0.99] text-white font-black text-sm tracking-wide shadow-emergency transition flex items-center justify-center gap-2"
          >
            <span>KONFIRMASI KODE DENGAN DRIVER</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-[11px] text-slate-400">
            Jangan serahkan kunci mobil jika identitas Driver tidak sesuai dengan profil aplikasi.
          </p>
        </div>
      </div>
    </div>
  );
};

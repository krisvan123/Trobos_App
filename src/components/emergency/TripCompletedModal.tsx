"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { CheckCircle2, Star, ShieldCheck, Wrench, MapPin } from "lucide-react";
import { formatRupiah } from "@/lib/formatters";

export const TripCompletedModal: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const completeTrip = useTrobosStore((s) => s.completeTrip);
  const resetToIdle = useTrobosStore((s) => s.resetToIdle);

  const [rating, setRating] = useState(5);

  if (!currentTrip) return null;

  const isCompleted = currentTrip.status === "COMPLETED";

  const handleFinish = () => {
    if (!isCompleted) {
      completeTrip(rating, ["Towing Cepat", "Armada Nyaman", "Mobil Aman"]);
    } else {
      resetToIdle();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-modal border border-slate-200 p-6 w-full max-w-sm text-slate-900 text-center space-y-4">
        {/* Simple green check */}
        <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Penyelamatan Selesai
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Anda telah tiba di tujuan, dan mobil Anda telah diserahkan dengan aman di bengkel.
          </p>
        </div>

        {/* Clean Summary Card */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2 text-xs text-left">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-600" /> Destinasi Anda
            </span>
            <span className="font-bold text-slate-900 text-right truncate max-w-[170px]">
              {currentTrip.destination.name.split("/")[0]}
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-slate-500 flex items-center gap-1">
              <Wrench className="w-3 h-3 text-slate-600" /> Lokasi Mobil
            </span>
            <span className="font-semibold text-slate-900 text-right truncate max-w-[170px]">
              {currentTrip.carDestination.name.split("/")[0]}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Armada Penumpang</span>
            <span className="font-semibold text-slate-800">
              {currentTrip.passengerTransport.title.split("(")[0]}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Status Mobil</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Diterima Teknisi Bengkel
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
            <span>Total Biaya</span>
            <span className="text-[#FF4D00]">
              {formatRupiah(currentTrip.fare.totalFare || 220000)}
            </span>
          </div>
        </div>

        {/* Simple Star Rating */}
        <div>
          <div className="text-xs font-bold text-slate-700 mb-1.5">
            Beri Nilai Layanan Derek & Pengantaran
          </div>
          <div className="flex justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 focus:outline-none transition active:scale-95"
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200 fill-slate-100"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={handleFinish}
          className="w-full py-3.5 rounded-xl bg-[#FF4D00] hover:bg-[#E64500] text-white font-black text-xs tracking-wide shadow-sm transition active:scale-[0.99]"
        >
          Selesai & Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

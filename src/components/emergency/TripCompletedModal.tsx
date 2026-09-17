"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { CheckCircle2, Star, ShieldCheck } from "lucide-react";
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
      completeTrip(rating, ["Cepat", "Aman"]);
    } else {
      resetToIdle();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-t-[32px] sm:rounded-3xl shadow-xl border border-slate-200 p-6 w-full max-w-sm text-slate-900 text-center">
        {/* Simple green check */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          Anda & Mobil Telah Tiba
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Reuni sukses di {currentTrip.destination.name.split("/")[0]}. Kunci telah diserahkan.
        </p>

        {/* Clean Summary Card */}
        <div className="my-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-left">
          <div className="flex justify-between">
            <span className="text-slate-500">Tujuan</span>
            <span className="font-bold text-slate-900 truncate max-w-[170px]">
              {currentTrip.destination.name.split("/")[0]}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Durasi Perjalanan</span>
            <span className="font-semibold text-slate-800">18 mnt (Hemat 45 mnt)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kondisi Mobil</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Terparkir Aman
            </span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
            <span>Total Pembayaran</span>
            <span className="text-[#FF4D00]">
              {formatRupiah(currentTrip.fare.totalFare || 89000)}
            </span>
          </div>
        </div>

        {/* Simple Star Rating */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-600 mb-1.5">
            Beri Nilai Layanan Tandem
          </div>
          <div className="flex justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
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
          className="w-full py-3.5 rounded-2xl bg-[#FF4D00] hover:bg-[#E64400] text-white font-black text-sm shadow-md transition"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};

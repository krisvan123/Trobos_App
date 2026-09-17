"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  CheckCircle2,
  Star,
  Car,
  Bike,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { formatRupiah } from "@/lib/formatters";

export const TripCompletedModal: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const completeTrip = useTrobosStore((s) => s.completeTrip);
  const resetToIdle = useTrobosStore((s) => s.resetToIdle);

  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Rider Gesit",
    "Mobil Aman & Bersih",
  ]);

  if (!currentTrip) return null;

  const isCompleted = currentTrip.status === "COMPLETED";

  const feedbackOptions = [
    "Rider Gesit",
    "Mobil Aman & Bersih",
    "Tepat Waktu",
    "Sangat Ramah",
    "Penyelamat Deadline",
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFinish = () => {
    if (!isCompleted) {
      completeTrip(rating, selectedTags);
    } else {
      resetToIdle();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-slate-200/90 p-6 w-full max-w-md text-slate-900 animate-slide-up">
        {/* Top Success Badge */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3 shadow-inner">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            Misi Trobos Berhasil!
          </div>

          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Anda & Mobil Telah Tiba
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Reuni sukses di {currentTrip.destination.name}. Kunci mobil telah diserahkan kembali.
          </p>
        </div>

        {/* Trip Summary Card */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Tujuan Akhir</span>
            <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
              {currentTrip.destination.name}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Durasi Evakuasi</span>
            <span className="font-bold text-slate-800">18 mnt (Hemat 45 mnt macet)</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Status Mobil ({currentTrip.vehicle.plate})</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Parkir Aman
            </span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold">
            <span className="text-slate-900">Total Biaya</span>
            <span className="text-xl font-black text-[#FF5500]">
              {formatRupiah(currentTrip.fare.totalFare)}
            </span>
          </div>
        </div>

        {/* Rating & Feedback */}
        <div className="mt-5 text-center">
          <div className="text-xs font-bold text-slate-700 mb-2">
            Beri Nilai Layanan Tandem Rizky & Budi
          </div>
          <div className="flex justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1.5 focus:outline-none transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-7 h-7 ${
                    star <= rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300 fill-slate-100"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-5">
            {feedbackOptions.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Finish Button */}
        <button
          type="button"
          onClick={handleFinish}
          className="w-full py-4 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] active:scale-[0.99] text-white font-black text-sm tracking-wide shadow-emergency transition flex items-center justify-center gap-2"
        >
          <span>SELESAIKAN & KEMBALI KE BERANDA</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

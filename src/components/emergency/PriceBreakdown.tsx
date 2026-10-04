"use client";

import React, { useState } from "react";
import { FareBreakdown } from "@/types/trobos";
import { formatRupiah, formatDistance } from "@/lib/formatters";
import { ChevronDown, ChevronUp, ShieldCheck, AlertCircle, Truck } from "lucide-react";

interface PriceBreakdownProps {
  fare: FareBreakdown;
  className?: string;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ fare, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500 font-medium">Estimasi Biaya Penyelamatan</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {formatRupiah(fare.totalFare)}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-semibold text-[#FF4D00] hover:text-[#E64400] py-1 px-2.5 rounded-lg bg-orange-50 border border-orange-200 transition"
        >
          <span>{isExpanded ? "Sembunyikan" : "Rincian"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Derek Truk Towing Flatbed</span>
            <span className="font-semibold text-slate-800">{formatRupiah(fare.towingFare || 110000)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span className="flex items-center gap-1">
              <span>Layanan Penyelamatan & Siaga</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </span>
            <span className="font-semibold text-slate-800">{formatRupiah(fare.emergencyService)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Armada Pengantar Penumpang & Jarak Tempuh</span>
            <span className="font-semibold text-slate-800">{formatRupiah(fare.distanceFare)}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
            <span>Total Bayar</span>
            <span className="text-[#FF4D00]">{formatRupiah(fare.totalFare)}</span>
          </div>
        </div>
      )}

      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500">
        <AlertCircle className="w-3 h-3 shrink-0 text-slate-400" />
        <span>Termasuk truk towing gendong, armada penjemput penumpang, dan asuransi all-risk Rp 1 Miliar.</span>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <div className={cn("relative w-full group", className)}>
      {/* Outer Pulse Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse-subtle" />

      {/* Main Button */}
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label="Trobos Sekarang - Evakuasi Darurat"
        className="relative w-full bg-[#FF5500] hover:bg-[#E64C00] active:scale-[0.985] text-white py-4 sm:py-5 px-6 rounded-2xl sm:rounded-3xl shadow-emergency transition-all duration-200 flex items-center justify-between overflow-hidden border border-orange-400/30"
      >
        {/* Subtle Diagonal Shimmer */}
        <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out" />

        <div className="flex items-center gap-3.5 text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-inner">
            <Zap className="w-7 h-7 text-white fill-white animate-bounce-subtle" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-orange-100 flex items-center gap-1.5">
              <span>Layanan Darurat Macet</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              TROBOS SEKARANG
            </div>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end text-right pl-3 border-l border-white/20">
          <span className="text-xs text-orange-100 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            Unit Siaga
          </span>
          <span className="text-sm font-bold text-white">~3 mnt tiba</span>
        </div>
      </button>
    </div>
  );
};

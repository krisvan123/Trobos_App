"use client";

import React from "react";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  onClick,
  disabled = false,
  className,
  compact = false,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label="Trobos Sekarang - Evakuasi Darurat"
        className={cn(
          "w-full bg-[#FF4D00] hover:bg-[#E64400] active:scale-[0.985] text-white rounded-2xl shadow-lg transition-all duration-150 flex items-center justify-between border border-orange-500/20 emergency-cta-pulse",
          compact ? "p-3.5" : "p-4 sm:p-5"
        )}
      >
        <div className="flex items-center gap-3.5 text-left">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              TROBOS SEKARANG
            </div>
            <div className="text-xs text-orange-100 font-medium mt-0.5">
              Evakuasi motor untuk Anda • Mobil dibawa driver
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/25 text-right shrink-0">
          <div className="text-right">
            <div className="text-[11px] text-orange-100 font-medium">Respon cepat</div>
            <div className="text-xs font-bold text-white">~3 mnt tiba</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </button>
    </div>
  );
};

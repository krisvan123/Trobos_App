"use client";

import React from "react";
import { TripStatus } from "@/types/trobos";
import {
  Clock,
  Radio,
  CheckCircle2,
  Navigation,
  Key,
  ShieldCheck,
  Bike,
  Car,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: TripStatus;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  size = "md",
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case "REQUESTED":
        return {
          label: "Menunggu Konfirmasi",
          color: "bg-amber-100 text-amber-900 border-amber-300",
          icon: Clock,
          pulse: false,
        };
      case "SEARCHING_TANDEM":
        return {
          label: "Mencari Tandem...",
          color: "bg-orange-100 text-[#FF5500] border-orange-300",
          icon: Radio,
          pulse: true,
        };
      case "TANDEM_ASSIGNED":
        return {
          label: "Tandem Ditemukan",
          color: "bg-blue-100 text-blue-900 border-blue-300",
          icon: ShieldCheck,
          pulse: false,
        };
      case "TANDEM_APPROACHING":
        return {
          label: "Tandem Meluncur",
          color: "bg-orange-100 text-orange-900 border-orange-300",
          icon: Navigation,
          pulse: true,
        };
      case "TANDEM_ARRIVED":
        return {
          label: "Tandem Tiba di Titik",
          color: "bg-emerald-100 text-emerald-900 border-emerald-300",
          icon: CheckCircle2,
          pulse: false,
        };
      case "VERIFICATION":
        return {
          label: "Verifikasi Kode OTP",
          color: "bg-indigo-100 text-indigo-900 border-indigo-300",
          icon: Key,
          pulse: true,
        };
      case "VEHICLE_HANDOVER":
        return {
          label: "Inspeksi Serah Terima Mobil",
          color: "bg-amber-100 text-amber-900 border-amber-300",
          icon: Car,
          pulse: false,
        };
      case "TRIP_STARTED":
        return {
          label: "Trobos Sedang Berjalan",
          color: "bg-emerald-100 text-emerald-900 border-emerald-300",
          icon: Bike,
          pulse: true,
        };
      case "USER_ARRIVED":
        return {
          label: "Anda Tiba di Tujuan",
          color: "bg-sky-100 text-sky-900 border-sky-300",
          icon: Award,
          pulse: false,
        };
      case "VEHICLE_ARRIVED":
      case "COMPLETED":
        return {
          label: "Selesai & Mobil Telah Tiba",
          color: "bg-emerald-100 text-emerald-900 border-emerald-300",
          icon: CheckCircle2,
          pulse: false,
        };
      default:
        return {
          label: "Siaga Darurat",
          color: "bg-slate-100 text-slate-800 border-slate-200",
          icon: ShieldCheck,
          pulse: false,
        };
    }
  };

  const { label, color, icon: Icon, pulse } = getBadgeConfig();

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-xs sm:text-sm gap-2",
    lg: "px-4 py-2 text-sm sm:text-base gap-2.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border shadow-sm transition-all",
        sizeClasses[size],
        color,
        className
      )}
    >
      <Icon className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", pulse && "animate-spin-slow")} />
      <span>{label}</span>
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping ml-0.5" />
      )}
    </span>
  );
};

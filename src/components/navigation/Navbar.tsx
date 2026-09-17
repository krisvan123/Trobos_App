"use client";

import React from "react";
import Link from "next/link";
import { Zap, Bell, Shield, Radio, Car } from "lucide-react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { StatusBadge } from "@/components/common/StatusBadge";

export const Navbar: React.FC = () => {
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const notifications = useTrobosStore((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/app" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#FF5500] flex items-center justify-center shadow-emergency group-hover:scale-105 transition">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">
                TROBOS
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                EMERGENCY
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-1 hidden sm:block">
              Terobos Macet, Selamatkan Waktu
            </p>
          </div>
        </Link>

        {/* Center Active Trip Status Pill (if active) */}
        {currentTrip && currentTrip.status !== "IDLE" && (
          <div className="hidden md:block">
            <StatusBadge status={currentTrip.status} size="sm" />
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Driver Mode Toggle Link */}
          <Link
            href="/driver"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition"
          >
            <Car className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Mode Mitra Driver</span>
            <span className="sm:hidden">Driver</span>
          </Link>

          {/* Safety Center Quick Link */}
          <Link
            href="/app/safety"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Pusat Keamanan Darurat"
            aria-label="Pusat Keamanan"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
          </Link>

          {/* Notifications Link with badge */}
          <Link
            href="/app/notifications"
            className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Notifikasi"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF5500] ring-2 ring-slate-900" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

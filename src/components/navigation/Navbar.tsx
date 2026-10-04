"use client";

import React from "react";
import Link from "next/link";
import { Zap, Bell, Shield, Car } from "lucide-react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { StatusBadge } from "@/components/common/StatusBadge";

export const Navbar: React.FC = () => {
  const user = useTrobosStore((s) => s.user);
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const notifications = useTrobosStore((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/app" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FF4D00] flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-tight text-slate-900">
              TROBOS
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-[#FF4D00]">
              RESCUE
            </span>
          </div>
        </Link>

        {/* Center Active Trip Status Badge */}
        {currentTrip && currentTrip.status !== "IDLE" && (
          <div className="hidden md:block">
            <StatusBadge status={currentTrip.status} size="sm" />
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Driver Mode Preview Link */}
          <Link
            href="/driver"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition"
          >
            <Car className="w-3.5 h-3.5 text-[#FF4D00]" />
            <span className="hidden sm:inline">Mode Driver</span>
            <span className="sm:hidden">Driver</span>
          </Link>

          {/* Safety Quick Link */}
          <Link
            href="/app/safety"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Pusat Keamanan"
            aria-label="Pusat Keamanan"
          >
            <Shield className="w-4 h-4 text-emerald-600" />
          </Link>

          {/* Notifications */}
          <Link
            href="/app/notifications"
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Notifikasi"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF4D00]" />
            )}
          </Link>

          {/* User Profile Shortcut */}
          <Link
            href="/app/profile"
            className="p-1 rounded-full hover:ring-2 hover:ring-slate-200 transition"
            title="Profil Akun"
            aria-label="Profil Akun"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

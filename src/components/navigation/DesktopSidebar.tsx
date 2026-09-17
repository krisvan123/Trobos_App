"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Clock,
  Car,
  ShieldCheck,
  HelpCircle,
  Bell,
  User,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { cn } from "@/lib/utils";

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const startBooking = useTrobosStore((s) => s.startBooking);
  const user = useTrobosStore((s) => s.user);

  const mainLinks = [
    { href: "/app", label: "Beranda", icon: Home },
    { href: "/app/trips", label: "Riwayat Perjalanan", icon: Clock },
    { href: "/app/vehicles", label: "Kendaraan Saya", icon: Car },
    { href: "/app/safety", label: "Pusat Keamanan", icon: ShieldCheck },
    { href: "/app/notifications", label: "Notifikasi", icon: Bell },
    { href: "/app/help", label: "Pusat Bantuan", icon: HelpCircle },
    { href: "/app/profile", label: "Profil Akun", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/90 h-[calc(100vh-4rem)] sticky top-16 shrink-0 justify-between p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* User Card Miniature */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {user.name}
            </h4>
            <p className="text-xs text-slate-500 truncate">{user.phone}</p>
          </div>
        </div>

        {/* Quick Emergency CTA in Sidebar */}
        <button
          onClick={() => startBooking()}
          className="w-full bg-[#FF5500] hover:bg-[#E64C00] text-white p-3 rounded-2xl shadow-emergency font-bold text-sm flex items-center justify-center gap-2 transition active:scale-98"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>TROBOS SEKARANG</span>
        </button>

        {/* Navigation Menu Links */}
        <nav className="space-y-1">
          {mainLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-orange-400" : "text-slate-500")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info / Mode Switch */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <Link
          href="/driver"
          className="flex items-center justify-between p-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-900 text-xs font-bold transition border border-orange-200"
        >
          <span className="flex items-center gap-2">
            <Car className="w-4 h-4 text-[#FF5500]" />
            Masuk Mode Driver
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#FF5500]" />
        </Link>
        <div className="text-[11px] text-slate-400 text-center">
          Trobos Mobility v1.2.0 • Jakarta
        </div>
      </div>
    </aside>
  );
};

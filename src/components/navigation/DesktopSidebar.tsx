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
} from "lucide-react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { cn } from "@/lib/utils";

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();
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
    <aside className="hidden md:flex flex-col w-60 bg-white border-r border-slate-200 h-[calc(100vh-4rem)] sticky top-16 shrink-0 justify-between p-4 overflow-y-auto">
      <div className="space-y-4">
        {/* User Snapshot */}
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-900 truncate">
              {user.name}
            </h4>
            <p className="text-[11px] text-slate-500 truncate">{user.phone}</p>
          </div>
        </div>

        {/* Quick CTA */}
        <button
          onClick={() => startBooking()}
          className="w-full bg-[#FF4D00] hover:bg-[#E64400] text-white p-3 rounded-xl shadow-sm font-bold text-xs flex items-center justify-center gap-2 transition"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Trobos Sekarang</span>
        </button>

        {/* Links */}
        <nav className="space-y-0.5">
          {mainLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-orange-400" : "text-slate-400")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
        Trobos Mobility • v1.2
      </div>
    </aside>
  );
};

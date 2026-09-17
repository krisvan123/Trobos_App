"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, ShieldCheck, User, Zap } from "lucide-react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { cn } from "@/lib/utils";

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();
  const currentTrip = useTrobosStore((s) => s.currentTrip);
  const startBooking = useTrobosStore((s) => s.startBooking);

  const navItems = [
    { href: "/app", label: "Beranda", icon: Home },
    { href: "/app/trips", label: "Riwayat", icon: Clock },
    { href: "/app/safety", label: "Keamanan", icon: ShieldCheck },
    { href: "/app/profile", label: "Profil", icon: User },
  ];

  const isTripActive =
    currentTrip &&
    currentTrip.status !== "IDLE" &&
    currentTrip.status !== "COMPLETED";

  return (
    <nav
      aria-label="Navigasi Utama"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden pb-safe"
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-150 min-w-[64px]",
                isActive
                  ? "text-[#FF5500] font-bold"
                  : "text-slate-500 hover:text-slate-800 font-medium"
              )}
            >
              <div className="relative">
                <Icon className={cn("w-5 h-5", isActive ? "stroke-[2.5]" : "stroke-[1.8]")} />
                {item.label === "Beranda" && isTripActive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-ping" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
